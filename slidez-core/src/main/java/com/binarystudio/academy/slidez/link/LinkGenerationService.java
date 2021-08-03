package com.binarystudio.academy.slidez.link;

import com.binarystudio.academy.slidez.link.dto.LinkDto;
import com.binarystudio.academy.slidez.link.exceptions.IncorrectLeaseDurationException;
import com.binarystudio.academy.slidez.link.model.Link;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LinkGenerationService {

    @Autowired
    private LinkRepository linkRepository;

    /**
     * [On startup, on corn job] Generate extra links, if there are less than 100 available
     */
    public void generateExtraLinks() {

        int maxCountAvailableLinks = 100;
        int countAvailableLinks = linkRepository.getCountAvailableLinks();
        if (countAvailableLinks < maxCountAvailableLinks) {
            int countLinkForGenerate = maxCountAvailableLinks - countAvailableLinks;
            String lastLink = getLastLink();
            for (int i = 0; i < countLinkForGenerate; i++) {
                String newLink = generateLink(lastLink);
                linkRepository.save(new Link(UUID.randomUUID(), null, newLink, null));
                lastLink = newLink;
            }
        }
    }

    /**
     * Generate link in order. Example:
     * previewLink    - AAAAA1;
     * generated link - AAAAA2.
     *
     * @param link - last link in table "Link" database
     * @return new link in order
     */
    private String generateLink(String link) {
        char[] previewLink = link.toCharArray();
        char[] newLink = new char[previewLink.length];
        char lastNumeric = '9';
        char lastAlphabet = 'z';
        boolean isChange = true;

        for (int i = newLink.length - 1; i >= 0; i--) {
            if (isChange) {

                if (previewLink[i] == lastNumeric) {
                    newLink[i] = '0';
                    isChange = true;
                    continue;
                }
                if (previewLink[i] == lastAlphabet) {
                    newLink[i] = 'a';
                    isChange = true;
                    continue;
                }

                newLink[i] = (char) (previewLink[i] + 1);
                isChange = false;
            } else {
                newLink[i] = previewLink[i];
            }
        }

        return String.valueOf(newLink);
    }

    /**
     * Lease a link. In this case, the caller provides info on how long it would like to lease a link.
     * The maximum lease duration is 180 days.
     *
     * @param leaseDuration - how long it would like to lease a link;
     * @return lease link with expirationDate
     * @throws IncorrectLeaseDurationException - when lease duration out of bound duration lease
     */
    public String leaseALink(int leaseDuration) throws IncorrectLeaseDurationException {
        checkLeaseDuration(leaseDuration);

        Link availableLink = linkRepository
                .getAvailableLink()
                .orElse(linkRepository
                        .save(new Link(UUID.randomUUID(), null, generateLink(getLastLink()), null)));
        LocalDateTime expirationDate = LocalDateTime.now().plus(Period.ofDays(leaseDuration));
        availableLink.setExpirationDate(expirationDate);
        linkRepository.update(availableLink, availableLink.getLinkId());

        return availableLink.getLink();
    }

    private String getLastLink() {
        return linkRepository.getLastLink().orElse("AAAAA0");
    }

    private void checkLeaseDuration(int leaseDuration) throws IncorrectLeaseDurationException {
        if (leaseDuration > 180 || leaseDuration < 1) {
            throw new IncorrectLeaseDurationException("Duration of the lease is outside the interval. Expected: A number between 1 and 180, inclusive. Found: " + leaseDuration);
        }
    }

    /**
     * [On cron job] Clean up expired leases, freeing the links to be used again.
     */
    public void cleanExpiredLeases() {
        List<Link> expiredLinks = linkRepository.getLinksWithExpiredLeases();
        expiredLinks
                .forEach(freeingALink -> {
                    freeingALink.setSessionId(null);
                    freeingALink.setExpirationDate(null);
                            linkRepository.update(freeingALink, freeingALink.getLinkId());
                });
    }
    public List<LinkDto> getLinks() {
        return linkRepository
                .findAll()
                .stream()
                .map(LinkDto::fromEntity)
                .collect(Collectors.toList());

    }
}
