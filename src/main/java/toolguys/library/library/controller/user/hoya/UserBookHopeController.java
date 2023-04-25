package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.dto.user.BookApplyDTO;
import toolguys.library.library.repository.user.hoya.UserBookHopeRepository;

@RestController
@RequestMapping("user")
public class UserBookHopeController {
  
  @Autowired
	UserBookHopeRepository userBookHopeRepository;

  @PostMapping("bookApply")
	public ResponseEntity<BookApplyDTO> create(@RequestBody BookApplyDTO bookApplyDTO) {
			BookHope bookHope = new BookHope();
			bookHope.setBookHopeTitle(bookApplyDTO.getBookHopeTitle());
			bookHope.setBookHopeWriter(bookApplyDTO.getBookHopeWriter());
			bookHope.setBookHopePub(bookApplyDTO.getBookHopePub());
			bookHope.setMember(bookApplyDTO.getMember());

			BookHope savedBook = userBookHopeRepository.save(bookHope);
			BookApplyDTO savedBookDTO = new BookApplyDTO();
			savedBookDTO.setBookHopeSeq(savedBook.getBookHopeSeq());
			savedBookDTO.setBookHopeTitle(savedBook.getBookHopeTitle());
			savedBookDTO.setBookHopeWriter(savedBook.getBookHopeWriter());
			savedBookDTO.setBookHopePub(savedBook.getBookHopePub());
			savedBookDTO.setMember(savedBook.getMember());

			return new ResponseEntity<>(savedBookDTO, HttpStatus.CREATED);
	}
  
}
