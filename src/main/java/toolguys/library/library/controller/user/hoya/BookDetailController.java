package toolguys.library.library.controller.user.hoya;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.service.user.hoya.BookListService;

@RequiredArgsConstructor
@RestController
@RequestMapping("user")
public class BookDetailController {
  
  private final BookListService bookListService;

  @GetMapping("bookDetail/{bookSeq}")
  public ResponseEntity<?> findById(@PathVariable Long bookSeq) {
    return new ResponseEntity<>(bookListService.bookDetail(bookSeq), HttpStatus.OK);
  }

}
