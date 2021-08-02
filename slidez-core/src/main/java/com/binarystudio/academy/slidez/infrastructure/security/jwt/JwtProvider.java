package com.binarystudio.academy.slidez.infrastructure.security.jwt;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import com.binarystudio.academy.slidez.domain.user.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

	private final JwtProperties jwtProperties;

	private Key secretKey;

	private JwtParser jwtParser;

	@Autowired
	public JwtProvider(JwtProperties jwtProperties) {
		this.jwtProperties = jwtProperties;
	}

	private Key key() {
		if (this.secretKey == null) {
			byte[] keyBytes = Decoders.BASE64.decode(this.jwtProperties.getSecret());
			this.secretKey = Keys.hmacShaKeyFor(keyBytes);
		}
		return this.secretKey;
	}

	private JwtParser jwtParser() {
		if (this.jwtParser == null) {
			this.jwtParser = Jwts.parserBuilder().setSigningKey(key()).build();
		}
		return this.jwtParser;
	}

	public String generateAccessToken(User user) {
		Date date = Date.from(LocalDateTime.now().plusSeconds(this.jwtProperties.getSecondsToExpireAccess())
				.toInstant(ZoneOffset.UTC));
		return Jwts.builder().setSubject(user.getEmail()).setExpiration(date).signWith(key()).compact();
	}

	public String getLoginFromToken(String token) {
		Claims claims;
		try {
			claims = parseToken(token);
		} catch (Exception ex) {
			return null;
		}
		return claims.getSubject();
	}

	private Claims parseToken(String token) {
		try {
			return jwtParser().parseClaimsJws(token).getBody();
		}
		catch (ExpiredJwtException expEx) {
			throw new JwtException("Token expired", "jwt-expired");
		}
		catch (UnsupportedJwtException unsEx) {
			throw new JwtException("Unsupported jwt", "jwt-unsupported");
		}
		catch (MalformedJwtException mjEx) {
			throw new JwtException("Malformed jwt", "jwt-malformed");
		}
		catch (Exception e) {
			throw new JwtException("Invalid token", "jwt-invalid");
		}
	}

}
