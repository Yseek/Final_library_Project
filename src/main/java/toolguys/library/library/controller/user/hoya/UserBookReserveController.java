package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookReserve;
import toolguys.library.library.dto.user.BookReservDTO;
import toolguys.library.library.service.user.hoya.UserBookReservService;
import toolguys.library.library.service.user.hoya.UserBookReservServiceInterface;

@RestController
@RequestMapping("user")
public class UserBookReserveController {

  @Autowired
  UserBookReservServiceInterface userBookReservServiceInterface;

	@Autowired
	UserBookReservService userBookReservService;

  @GetMapping("bookReserv")
	public Page<BookReserve> bookReserv(
			@PageableDefault(page = 0, size = 3, sort = "bookReserveSeq", direction = Sort.Direction.DESC) Pageable pageable,
			Model model) {
		return userBookReservServiceInterface.bookReservByBookReserve(pageable);
	}

	@DeleteMapping("bookReserv/{bookReserveSeq}")
  public ResponseEntity<?> deleteById(@PathVariable Long bookReserveSeq) {
    return new ResponseEntity<>(userBookReservService.deleteBookReserve(bookReserveSeq), HttpStatus.OK);
  }

	@PostMapping("bookReserv")
    public ResponseEntity<?> bookReserve(@RequestBody BookReservDTO bookReservDTO) {
        boolean result = userBookReservService.bookReserve(bookReservDTO.getBookSeq(), bookReservDTO.getMemberSeq()));

        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
  
}
