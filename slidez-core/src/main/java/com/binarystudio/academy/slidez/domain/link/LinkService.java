package com.binarystudio.academy.slidez.domain.link;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

import com.binarystudio.academy.slidez.domain.link.dto.LinkDto;
import com.binarystudio.academy.slidez.domain.link.exception.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.domain.link.exception.InvalidCharacterException;
import com.binarystudio.academy.slidez.domain.link.exception.OverflowException;
import com.binarystudio.academy.slidez.domain.link.mapper.LinkMapper;
import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.server.LinkBuilder;
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
		for (int i = 'a'; i <= (int) 'z'; i++, position++) {
			ALPHABET[position] = (char) i;
			CHAR_TO_ALPHABET_POS.put((char) i, position);
		}
		for (int i = '0'; i <= (int) '9'; i++, position++) {
			ALPHABET[position] = (char) i;
			CHAR_TO_ALPHABET_POS.put((char) i, position);
		}
	}

	/**
	 * [On startup, on cron job] Generate extra links, if there are less than 100
	 * available
	 */
	public void generateExtraLinks() {
		int countAvailableLinks = linkRepository.getCountAvailableLinks();
		if (countAvailableLinks >= MAX_COUNT_AVAILABLE_LINKS) {
			return;
		}
		List<Link> generatingLinks = new ArrayList<>();
		int countLinkForGenerate = MAX_COUNT_AVAILABLE_LINKS - countAvailableLinks;
		String lastLink = getLastLink();
		for (int i = 0; i < countLinkForGenerate; i++) {
			String newLink = generateLink(lastLink);
			generatingLinks.add(new Link().builder().link(newLink).build());
			lastLink = newLink;
		}
		linkRepository.saveAll(generatingLinks);
	}

	/**
	 * Generate link in order. Example: previewLink - aaaaa1; generated link - aaaaa2.
	 * @param code - last link in table "Link" database
	 * @return new link in order
	 */
	private String generateLink(String code) throws InvalidCharacterException, OverflowException {
		StringBuilder nextCode = new StringBuilder();
		// convert string to a number in base(powerOf(alphabet)) and add 1 to it;
		// carry over from previous operation
		int carry = 1;
		for (int i = code.length() - 1; i >= 0; i--) {
			var codePoint = CHAR_TO_ALPHABET_POS.get(code.charAt(i));
			if (codePoint == null) {
				throw new InvalidCharacterException(String.format("Invalid character %c in %s", code.charAt(i), code));
			}
			var newCodePoint = codePoint + carry;
			nextCode.append(ALPHABET[newCodePoint % ALPHABET.length]);
			carry = newCodePoint / ALPHABET.length;
		}
		if (carry != 0) {
			throw new OverflowException("Cannot generate new link due to overflow");
		}

		return nextCode.reverse().toString();
	}

	public Link leaseLink(int leaseDuration, Session session) throws IncorrectLeaseDurationException {
		checkLeaseDuration(leaseDuration);
		LocalDateTime expirationDate = LocalDateTime.now().plus(Period.ofDays(leaseDuration));

		Link resultLink = new Link().builder().link(generateLink(getLastLink())).session(session)
				.expirationDate(expirationDate).build();

		linkRepository.saveAndFlush(resultLink);
		return resultLink;
	}

	private String getLastLink() {
		return linkRepository.getLastLink().orElse("aaaaaa");
	}

	private void checkLeaseDuration(int leaseDuration) throws IncorrectLeaseDurationException {
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
		List<Link> expiredLinks = linkRepository.getLinksWithExpiredLeases(now);
		expiredLinks.forEach(freeingALink -> {
			freeingALink.setSession(null);
			freeingALink.setExpirationDate(null);
			linkRepository.update(freeingALink, freeingALink.getLinkId());
		});
	}

	public List<LinkDto> getLinks() {
		LinkMapper mapper = LinkMapper.INSTANCE;
		return linkRepository.findAll().stream().map(mapper::linkToLinkDto).collect(Collectors.toList());
	}

	public Link update(Link link) {
		return linkRepository.save(link);
	}

}
