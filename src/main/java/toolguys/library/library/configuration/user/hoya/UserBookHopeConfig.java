package toolguys.library.library.configuration.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.repository.user.hoya.UserBookHopeRepository;
import toolguys.library.library.security.repository.SecurityMemberRepository;
import toolguys.library.library.service.user.hoya.UserBookHopeService;
import toolguys.library.library.service.user.hoya.UserBookHopeServiceInterface;

@Configuration
public class UserBookHopeConfig {
  
  @Autowired
	UserBookHopeRepository userBookHopeRepository;

	@Autowired
	SecurityMemberRepository securityMemberRepository;

  @Bean
  public UserBookHopeServiceInterface userBookHopeServiceInterface(){
    return new UserBookHopeService(userBookHopeRepository, securityMemberRepository);
  }
  
}
