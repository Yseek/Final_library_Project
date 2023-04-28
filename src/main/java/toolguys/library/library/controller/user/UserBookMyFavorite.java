package toolguys.library.library.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.user.BookMyFavoriteDTO;
import toolguys.library.library.service.user.UserMyBooksService;

@RestController
@RequestMapping("user")
public class UserBookMyFavorite {
	
	@Autowired
	UserMyBooksService userMyBooksService;

	@PostMapping("/bookMyFavorite")
	public ResponseEntity<String> bookMyFavorite(@RequestBody BookMyFavoriteDTO dto){
		Book book = userMyBooksService.findBook(dto.getBookTitle(), dto.getBookWriter(), dto.getBookPub());
		Member member = userMyBooksService.findMember(dto.getInfo());
		userMyBooksService.addFavorite(book, member);
		return ResponseEntity.ok().body("추가완료");
	}
}
