package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Sort;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.service.admin.AdminBookHopeServiceYSH;

@RequestMapping("admin")
@RestController
public class AdminBookHopeControllerYSH {
    @Autowired
    AdminBookHopeServiceYSH adminBookHopeServiceYSH;

    @GetMapping("bookHope")
    public Page<BookHope> bookHopeMain(@PageableDefault(page=0, size=10, sort="bookHopeSeq", direction = Sort.Direction.DESC) Pageable pageable){
        return adminBookHopeServiceYSH.BookHopeListAll(pageable);
    }

    @GetMapping("bookHopeOk/{seq}")
    public BookHope bookHopeRead(@PathVariable long seq){
        System.out.println("나와라요"+adminBookHopeServiceYSH.bookHopeRead(seq));
        return adminBookHopeServiceYSH.bookHopeRead(seq);
    }
    
}
