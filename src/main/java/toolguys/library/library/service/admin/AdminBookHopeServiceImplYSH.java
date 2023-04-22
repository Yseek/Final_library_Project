package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.BookHope;
import toolguys.library.library.dto.admin.BookHopeDTO;
import toolguys.library.library.repository.admin.AdminBookHopeRepositoryYSH;
import toolguys.library.library.repository.admin.AdminBookRepositoryYSH;

@Service
public class AdminBookHopeServiceImplYSH implements AdminBookHopeServiceYSH{

    @Autowired
    private final AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH;
    @Autowired
    private final AdminBookRepositoryYSH adminBookRepositoryYSH;

    public AdminBookHopeServiceImplYSH(AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH, AdminBookRepositoryYSH adminBookRepositoryYSH){
        this.adminBookHopeRepositoryYSH = adminBookHopeRepositoryYSH;
        this.adminBookRepositoryYSH = adminBookRepositoryYSH;
    }

    @Override
    public Page<BookHope> BookHopeListAll(Pageable pageable){
        return adminBookHopeRepositoryYSH.findAll(pageable);
    }

    @Override
    public BookHope bookHopeRead(long seq){
        return adminBookHopeRepositoryYSH.findById(seq).get();
    }

    @Override
    public void bookHopeConvertingByBook(BookHopeDTO bookHopeDTO){
        Book book = new Book();
        book.setBookTitle(bookHopeDTO.getBookTitle());
        System.out.println("확인용3"+bookHopeDTO.getBookTitle());
        book.setBookWriter(bookHopeDTO.getBookWriter());
        System.out.println("확인용4"+bookHopeDTO.getBookWriter());
        book.setBookPub(bookHopeDTO.getBookPub());
        book.setBookStory(bookHopeDTO.getBookStory());
        book.setBookImgName(bookHopeDTO.getBookImgName());
        book.setBookImgPath(bookHopeDTO.getBookImgPath());
        book.setBookImgOgn(bookHopeDTO.getBookImgOgn());
        book.setBookStatus((byte)1);
        adminBookRepositoryYSH.save(book);
        BookHope bookHope = adminBookHopeRepositoryYSH.findById(bookHopeDTO.getBookHopeSeq()).get();
        bookHope.setBookHopeStatus(bookHopeDTO.getBookHopeStatus());
        adminBookHopeRepositoryYSH.save(bookHope);
    }

    @Override
    public void bookHopeDeny(long seq) {
        BookHope bookHope = adminBookHopeRepositoryYSH.findById(seq).get();
        bookHope.setBookHopeStatus((byte)4);
        adminBookHopeRepositoryYSH.save(bookHope);
    }
}
