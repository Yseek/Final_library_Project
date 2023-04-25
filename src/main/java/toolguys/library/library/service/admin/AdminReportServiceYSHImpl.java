package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.repository.admin.AdminBookRepositoryYSH;

@Service
public class AdminReportServiceYSHImpl implements AdminReportServiceYSH{

    @Autowired
    private final AdminBookRepositoryYSH adminBookRepositoryYSH;

    public AdminReportServiceYSHImpl(AdminBookRepositoryYSH adminBookRepositoryYSH){
        this.adminBookRepositoryYSH=adminBookRepositoryYSH;
    }

    @Override
    public Page<Book> reportListAll(Pageable pageable){
        return adminBookRepositoryYSH.findByBookStatus(pageable);
    }
}
