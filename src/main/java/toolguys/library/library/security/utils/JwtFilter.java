package toolguys.library.library.security.utils;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import toolguys.library.library.domain.Member;
import toolguys.library.library.security.service.RedisService;
import toolguys.library.library.security.service.SecurityMemberService;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private final SecurityMemberService securityMemberService;

	@Autowired
	private final RedisService redisService;

	private final String secretKey;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (authorization == null || !authorization.startsWith("Bearer ")) {
			log.error("authorization 이 없습니다.");
			filterChain.doFilter(request, response);
			return;
		}

		// Token 꺼내기
		String token = authorization.split(" ")[1];

		// Token 에서 이름 꺼내기
		String userEmail = JwtUtil.getUserEmail(token, secretKey);

		Iterator<String> tokensSet = redisService.getSets(userEmail).iterator();
		String accessToken = "";
		String refreshToken = "";
		while (tokensSet.hasNext()) {
			String currentToken = tokensSet.next();
			if (currentToken.startsWith("atk")) {
				accessToken = currentToken.split("atk")[1];
			} else if (currentToken.startsWith("rtk")) {
				refreshToken = currentToken.split("rtk")[1];
			}
		}
		System.out.println(Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(accessToken).getBody()
				.getExpiration());

		// Token Expired 되었는지 여부
		if (JwtUtil.isExpired(refreshToken, secretKey)) {
			log.error("token이 만료 되었습니다.");
			filterChain.doFilter(request, response);
			return;
		} else if (JwtUtil.isExpired(accessToken, secretKey)) {
			String retoken = JwtUtil.createJwt(userEmail, secretKey, 100 * 20 * 20L).get(0);
			redisService.deleteValues(userEmail);
			redisService.setSets(userEmail, "atk" + retoken, "rtk" + refreshToken);
			response.setHeader("Authorization", "Bearer " + retoken);
		}
		// Member 에서 권한 꺼내기
		Member member = securityMemberService.findByMemberEmail(userEmail).get();
		// 권한 부여
		if (member.getMemeberOrAdmin() == 2) {
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail,
					null, List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
			// Detail을 넣어줍니다.
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			filterChain.doFilter(request, response);
		} else {
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail,
					null, List.of(new SimpleGrantedAuthority("ROLE_USER")));
			// Detail을 넣어줍니다.
			authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			filterChain.doFilter(request, response);
		}

	}
}
