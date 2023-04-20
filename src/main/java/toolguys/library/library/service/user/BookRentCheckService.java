package toolguys.library.library.service.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import toolguys.library.library.domain.BookRent;

public interface BookRentCheckService {
    Page<BookRent> bookrentmember(String memberemail ,Pageable pageable);

}
