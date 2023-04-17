package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Member;
import toolguys.library.library.repository.admin.AdminMemberRepositoryLdaew;

public class AdminMemberServiceImplLdaew implements AdminMemberServiceLdaew {

    @Autowired
    private final AdminMemberRepositoryLdaew adminMemberRepositoryLdaew;

    public AdminMemberServiceImplLdaew(AdminMemberRepositoryLdaew adminMemberRepositoryLdaew){
        this.adminMemberRepositoryLdaew = adminMemberRepositoryLdaew;
    }
    @Override
    public Page<Member> memberList(Pageable pageable) {
        return adminMemberRepositoryLdaew.findAll(pageable);
    }
    
}
