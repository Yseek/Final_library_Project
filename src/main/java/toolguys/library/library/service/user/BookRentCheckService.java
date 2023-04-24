package toolguys.library.library.service.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import toolguys.library.library.dto.user.BookRentCheckDTO;

public interface BookRentCheckService {
    Page<BookRentCheckDTO> bookrentcheck(String memberemail ,Pageable pageable);

}
