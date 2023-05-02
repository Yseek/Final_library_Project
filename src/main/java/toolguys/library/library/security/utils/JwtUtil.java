package toolguys.library.library.security.utils;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import toolguys.library.library.security.exception.AppException;
import toolguys.library.library.security.exception.ErrorCode;

public class JwtUtil {

	public static String getUserEmail(String token, String secretKey) {
		return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().get("userEmail",
				String.class);
	}

	public static boolean isExpired(String token, String secretKey) {
		try {
			return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getExpiration()
					.before(new Date());
		} catch (MalformedJwtException mj) {
			throw new AppException(ErrorCode.INVALID_TOKEN, "토큰 만료");
		}
	}

	public static String createJwt(String userEmail, String secretKey, Long expiredMs) {
		Claims claims = Jwts.claims();
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		Key key = Keys.hmacShaKeyFor(keyBytes);
		claims.put("userEmail", userEmail);
		// Refresh token 구현중
		// String refreshToken = Jwts.builder().setClaims(claims).setIssuedAt(new 
		// Date(System.currentTimeMillis()))
		// .setExpiration(new Date(System.currentTimeMillis() + expiredMs * 24))
		// .signWith(key, SignatureAlgorithm.HS256).compact();
		// List<String> tokens = new ArrayList<String>();
		// tokens.add(token);
		// tokens.add(refreshToken);
		return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiredMs))
				.signWith(key, SignatureAlgorithm.HS256).compact();
	}
}
