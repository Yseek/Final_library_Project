package toolguys.library.library.service.admin;

import java.util.HashMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Member;

public interface AdminMemberServiceLdaew {
	Page<Member> memberList(Pageable pageable);
	Page<Member> searchMember(HashMap<String, String> searchData, Pageable pageable);
}
