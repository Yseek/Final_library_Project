package toolguys.library.library.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.jsonwebtoken.io.IOException;

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
        return adminBookHopeServiceYSH.bookHopeRead(seq);
    }

    @PostMapping("bookHopeOk/Input")
    public ResponseEntity<String> bookHopeOk(@RequestParam("data") List<String> data, @RequestParam("file") MultipartFile file) throws IOException {
        try {
            adminBookHopeServiceYSH.bookHopeConvertingByBook(data, file);
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().body("등록완료");
    }
   
    @GetMapping("bookHope/deny/{bookHopeSeq}")
    public void deny(@PathVariable long bookHopeSeq){
        adminBookHopeServiceYSH.bookHopeDeny(bookHopeSeq);
    }
}
