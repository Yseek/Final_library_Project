package toolguys.library.library.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.service.admin.AdminServicePKS;

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

    @GetMapping("bookInfo/title={title}&writer={writer}")
    public Book bookInfo(@PathVariable String title, @PathVariable String writer){
        return null;
    }
}
