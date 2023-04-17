package toolguys.library.library.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.security.service.SecurityMemberService;
import toolguys.library.library.security.utils.JwtFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	@Autowired
	private final SecurityMemberService securityMemberService;

	@Value("${jwt.secret}")
	private String secretKey;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.httpBasic(http -> http.disable()).csrf(csrf -> csrf.disable()).cors(cors -> cors.disable());
		// httpSecurity.authorizeHttpRequests(request -> request.antMatchers("/memberInfo").hasAnyRole("USER","ADMIN"));
		// httpSecurity.authorizeHttpRequests(request -> request.antMatchers("/user/**").hasRole("USER"));
		// httpSecurity.authorizeHttpRequests(request -> request.antMatchers("/admin/**").hasRole("ADMIN"));
		httpSecurity.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		httpSecurity.addFilterBefore(new JwtFilter(securityMemberService, secretKey),
				UsernamePasswordAuthenticationFilter.class);
		return httpSecurity.build();
	}
}
