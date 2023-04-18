package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import toolguys.library.library.domain.Book;
import toolguys.library.library.service.admin.AdminServicePKS;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminControllerPKS {
	@Autowired
    AdminServicePKS adminServicePKS;

    @GetMapping("booklist")
    public List<Book> bookList(){
        System.out.println(adminServicePKS.selectAll());
        return adminServicePKS.selectAll();
    }

    @GetMapping("booklist/title={keyword}")
    public List<Book> bookListBySearch(@PathVariable String keyword){
        return adminServicePKS.listBySearch(keyword);
    }

    @GetMapping("booklist/id={seq}")
    public Book bookSearch(@PathVariable long seq){
        return adminServicePKS.searchByBookId(seq);
    }

    @GetMapping("bookinfo/title={title}&writer={writer}&pub={publisher}")
    public List<Book> bookInfo(@PathVariable String title, @PathVariable String writer, @PathVariable String publisher){
        System.out.println("title: " + title);
        System.out.println("writer: " + writer);
        System.out.println("publisher: " + publisher);
        //adminServicePKS.bookInfo(title, writer, publisher);
        return null;
    }
}
