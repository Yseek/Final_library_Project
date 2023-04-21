package toolguys.library.library.service.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.user.UserBookHopeDTO;
import toolguys.library.library.repository.user.hoya.UserBookHopeRepository;
import toolguys.library.library.security.repository.SecurityMemberRepository;

public class UserBookHopeService implements UserBookHopeServiceInterface{

	@Autowired
	private final UserBookHopeRepository userBookHopeRepository;

	@Autowired
	private final SecurityMemberRepository securityMemberRepository;

	public UserBookHopeService(UserBookHopeRepository userBookHopeRepository, SecurityMemberRepository securityMemberRepository) {
		this.userBookHopeRepository = userBookHopeRepository;
		this.securityMemberRepository = securityMemberRepository;
	}

	@Override
	public Page<BookHope> listBookHopeByMember(Member member, Pageable pageable) {
		return userBookHopeRepository.findAllByMember(member, pageable);
	}

	@Override
	public void deleteBookHope(long bookHopeSeq) {
		userBookHopeRepository.deleteById(bookHopeSeq);
	}

	@Override
	public Member findMember(long memberSeq) {
		return securityMemberRepository.findById(memberSeq).get();
	}

	public void submitBookRequest(UserBookHopeDTO userBookHopeDTO) throws Exception {
		BookHope bookHope = new BookHope();
		bookHope.setMemberSeq(userBookHopeDTO.getMemberSeq());
		bookHope.setBookHopeTitle(userBookHopeDTO.getBookHopeTitle());
		bookHope.setBookHopePub(userBookHopeDTO.getBooKHopePub());
		bookHope.setBookHopeWriter(userBookHopeDTO.getBooKHopeWriter());
		userBookHopeRepository.save(bookHope);
}
}
