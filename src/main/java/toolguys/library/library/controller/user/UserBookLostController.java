package toolguys.library.library.controller.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.service.user.UserBookLostService;

@RequestMapping("user")
@RestController
public class UserBookLostController {
    
    @Autowired
    UserBookLostService userBookLostService;

    @PostMapping("mybookrent/reportBookLost")
    public void reportBookLost(@RequestBody HashMap<String, String> bookLostData){
        long bookSeq = Long.parseLong(bookLostData.get("bookSeq"));
        long memberSeq = Long.parseLong(bookLostData.get("memberSeq"));
        userBookLostService.reportBookLost(bookSeq, memberSeq);
    }
}
