package toolguys.library.library.service.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.Member;

public interface AdminMemberServiceLdaew {
	Page<Member> memberList(Pageable pageable);
}
