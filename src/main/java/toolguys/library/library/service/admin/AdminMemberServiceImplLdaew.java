package toolguys.library.library.service.admin;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookRent;
import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.AdminBookRentDto;
import toolguys.library.library.dto.admin.AdminMemberDto;
import toolguys.library.library.mapper.admin.AdminMemberMapper;
import toolguys.library.library.repository.admin.AdminMemberRepositoryLdaew;

public class AdminMemberServiceImplLdaew implements AdminMemberServiceLdaew {

    @Autowired
    private final AdminMemberRepositoryLdaew adminMemberRepositoryLdaew;

    @Autowired
    private final AdminMemberMapper adminMemberMapper;

    public AdminMemberServiceImplLdaew(AdminMemberRepositoryLdaew adminMemberRepositoryLdaew,
            AdminMemberMapper adminMemberMapper) {
        this.adminMemberRepositoryLdaew = adminMemberRepositoryLdaew;
        this.adminMemberMapper = adminMemberMapper;
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
    public Page<AdminBookRentDto> bookRentList(long memberSeq, Pageable pageable) {
        return adminMemberRepositoryLdaew.findBookRentList(memberSeq, pageable)
                .map(book -> AdminBookRentDto.from(book));
    }

    @Override
    public Page<AdminBookRentDto> bookRentHistory(long memberSeq, Pageable pageable) {
        return adminMemberRepositoryLdaew.findBookRentHistory(memberSeq, pageable)
                .map(book -> AdminBookRentDto.from(book));
    }

    @Override
    public Page<AdminBookRentDto> searchBookRent(HashMap<String, String> searchData, Pageable pageable) {
        long memberSeq = Long.parseLong(searchData.get("memberSeq"));
        String keyword = searchData.get("keyword");
        String category = searchData.get("category");

        switch (category) {
            case "책번호":
                category = "BOOKSEQ";
                break;
            case "제목":
                category = "BOOKTITLE";
                break;
            case "저자":
                category = "BOOKWRITER";
                break;
            case "출판사":
                category = "BOOKPUB";
                break;
            case "책상태(코드)":
                category = "BOOKSTATUS";
                break;
            default:
                category = "";
        }

        HashMap<String, Object> input = new HashMap<String, Object>();
        input.put("memberSeq", memberSeq);
        input.put("offset", pageable.getOffset());
        input.put("size", pageable.getPageSize());
        input.put("keyword", keyword);
        input.put("category", category);

        Page<AdminBookRentDto> searchedRentBooks = new PageImpl<AdminBookRentDto>(
                adminMemberMapper.searchBookRent(input).stream()
                        .map(bookRentStream -> AdminBookRentDto.from(bookRentStream)).toList(),
                pageable,
                adminMemberMapper.getTotalCount(memberSeq));

        return searchedRentBooks;
    }

    @Override
    public void addBlacklist(long memberSeq) {
        Member member = adminMemberRepositoryLdaew.findById(memberSeq).get();
        member.setMemberStatus((byte) 2);
        adminMemberRepositoryLdaew.save(member);
    }
}