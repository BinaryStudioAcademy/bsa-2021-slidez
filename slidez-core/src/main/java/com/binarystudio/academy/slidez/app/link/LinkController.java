package com.binarystudio.academy.slidez.app.link;

import com.binarystudio.academy.slidez.domain.link.LinkService;

import com.binarystudio.academy.slidez.domain.link.model.Link;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${v1API}/links")
public class LinkController {

	private final LinkService linkService;

	@Autowired
	public LinkController(LinkService linkService) {
		this.linkService = linkService;
	}

	@PostMapping("/generate-extra")
	public void generateExtraLinks() {
		this.linkService.generateExtraLinks();
	}

	@PostMapping("/lease/{duration}")
	public GenericResponse<String, LinkResponseCodes> leaseALink(@PathVariable int duration) {
		Link link = linkService.leaseLink(duration);
		return new GenericResponse<>(link.getCode(), LinkResponseCodes.LINK_LEASED);
	}

	@PostMapping("/clean-expired-leases")
	public void cleanExpiredLeases() {
		this.linkService.cleanExpiredLeases();
	}

}
