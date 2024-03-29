package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.user.BookApplyDTO;
import toolguys.library.library.repository.user.hoya.UserBookHopeRepository;

@RestController
@RequestMapping("user")
public class UserBookHopeController {

	@Autowired
	UserBookHopeRepository userBookHopeRepository;

	@PostMapping("bookApply")
	public BookHope bookApply(@RequestBody BookApplyDTO bookApplyDTO) {
			BookHope bookHope = new BookHope();
			bookHope.setBookHopeTitle(bookApplyDTO.getBookHopeTitle());
			bookHope.setBookHopeWriter(bookApplyDTO.getBookHopeWriter());
			bookHope.setBookHopePub(bookApplyDTO.getBookHopePub());
			bookHope.setBookHopeWantDay(bookApplyDTO.getBookHopeWantDay());
			bookHope.setBookHopeStatus(bookApplyDTO.getBookHopeStatus());

			Member member = new Member();
			member.setMemberSeq(bookApplyDTO.getMemberSeq());
			bookHope.setMember(member);
			return userBookHopeRepository.save(bookHope);
	}
}
