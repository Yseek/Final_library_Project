package toolguys.library.library.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.service.user.MybookhopeService;

@RequestMapping("user")
@RestController
public class MybookhopeController {
    
    @Autowired
	MybookhopeService mybookhopeService;
    
    @GetMapping("mybookhope")
    public List<BookHope> Mybookhope(long memberSeq){
        return mybookhopeService.getMybookhopeS(memberSeq);
    }
}
