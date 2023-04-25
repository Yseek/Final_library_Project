package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Book;
import toolguys.library.library.service.admin.AdminReportServiceYSH;

@RequestMapping("admin")
@RestController
public class AdminReportOfLossControllerYSH {

    @Autowired
    AdminReportServiceYSH adminReportServiceYSH;

    @GetMapping("reportOfLoss")
    public Page<Book> reportList(@PageableDefault(page=0, size=10, sort="bookSeq", direction = Sort.Direction.DESC) Pageable pageable){
        return adminReportServiceYSH.reportListAll(pageable);
    }
    
}
