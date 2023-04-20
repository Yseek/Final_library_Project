package toolguys.library.library.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<List<BookDTO>> bookList(){
        System.out.println(adminServicePKS.selectAll());
        return ResponseEntity.ok().body(adminServicePKS.selectAll());
    }

    @GetMapping("booklist/title={keyword}")
    public List<BookDTO> bookListBySearch(@PathVariable String keyword){
        return adminServicePKS.listBySearch(keyword);
    }

    @GetMapping("booklist/id={seq}")
    public ResponseEntity<BookDTO> bookSearch(@PathVariable long seq){
        System.out.println("1111111111111111111111" + adminServicePKS.searchByBookId(seq));
        return ResponseEntity.ok().body(adminServicePKS.searchByBookId(seq));
    }

    @GetMapping("booklist/update/title={title}&writer={writer}&pub={pub}")
    public ResponseEntity<List<BookDTO>> bookUpdate(@PathVariable("title") String title, @PathVariable("writer") String writer, @PathVariable("pub") String pub){
        System.out.println(adminServicePKS.selectBookInfo(title, writer, pub));
        return ResponseEntity.ok().body(adminServicePKS.selectBookInfo(title, writer, pub));
    }

    @PostMapping("booklist/update")
    public void bookupdate(@RequestBody BookDTO dto){
        System.out.println("updateForm: " + dto);
        adminServicePKS.updateBookInfo(dto);
    }

    @GetMapping("bookinfo/title={title}&writer={writer}&pub={publisher}")
    public List<BookDTO> bookInfo(@PathVariable("title") String title, @PathVariable("writer") String writer, @PathVariable("publisher") String publisher){
        System.out.println("title: " + title);
        System.out.println("writer: " + writer);
        System.out.println("publisher: " + publisher);
        //adminServicePKS.bookInfo(title, writer, publisher);
        return null;
    }
}
