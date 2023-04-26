package toolguys.library.library.service.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.AdminBookLostDTO;
import toolguys.library.library.mapper.admin.AdminBookLostMapperYSH;
import toolguys.library.library.repository.admin.AdminBookRepositoryYSH;

@Service
public class AdminBookLostServiceYSHImpl implements AdminBookLostServiceYSH{

    @Autowired
    AdminBookLostMapperYSH adminBookLostMapperYSH;
    @Autowired
    AdminBookRepositoryYSH adminBookRepositoryYSH;

    @Override
    public List<AdminBookLostDTO> bookLostAll(){
        return adminBookLostMapperYSH.selectAll();
    }

    @Override
    public void bookLostOne(long seq) {
        Book book = adminBookRepositoryYSH.findById(seq).get();
        book.setBookStatus((byte)4);
        adminBookRepositoryYSH.save(book);
    }

    @Override
    public void bookReturnOne(long seq) {
        Book book = adminBookRepositoryYSH.findById(seq).get();
        book.setBookStatus((byte)1);
        adminBookRepositoryYSH.save(book);
    }
}