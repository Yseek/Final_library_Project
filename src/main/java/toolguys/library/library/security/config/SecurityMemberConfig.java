package toolguys.library.library.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import toolguys.library.library.security.repository.SecurityMemberRepository;
import toolguys.library.library.security.service.SecurityMemberService;

@Configuration
public class SecurityMemberConfig {
	@Autowired
	SecurityMemberRepository securityMemberRepository;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@Bean
	public SecurityMemberService securityMemberService2(SecurityMemberRepository securityMemberRepository,BCryptPasswordEncoder bCryptPasswordEncoder){
		return new SecurityMemberService(securityMemberRepository, bCryptPasswordEncoder);
	}
}
