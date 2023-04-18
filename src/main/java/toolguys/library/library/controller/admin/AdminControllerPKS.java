package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.service.admin.AdminServicePKS;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminControllerPKS {
	@Autowired
    AdminServicePKS adminServicePKS;

    @GetMapping("booklist")
    public ResponseEntity<List> bookList(){
        System.out.println(adminServicePKS.selectAll());
        return ResponseEntity.ok().body(adminServicePKS.selectAll());
    }

    @GetMapping("booklist/title={keyword}")
    public List<BookDTO> bookListBySearch(@PathVariable String keyword){
        return adminServicePKS.listBySearch(keyword);
    }

    @GetMapping("booklist/id={seq}")
    public BookDTO bookSearch(@PathVariable long seq){
        return adminServicePKS.searchByBookId(seq);
    }

    @GetMapping("booklist/update/title={title}&writer={writer}&pub={pub}")
    public ResponseEntity<List> bookupdate(@PathVariable String title, @PathVariable String writer, @PathVariable String pub){
        return ResponseEntity.ok().body(adminServicePKS.selectBookInfo(title, writer, pub));
    }
    @GetMapping("bookinfo/title={title}&writer={writer}&pub={publisher}")
    public List<BookDTO> bookInfo(@PathVariable String title, @PathVariable String writer, @PathVariable String publisher){
        System.out.println("title: " + title);
        System.out.println("writer: " + writer);
        System.out.println("publisher: " + publisher);
        //adminServicePKS.bookInfo(title, writer, publisher);
        return null;
    }
}
