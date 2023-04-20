package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.domain.Member;
import toolguys.library.library.service.user.hoya.BookHopeServiceInterface;

@RestController
@RequestMapping("user")
public class BookHopeController {
  @Autowired
	BookHopeServiceInterface bookHopeServiceInterface;

	@GetMapping("bookHope")
	public Page<BookHope> bookHopeCheck(
			@PageableDefault(page = 0, size = 3, sort = "bookHopeSeq", direction = Sort.Direction.DESC) Pageable pageable,
			Model model) {
		Member member = bookHopeServiceInterface.findMember(1);
		return bookHopeServiceInterface.listBookHopeByMember(member, pageable);
	}

	@DeleteMapping("bookHope/delete/{bookHopeSeq}")
	public void delete(@PathVariable long bookHopeSeq) {
		bookHopeServiceInterface.deleteBookHope(bookHopeSeq);
	}  
}
