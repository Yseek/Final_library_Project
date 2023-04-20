package toolguys.library.library.configuration.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.repository.user.hoya.BookHopeRepository;
import toolguys.library.library.security.repository.SecurityMemberRepository;
import toolguys.library.library.service.user.hoya.BookHopeService;
import toolguys.library.library.service.user.hoya.BookHopeServiceInterface;

@Configuration
public class BookHopeConfig {
  
  @Autowired
	BookHopeRepository bookHopeRepository;

	@Autowired
	SecurityMemberRepository securityMemberRepository;

  @Bean
  public BookHopeServiceInterface bookHopeServiceInterface(){
    return new BookHopeService(bookHopeRepository, securityMemberRepository);
  }
  
}
