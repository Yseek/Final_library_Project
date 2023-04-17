package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import toolguys.library.library.domain.Book;
import toolguys.library.library.service.admin.AdminServicePKS;

import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminControllerPKS {
	@Autowired
    AdminServicePKS adminServicePKS;

    @GetMapping("booklist")
    public List<Book> bookList(){
        return adminServicePKS.selectAll();
    }

    @GetMapping("booklist?{sort}={keyword}")
    public List<Book> bookListBySearch(@PathVariable String sort, @PathVariable String keyword){
        System.out.println(adminServicePKS.listBySearch(sort, keyword));
        return adminServicePKS.listBySearch(sort, keyword);
    }

    @GetMapping("bookInfo?title={title}&writer={writer}")
    public Book bookInfo(@PathVariable String title, @PathVariable String writer){

    }
}
