package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.service.admin.AdminServicePKS;

import java.util.List;

@RestController
public class UserBookListController {

	@Autowired
	AdminServicePKS adminServicePKS;

	@GetMapping("bookList")
	public ResponseEntity<List<BookDTO>> bookList(){
		return ResponseEntity.ok().body(adminServicePKS.bookList());
	}

	@PostMapping("bookreserve/{memberSeq}&{bookSeq}")
	public void bookReserve(@PathVariable long memberSeq, @PathVariable long bookSeq){
		adminServicePKS.bookReserve(memberSeq, bookSeq);
	}
}
