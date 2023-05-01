package toolguys.library.library.configuration.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import toolguys.library.library.mapper.admin.AdminMemberMapper;
import toolguys.library.library.repository.admin.AdminMemberRepositoryLdaew;
import toolguys.library.library.service.admin.AdminMemberServiceImplLdaew;
import toolguys.library.library.service.admin.AdminMemberServiceLdaew;

@Configuration
public class AdminMemberConfigLdaew {
	@Autowired
    AdminMemberRepositoryLdaew adminMemberRepositoryLdaew;

    @Autowired
    AdminMemberMapper adminMemberMapper;

    @Bean
    public AdminMemberServiceLdaew adminMemberServiceLdaew(){
        return new AdminMemberServiceImplLdaew(adminMemberRepositoryLdaew, adminMemberMapper);
    }
}
