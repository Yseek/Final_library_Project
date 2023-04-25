package toolguys.library.library.configuration.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.repository.admin.AdminAddBooksRepository;
import toolguys.library.library.service.admin.AdminAddBooksService;

@Configuration
public class AdminAddBooksConfig {
	@Autowired
	AdminAddBooksRepository adminAddBooksRepository;
	
	@Bean
	public AdminAddBooksService adminAddBooksService(AdminAddBooksRepository adminAddBooksRepository){
		return new AdminAddBooksService(adminAddBooksRepository);
	}
}
