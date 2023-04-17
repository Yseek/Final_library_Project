package toolguys.library.library.configuration.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.repository.user.hoya.BookListRepository;
import toolguys.library.library.service.user.hoya.BookListService;
import toolguys.library.library.service.user.hoya.BookListServiceInterface;

@Configuration
public class BookListConfig {

  @Autowired
	BookListRepository bookListRepository;

	@Bean
	public BookListServiceInterface bookListServiceInterface(){
		return new BookListService(bookListRepository);
	}
  
}
