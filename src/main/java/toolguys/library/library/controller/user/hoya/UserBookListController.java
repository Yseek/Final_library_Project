package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.service.admin.AdminServicePKS;
import toolguys.library.library.service.user.hoya.UserBookListServiceInterface;

import java.util.List;

@RestController
public class UserBookListController {

//	@Autowired
//	UserBookListServiceInterface userBookListServiceInterface;

	@Autowired
	AdminServicePKS adminServicePKS;

//	@GetMapping("bookList")
//	public Page<Book> bookList(
//			@PageableDefault(page = 0, size = 3, sort = "bookSeq", direction = Sort.Direction.DESC) Pageable pageable,
//			Model model) {
//		return userBookListServiceInterface.bookListByBook(pageable);
//	}
	@GetMapping("bookList")
	public ResponseEntity<List<BookDTO>> bookList(){
		return ResponseEntity.ok().body(adminServicePKS.bookList());
	}

	@PostMapping("bookreserve/{memberSeq}&{bookSeq}")
	public void bookReserve(@PathVariable long memberSeq, @PathVariable long bookSeq){
		adminServicePKS.bookReserve(memberSeq, bookSeq);
	}
}
