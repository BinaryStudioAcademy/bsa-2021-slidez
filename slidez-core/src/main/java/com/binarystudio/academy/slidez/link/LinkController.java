package com.binarystudio.academy.slidez.link;

import java.util.List;

import com.binarystudio.academy.slidez.link.dto.LinkDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/link")
public class LinkController {

    @Autowired
    private LinkGenerationService linkService;

    @GetMapping("/generate-extra-links")
    public void generateExtraLinks() {
        this.linkService.generateExtraLinks();
    }

    @GetMapping("/all")
    public List<LinkDto> getLinks() {
        return this.linkService.getLinks();
    }

    @GetMapping("/lease/{duration}")
    public String leaseALink(@PathVariable int duration) throws Exception {
        return this.linkService.leaseALink(duration);
    }

    @GetMapping("/clean-expired-leases")
    public void cleanExpiredLeases() {
        this.linkService.cleanExpiredLeases();
    }

}
