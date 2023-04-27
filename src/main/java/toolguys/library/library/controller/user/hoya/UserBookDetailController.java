package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.service.admin.AdminServicePKS;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserBookDetailController {
    @Autowired
    AdminServicePKS adminServicePKS;

    @GetMapping("bookDetail/{title}&{writer}&{pub}")
    public ResponseEntity<List<BookDTO>> bookDetail(@PathVariable String title, @PathVariable String writer, @PathVariable String pub){
        System.out.println("title: " + title + ", writer: " + writer + ", pub: " + pub);
        System.out.println("11111111111111" + adminServicePKS.bookDetail(title, writer, pub));
        return ResponseEntity.ok().body(adminServicePKS.bookDetail(title, writer, pub));
    }
}