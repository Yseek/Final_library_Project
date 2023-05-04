package toolguys.library.library.security.utils;

import java.io.IOException;
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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import toolguys.library.library.domain.Member;
import toolguys.library.library.security.service.SecurityMemberService;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private final SecurityMemberService securityMemberService;

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

		// Token Expired 되었는지 여부
		if (JwtUtil.isExpired(token, secretKey)) {
			log.error("token이 만료 되었습니다.");
			filterChain.doFilter(request, response);
			return;
		}

		// Token 에서 이름 꺼내기
		String userEmail = JwtUtil.getUserEmail(token, secretKey);

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
