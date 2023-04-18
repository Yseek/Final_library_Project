package toolguys.library.library.service.admin;

import java.util.HashMap;

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
    @Override
    public Page<Member> searchMember(HashMap<String, String> searchData, Pageable pageable) {
        String category = searchData.get("category");
        String keyword = searchData.get("keyword");
        System.out.println(String.format("### %s", category));

        /* switch(category){
            case "회원번호" : return adminMemberRepositoryLdaew.find .findAllById(Long.parseLong(keyword), pageable);
        } */
        return adminMemberRepositoryLdaew.findAll(pageable);
    }
    
}
