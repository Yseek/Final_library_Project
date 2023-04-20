package toolguys.library.library.service.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;
import toolguys.library.library.repository.user.hoya.BookHopeRepository;
import toolguys.library.library.security.repository.SecurityMemberRepository;

public class BookHopeService implements BookHopeServiceInterface{

	@Autowired
	private final BookHopeRepository bookHopeRepository;

	@Autowired
	private final SecurityMemberRepository securityMemberRepository;

	public BookHopeService(BookHopeRepository bookHopeRepository, SecurityMemberRepository securityMemberRepository) {
		this.bookHopeRepository = bookHopeRepository;
		this.securityMemberRepository = securityMemberRepository;
	}

	@Override
	public Page<BookHope> listBookHopeByMember(Member member, Pageable pageable) {
		return bookHopeRepository.findAllByMember(member, pageable);
	}

	@Override
	public void deleteBookHope(long bookHopeSeq) {
		bookHopeRepository.deleteById(bookHopeSeq);
	}

	@Override
	public Member findMember(long memberSeq) {
		return securityMemberRepository.findById(memberSeq).get();
	}
}
