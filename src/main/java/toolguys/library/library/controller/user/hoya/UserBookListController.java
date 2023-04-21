package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.user.hoya.UserBookListRepository;
import toolguys.library.library.service.user.hoya.UserBookListService;
import toolguys.library.library.service.user.hoya.UserBookListServiceInterface;

@RestController
@RequestMapping("user")
public class UserBookListController {

	@Autowired
	UserBookListServiceInterface userBookListServiceInterface;

	@Autowired
	UserBookListService userBookListService;

	@Autowired
	UserBookListRepository userBookListRepository;

	@GetMapping("bookList")
	public Page<Book> bookList(
	@PageableDefault(page = 0, size = 3, sort = "bookSeq", direction =
	Sort.Direction.DESC) Pageable pageable,
	Model model) {
	return userBookListServiceInterface.bookListByBook(pageable);
	}
}
