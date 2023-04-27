package toolguys.library.library.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.dto.user.BookMyFavoriteDTO;

@RestController
@RequestMapping("user")
public class UserBookMyFavorite {
	
	@PostMapping("/bookMyFavorite")
	public ResponseEntity<String> bookMyFavorite(@RequestBody BookMyFavoriteDTO dto){
		return ResponseEntity.ok().body("추가완료");
	}
}
