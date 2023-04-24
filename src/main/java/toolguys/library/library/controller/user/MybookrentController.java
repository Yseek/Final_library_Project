package toolguys.library.library.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookRent;
import toolguys.library.library.service.user.MybookrentService;

@RequestMapping("user")
@RestController
public class MybookrentController {
    
    @Autowired
	MybookrentService mybookrentService;
    
    @GetMapping("mybookrent")
    public List<BookRent> Mybookrent(long memberSeq){
        return mybookrentService.getMybookrentS(memberSeq);
    }
    @PostMapping("mybookrent/prolong.do")
    public void prolong(@RequestBody BookRent bookrent){
        mybookrentService.prolongMybookrentS(bookrent);
    }
}
