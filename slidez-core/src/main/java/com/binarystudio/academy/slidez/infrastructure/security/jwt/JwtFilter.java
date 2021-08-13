package com.binarystudio.academy.slidez.infrastructure.security.jwt;

import com.binarystudio.academy.slidez.domain.user.UserService;
import com.binarystudio.academy.slidez.domain.user.model.User;
import com.binarystudio.academy.slidez.domain.user.model.UserRole;
import com.binarystudio.academy.slidez.infrastructure.security.SecurityProperties;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

	private final JwtProvider jwtProvider;

	private final UserService userService;

	private final SecurityProperties securityProperties;

	@Autowired
	public JwtFilter(JwtProvider jwtProvider, UserService userService, SecurityProperties securityProperties) {
		this.jwtProvider = jwtProvider;
		this.userService = userService;
		this.securityProperties = securityProperties;
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String requestURI = request.getRequestURI();
		if (securityProperties.getInfrastructurePaths().contains(requestURI)) {
			return true;
		}
		for (String excludedPathStart : securityProperties.getPublicUrlStarts()) {
			if (request.getRequestURI().startsWith(excludedPathStart)) {
				return true;
			}
		}
		return false;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = getTokenFromRequest(request);
		if (token != null) {
			Optional<String> loginFromToken = jwtProvider.getLoginFromToken(token);
			if (loginFromToken.isPresent()) {
				Optional<User> user = userService.getByEmail(loginFromToken.get());
				if (user.isPresent()) {
					UserRole role = user.get().getRole();
					List<UserRole> roles = (role == null) ? Collections.emptyList() : List.of(role);
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null,
							roles);
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
			}
		}
		filterChain.doFilter(request, response);
	}

	@Nullable
	private String getTokenFromRequest(HttpServletRequest request) {
		String bearer = request.getHeader("authorization");
		if (bearer != null && bearer.startsWith("Bearer ")) {
			final int prefixLength = 7;
			return bearer.substring(prefixLength);
		}
		return null;
	}

}
