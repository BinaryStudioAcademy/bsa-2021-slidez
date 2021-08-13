package com.binarystudio.academy.slidez.domain.link;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

import com.binarystudio.academy.slidez.domain.link.dto.LinkDto;
import com.binarystudio.academy.slidez.domain.link.exceptions.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.link.mapper.LinkMapper;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkService {

	private static final int MAX_COUNT_AVAILABLE_LINKS = 100;

	private static final int MIN_LEASE_DURATION = 1;

	private static final int MAX_LEASE_DURATION = 180;

	private static final char[] ALPHABET = new char[('z' - 'a' + 1) + ('9' - '0' + 1)];

	private static final Map<Character, Integer> CHAR_TO_ALPHABET_POS = new HashMap<>();

	private final LinkRepository linkRepository;

	@Autowired
	public LinkService(LinkRepository linkRepository) {
		this.linkRepository = linkRepository;
	}

	// Initialize static variables
	static {
		int position = 0;
		for (int i = (int) 'a'; i <= (int) 'z'; i++, position++) {
			ALPHABET[position] = (char) i;
			CHAR_TO_ALPHABET_POS.put((char) i, position);
		}
		for (int i = (int) '0'; i <= (int) '9'; i++, position++) {
			ALPHABET[position] = (char) i;
			CHAR_TO_ALPHABET_POS.put((char) i, position);
		}
	}

	/**
	 * [On startup, on corn job] Generate extra links, if there are less than 100
	 * available
	 */
	public void generateExtraLinks() {

		int countAvailableLinks = this.linkRepository.getCountAvailableLinks();
		if (countAvailableLinks >= MAX_COUNT_AVAILABLE_LINKS) {
			return;
		}
		List<Link> generatingLinks = new ArrayList<>();
		int countLinkForGenerate = MAX_COUNT_AVAILABLE_LINKS - countAvailableLinks;
		String lastLink = getLastLink();
		for (int i = 0; i < countLinkForGenerate; i++) {
			String newLink = generateLink(lastLink);
			generatingLinks.add(Link.createLink(null, newLink, null));
			lastLink = newLink;
		}
		this.linkRepository.saveAll(generatingLinks);
	}

	/**
	 * Generate link in order. Example: previewLink - aaaaa1; generated link - aaaaa2.
	 * @param code - last link in table "Link" database
	 * @return new link in order
	 */
	private String generateLink(String code) {
		StringBuilder nextCode = new StringBuilder();
		// convert string to a number in base(powerOf(alphabet)) and add 1 to it;
		// carry over from previous operation
		int carry = 1;
		for (int i = code.length() - 1; i >= 0; i--) {
			var codePoint = CHAR_TO_ALPHABET_POS.get(code.charAt(i));
			if (codePoint == null) {
				throw new IllegalArgumentException(String.format("Invalid character %c in %s", code.charAt(i), code));
			}
			var newCodePoint = codePoint + carry;
			nextCode.append(ALPHABET[newCodePoint % ALPHABET.length]);
			carry = newCodePoint / ALPHABET.length;
		}
		if (carry != 0) {
			throw new IllegalArgumentException("%s - cannot get next code due to overflow");
		}

		return nextCode.reverse().toString();
	}

	/**
	 * Lease a link. In this case, the caller provides info on how long it would like to
	 * lease a link. The maximum lease duration is 180 days.
	 * @param leaseDuration - how long it would like to lease a link;
	 * @return lease link with expirationDate
	 * @throws IncorrectLeaseDurationException - when lease duration out of bound duration
	 * lease
	 */
	public String leaseLinkAsString(int leaseDuration) throws IncorrectLeaseDurationException {
		checkLeaseDuration(leaseDuration);
		Link availableLink = configureAndGetAvailableLink(leaseDuration);
		return availableLink.getLink();
	}

	public Optional<Link> leaseLink(int leaseDuration) {
		if (!isDurationWithinBounds(leaseDuration)) {
			return Optional.empty();
		}
		return Optional.of(configureAndGetAvailableLink(leaseDuration));
	}

	private Link configureAndGetAvailableLink(int leaseDuration) {
		Link availableLink = linkRepository.getAvailableLink()
				.orElseGet(() -> linkRepository.save(Link.createLink(null, generateLink(getLastLink()), null)));
		LocalDateTime expirationDate = LocalDateTime.now().plus(Period.ofDays(leaseDuration));
		availableLink.setExpirationDate(expirationDate);
		linkRepository.update(availableLink, availableLink.getLinkId());
		return availableLink;
	}

	private String getLastLink() {
		return this.linkRepository.getLastLink().orElse("aaaaaa");
	}

	private void checkLeaseDuration(int leaseDuration) throws IncorrectLeaseDurationException {
		if (!isDurationWithinBounds(leaseDuration)) {
			throw new IncorrectLeaseDurationException(
					"Duration of the lease is outside the interval. Expected: A number between 1 and 180, inclusive. Found: "
							+ leaseDuration);
		}
	}

	private boolean isDurationWithinBounds(int leaseDuration) {
		return leaseDuration >= MIN_LEASE_DURATION && leaseDuration <= MAX_LEASE_DURATION;
	}

	/**
	 * [On cron job] Clean up expired leases, freeing the links to be used again.
	 */
	public void cleanExpiredLeases() {
		LocalDateTime now = LocalDateTime.now();
		List<Link> expiredLinks = this.linkRepository.getLinksWithExpiredLeases(now);
		expiredLinks.forEach(freeingALink -> {
			freeingALink.setSession(null);
			freeingALink.setExpirationDate(null);
			this.linkRepository.update(freeingALink, freeingALink.getLinkId());
		});
	}

	public List<LinkDto> getLinks() {
		LinkMapper mapper = LinkMapper.INSTANCE;
		return this.linkRepository.findAll().stream().map(mapper::linkToLinkDto).collect(Collectors.toList());

	}

	public Link update(Link link) {
		return linkRepository.save(link);
	}

}
