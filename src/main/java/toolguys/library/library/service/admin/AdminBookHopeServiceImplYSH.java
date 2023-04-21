package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.repository.admin.AdminBookHopeRepositoryYSH;

@Service
public class AdminBookHopeServiceImplYSH implements AdminBookHopeServiceYSH{

    @Autowired
    private final AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH;

    public AdminBookHopeServiceImplYSH(AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH){
        this.adminBookHopeRepositoryYSH = adminBookHopeRepositoryYSH;
    }

    @Override
    public Page<BookHope> BookHopeListAll(Pageable pageable){
        return adminBookHopeRepositoryYSH.findAll(pageable);
    }

    @Override
    public BookHope bookHopeRead(long seq){
        return adminBookHopeRepositoryYSH.findById(seq).get();
    }
}
