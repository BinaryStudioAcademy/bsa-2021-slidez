package com.binarystudio.academy.slidez.app.link;

import java.util.List;

import com.binarystudio.academy.slidez.domain.link.LinkService;
import com.binarystudio.academy.slidez.domain.link.dto.LinkDto;
import com.binarystudio.academy.slidez.domain.response.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping
	public GenericResponse<List<LinkDto>, String> getLinks() {
		return new GenericResponse<>(linkService.getLinks());
	}

	@PostMapping("/lease/{duration}")
	public GenericResponse<String, String> leaseALink(@PathVariable int duration) {
		return new GenericResponse<>(linkService.leaseLinkAsString(duration));
	}

	@PostMapping("/clean-expired-leases")
	public void cleanExpiredLeases() {
		this.linkService.cleanExpiredLeases();
	}

}