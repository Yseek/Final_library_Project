package toolguys.library.library.service.admin;

import org.springframework.transaction.annotation.Transactional;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.dto.admin.BookRentDTO;
import toolguys.library.library.dto.admin.BookReserveDTO;

import java.util.List;

public interface AdminServicePKS {
    List<BookDTO> bookList();

    List<BookDTO> bookDetail(String title, String writer, String pub);

    void bookReserve(long bookSeq, long memberSeq);

    List<BookDTO> selectAll();

    List<BookDTO> listBySearch(String option, String keyword);

    List<BookDTO> searchAll(String keyword);

    List<BookDTO> searchDetail(String title, String writer, String pub);

    BookDTO searchByBookId(long seq);

    List<BookDTO> selectBookInfo(String title, String writer, String pub);

    List<BookReserveDTO>  allBookReserve();


    List<BookReserveDTO> searchReserve(String option, String keyword);

    List<BookRentDTO> searchRentList(String option, String keyword);

    @Transactional
    void updateByReturn(long bookRentSeq, long bookSeq);

    List<BookRentDTO> bookRentList();

    void updateBookInfo(BookDTO dto);

    void updateBookInfoDetail(BookDTO dto);

    @Transactional
    void updateByRent(long reserveSeq, long bookSeq, long memberSeq);

    @Transactional
    void updateByCancel(long reserveSeq, long bookSeq);

    void deleteBook(long seq);
}
