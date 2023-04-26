package toolguys.library.library.service.admin;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import toolguys.library.library.domain.BookHope;

public interface AdminBookHopeServiceYSH {
    Page<BookHope> BookHopeListAll(Pageable pageable);
    BookHope bookHopeRead(long seq);
    Long bookHopeConvertingByBook(String title, String writer, String pub, String bookStory, long bookHopeSeq, byte bookHopeStatus, MultipartFile files)throws IOException;
    void bookHopeDeny(long seq);
}
