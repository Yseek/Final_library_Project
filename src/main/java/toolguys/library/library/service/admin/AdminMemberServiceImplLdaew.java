package toolguys.library.library.service.admin;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.AdminBookRentVo;
import toolguys.library.library.dto.admin.AdminMemberDto;
import toolguys.library.library.repository.admin.AdminMemberRepositoryLdaew;

public class AdminMemberServiceImplLdaew implements AdminMemberServiceLdaew {

    @Autowired
    private final AdminMemberRepositoryLdaew adminMemberRepositoryLdaew;

    public AdminMemberServiceImplLdaew(AdminMemberRepositoryLdaew adminMemberRepositoryLdaew) {
        this.adminMemberRepositoryLdaew = adminMemberRepositoryLdaew;
    }

    @Override
    public Page<Member> memberList(Pageable pageable) {
        return adminMemberRepositoryLdaew.findAll(pageable);
    }

    @Override
    public Page<AdminMemberDto> searchMember(HashMap<String, String> searchData, Pageable pageable) {
        String category = searchData.get("category");
        String keyword = searchData.get("keyword");

        switch (category) {
            case "회원번호":
                return adminMemberRepositoryLdaew.findByMemberSeqContaining(keyword, pageable)
                        .map(member -> AdminMemberDto.from(member));
            case "이메일":
                return adminMemberRepositoryLdaew.findByMemberEmailContaining(keyword, pageable)
                        .map(member -> AdminMemberDto.from(member));
            case "책번호":
                return adminMemberRepositoryLdaew.findByBookSeqContaining(keyword, pageable)
                        .map(member -> AdminMemberDto.from(member));
            default:
                return null;
        }
    }

    @Override
    public AdminMemberDto memberContent(long memberSeq) {
        return AdminMemberDto.from(adminMemberRepositoryLdaew.findById(memberSeq).get());
    }

    @Override
    public Page<AdminBookRentVo> bookRentList(long memberSeq, Pageable pageable) {
        return adminMemberRepositoryLdaew.findBookRentList(memberSeq, pageable);
    }

}
