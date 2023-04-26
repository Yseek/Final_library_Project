package toolguys.library.library.configuration.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.services.s3.AmazonS3Client;

import toolguys.library.library.repository.admin.AdminAddBooksRepository;
import toolguys.library.library.service.admin.AdminAddBooksService;

@Configuration
public class AdminAddBooksConfig {
	
	@Autowired
	AdminAddBooksRepository adminAddBooksRepository;

	AmazonS3Client amazonS3Client;

	@Bean
	public AdminAddBooksService adminAddBooksService(AdminAddBooksRepository adminAddBooksRepository,
			AmazonS3Client amazonS3Client) {
		return new AdminAddBooksService(adminAddBooksRepository, amazonS3Client);
	}
}
