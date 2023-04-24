package toolguys.library.library.service.admin;

import java.util.HashMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.AdminBookRentDto;
import toolguys.library.library.dto.admin.AdminMemberDto;

public interface AdminMemberServiceLdaew {
	Page<Member> memberList(Pageable pageable);
	Page<AdminMemberDto> searchMember(HashMap<String, String> searchData, Pageable pageable);
	AdminMemberDto memberContent(long memberSeq);
	Page<AdminBookRentDto> bookRentList(long memberSeq, Pageable pageable);
	Page<AdminBookRentDto> bookRentHistory(long memberSeq, Pageable pageable);
	Page<AdminBookRentDto> searchBookRent(HashMap<String, String> searchData, Pageable pageable);
}
