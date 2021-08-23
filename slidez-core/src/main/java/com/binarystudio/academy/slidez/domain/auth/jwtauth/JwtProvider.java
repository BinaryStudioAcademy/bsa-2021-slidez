package com.binarystudio.academy.slidez.domain.auth.jwtauth;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

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

	private final Key secretKey;

	private final JwtParser jwtParser;

	@Autowired
	public JwtProvider(JwtProperties jwtProperties) {
		this.jwtProperties = jwtProperties;
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.jwtParser = Jwts.parserBuilder().setSigningKey(this.secretKey).build();
	}

	public String generateAccessToken(User user) {
		Date date = Date.from(LocalDateTime.now().plusSeconds(this.jwtProperties.getSecondsToExpireAccess())
				.toInstant(ZoneOffset.UTC));
		return Jwts.builder().setSubject(user.getEmail()).setExpiration(date).signWith(secretKey).compact();
	}

	public String generateRefreshToken(User user) {
		Date date = Date.from(LocalDateTime.now().plusSeconds(this.jwtProperties.getSecondsToExpireRefresh())
				.toInstant(ZoneOffset.UTC));
		return Jwts.builder().setSubject(user.getEmail()).setExpiration(date).signWith(secretKey).compact();
	}

	public Optional<String> getLoginFromToken(String token) {
		Claims claims;
		try {
			claims = parseToken(token);
		}
		catch (JwtException ex) {
			return Optional.empty();
		}
		return Optional.ofNullable(claims.getSubject());
	}

	private Claims parseToken(String token) throws JwtException {
		try {
			return jwtParser.parseClaimsJws(token).getBody();
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
