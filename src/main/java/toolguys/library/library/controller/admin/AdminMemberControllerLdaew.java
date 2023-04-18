package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Member;
import toolguys.library.library.service.admin.AdminMemberServiceLdaew;

@RequestMapping("admin")
@RestController
public class AdminMemberControllerLdaew {
    @Autowired
    AdminMemberServiceLdaew adminMemberServiceLdaew;

    @GetMapping("memberList")
    public Page<Member> memberList(
            @PageableDefault(page = 0, size = 2, sort = "memberSeq", direction = Sort.Direction.DESC) Pageable pageable) {

        return adminMemberServiceLdaew.memberList(pageable);
    }
}
