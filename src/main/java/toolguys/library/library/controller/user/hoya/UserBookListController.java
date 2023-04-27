package toolguys.library.library.controller.user.hoya;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.service.admin.AdminServicePKS;

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
