package toolguys.library.library.service.admin;

import java.util.List;

import toolguys.library.library.dto.admin.AdminBookLostDTO;

public interface AdminBookLostServiceYSH {
    List<AdminBookLostDTO> bookLostAll();
    void bookLostOne(long seq);
    void bookReturnOne(long seq);
}
