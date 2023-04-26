package toolguys.library.library.service.admin;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import toolguys.library.library.domain.BookHope;

public interface AdminBookHopeServiceYSH {
    Page<BookHope> BookHopeListAll(Pageable pageable);
    BookHope bookHopeRead(long seq);
    Long bookHopeConvertingByBook(List<String> data, MultipartFile files)throws IOException;
    void bookHopeDeny(long seq);
}
