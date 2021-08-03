package com.binarystudio.academy.slidez.link;

import com.binarystudio.academy.slidez.link.dto.LinkDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/link")
public class LinkController {
    @Autowired
    private LinkGenerationService linkService;

    @GetMapping("/generate-extra-links")
    public void generateExtraLinks() {
        linkService.generateExtraLinks();
    }

    @GetMapping("/all")
    public List<LinkDto> getLinks() {
        return linkService.getLinks();
    }

    @GetMapping("/lease/{duration}")
    public String leaseALink(@PathVariable int duration) throws Exception {
        return linkService.leaseALink(duration);
    }

    @GetMapping("/clean-expired-leases")
    public void cleanExpiredLeases() {
        linkService.cleanExpiredLeases();
    }
}
