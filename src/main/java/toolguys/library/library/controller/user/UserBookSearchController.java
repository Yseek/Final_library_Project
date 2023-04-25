package toolguys.library.library.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.user.UserBookSearchDto;
import toolguys.library.library.service.user.UserBookSearchService;

@RestController
public class UserBookSearchController {
	
	@Autowired
	UserBookSearchService userBookSearchService;

	@PostMapping("/searchBook")
	public ResponseEntity<List<Book>> searchBook(@RequestBody UserBookSearchDto dto){
		return ResponseEntity.ok().body(userBookSearchService.searchBook(dto.getBookTitle()));
	}
}
