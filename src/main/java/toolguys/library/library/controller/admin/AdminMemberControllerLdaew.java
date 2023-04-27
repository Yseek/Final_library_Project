package toolguys.library.library.controller.admin;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.AdminBookRentDto;
import toolguys.library.library.dto.admin.AdminMemberDto;
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

    @PostMapping("searchMember")
    public Page<AdminMemberDto> searchMember(
            @PageableDefault(page = 0, size = 2, sort = "memberSeq", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestBody HashMap<String, String> searchData) {

        return adminMemberServiceLdaew.searchMember(searchData, pageable);
    }

    @PostMapping("memberList/member")
    public AdminMemberDto memberContent(@RequestBody HashMap<String, String> memberData) {
        long memberSeq = Long.parseLong(memberData.get("memberSeq"));
        return adminMemberServiceLdaew.memberContent(memberSeq);
    }

    // 대출 현황
    @PostMapping("memberList/bookRentList")
    public Page<AdminBookRentDto> bookRentList(
            @PageableDefault(page = 0, sort = "memberSeq", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestBody HashMap<String, String> memberData) {
        long memberSeq = Long.parseLong(memberData.get("memberSeq"));
        return adminMemberServiceLdaew.bookRentList(memberSeq, pageable);
    }

    // 대출 기록
    @PostMapping("memberList/bookRentHistory")
    public Page<AdminBookRentDto> bookRentHistory(
            @PageableDefault(page = 0, size = 2, sort = "memberSeq", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestBody HashMap<String, String> memberData) {
        long memberSeq = Long.parseLong(memberData.get("memberSeq"));
        return adminMemberServiceLdaew.bookRentHistory(memberSeq, pageable);
    }

    // 책 검색
    @PostMapping("searchBookRent")
    public Page<AdminBookRentDto> searchBookRent(
        @PageableDefault(page = 0, size = 2, sort = "memberSeq", direction = Sort.Direction.DESC) Pageable pageable,
        @RequestBody HashMap<String, String> searchData) {
        return adminMemberServiceLdaew.searchBookRent(searchData, pageable);
    }

    @PostMapping("addBlacklist")
    public void addBlacklist(@RequestBody HashMap<String, String> memberData){
        long memberSeq = Long.parseLong(memberData.get("memberSeq"));
        adminMemberServiceLdaew.addBlacklist(memberSeq);
    }
}
