package toolguys.library.library.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;
import toolguys.library.library.dto.user.BookRentCheckDTO;
import toolguys.library.library.service.user.BookRentCheckService;

@RestController
public class BookRentCheckController {
    
    @Autowired
    BookRentCheckService bookRentCheckService;

    @GetMapping("bookrentcheck")
    public Page<BookRentCheckDTO> bookrent(
        @PageableDefault(page = 0, size = 10, sort = "bookrentSeq", direction = Sort.Direction.DESC) Pageable pageable){
            String memberemail = "sy062@naver.com";
            return bookRentCheckService.bookrentcheck(memberemail,pageable);
        }
}
