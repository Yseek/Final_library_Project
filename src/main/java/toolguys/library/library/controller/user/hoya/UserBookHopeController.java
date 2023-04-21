package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;
import toolguys.library.library.repository.user.hoya.UserBookHopeRepository;
import toolguys.library.library.service.user.hoya.UserBookHopeServiceInterface;

@RestController
@RequestMapping("user")
public class UserBookHopeController {
	@Autowired
	UserBookHopeServiceInterface userBookHopeServiceInterface;

	@Autowired
	UserBookHopeRepository userBookHopeRepository;

	@GetMapping("bookHope")
	public Page<BookHope> bookHopeCheck(
			@PageableDefault(page = 0, size = 3, sort = "bookHopeSeq", direction = Sort.Direction.DESC) Pageable pageable,
			Model model) {
		Member member = userBookHopeServiceInterface.findMember(1);
		return userBookHopeServiceInterface.listBookHopeByMember(member, pageable);
	}

	@DeleteMapping("bookHope/delete/{bookHopeSeq}")
	public void delete(@PathVariable long bookHopeSeq) {
		userBookHopeServiceInterface.deleteBookHope(bookHopeSeq);
	}

	@PostMapping("bookApply")
	public ResponseEntity<?> bookApply(@RequestBody BookHope bookHope) {
		userBookHopeRepository.save(bookHope);
		return ResponseEntity.ok().build();
	}
}
