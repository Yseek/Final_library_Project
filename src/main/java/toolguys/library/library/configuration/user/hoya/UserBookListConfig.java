package toolguys.library.library.configuration.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.repository.user.hoya.UserBookListRepository;
import toolguys.library.library.service.user.hoya.UserBookListService;
import toolguys.library.library.service.user.hoya.UserBookListServiceInterface;

@Configuration
public class UserBookListConfig {

  @Autowired
	UserBookListRepository userBookListRepository;

	@Bean
	public UserBookListServiceInterface userBookListServiceInterface(){
		return new UserBookListService(userBookListRepository);
	}
  
}
