package com.binarystudio.academy.slidez.domain.link;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;

import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.link.util.ShortCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.concurrent.GuardedBy;
import javax.annotation.concurrent.ThreadSafe;

@Service
@ThreadSafe
/**
 * Class manages all Link-related manipulations, like creating, updating, deleting etc. It
 * is obligated to ensure data integrity - there must be no links with equal short code.
 * Class is thread safe, all invariants are guarded by field {@link LinkService#lock}.
 * Class does not support external synchronization
 */
public class LinkService {

	private static final int MAX_COUNT_AVAILABLE_LINKS = 100;

	private static final int MIN_LEASE_DURATION = 1;

	private static final int MAX_LEASE_DURATION = 180;

	private static final String THE_FIRST_CODE = "aaaaaa";

	@GuardedBy("lock")
	private final LinkRepository linkRepository;

	private final Object lock = new Object();

	@Autowired
	public LinkService(LinkRepository linkRepository) {
		this.linkRepository = linkRepository;
	}

	/**
	 * [On startup, on cron job] Generate extra links, if there are less than 100
	 * available
	 */
	public void generateExtraLinks() {
		synchronized (lock) {
			int countAvailableLinks = linkRepository.getCountAvailableLinks();
			if (countAvailableLinks >= MAX_COUNT_AVAILABLE_LINKS) {
				return;
			}
			List<Link> generatingLinks = new ArrayList<>();
			int countLinkForGenerate = MAX_COUNT_AVAILABLE_LINKS - countAvailableLinks;
			String lastCode = getLastCode();
			for (int i = 0; i < countLinkForGenerate; i++) {
				String code = ShortCodeGenerator.generateCode(lastCode);
				generatingLinks.add(new Link(code));
				lastCode = code;
			}
			linkRepository.saveAll(generatingLinks);
		}
	}

	/**
	 * Lease a link. In this case, the caller provides info on how long it would like to
	 * lease a link. The maximum lease duration is 180 days.
	 * @param leaseDuration - how long it would like to lease a link;
	 * @return lease link with expirationDate
	 * @throws IncorrectLeaseDurationException - when lease duration out of bound duration
	 */
	public Link leaseLink(int leaseDuration) throws IncorrectLeaseDurationException {
		checkLeaseDuration(leaseDuration);
		LocalDateTime expirationDate = LocalDateTime.now().plus(Period.ofDays(leaseDuration));
		synchronized (lock) {
			Link availableLink = linkRepository.getAvailableLink().orElseGet(() -> {
				String code = ShortCodeGenerator.generateCode(getLastCode());
				return linkRepository.save(new Link(code));
			});
			availableLink.setLeasedUntil(expirationDate);
			linkRepository.update(availableLink, availableLink.getId());
			return availableLink;
		}
	}

	private String getLastCode() {
		synchronized (lock) {
			return linkRepository.getLastLink().map(Link::getCode).orElse(THE_FIRST_CODE);
		}
	}

	private static void checkLeaseDuration(int leaseDuration) throws IncorrectLeaseDurationException {
		if (leaseDuration < MIN_LEASE_DURATION || leaseDuration > MAX_LEASE_DURATION) {
			String template = "Duration of lease must be between %d and %d incl. Instead: %d";
			String message = String.format(template, MIN_LEASE_DURATION, MAX_LEASE_DURATION, leaseDuration);
			throw new IncorrectLeaseDurationException(message);
		}
	}

	/**
	 * [On cron job] Clean up expired leases, freeing the links to be used again.
	 */
	public void cleanExpiredLeases() {
		LocalDateTime now = LocalDateTime.now();
		synchronized (lock) {
			List<Link> expiredLinks = linkRepository.getLinksWithExpiredLeases(now);
			expiredLinks.forEach(freeingALink -> {
				freeingALink.setLeasedUntil(null);
				linkRepository.update(freeingALink, freeingALink.getId());
			});
		}
	}

	public Link update(Link link) {
		synchronized (lock) {
			return linkRepository.save(link);
		}
	}

}
