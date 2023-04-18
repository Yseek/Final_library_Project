package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.mapper.admin.AdminMapperPKS;

import java.util.List;

@Service
public class AdminServiceImplPKS implements AdminServicePKS{
    @Autowired
    AdminMapperPKS adminMapperPKS;

    @Override
    public List<BookDTO> selectAll(){
        return adminMapperPKS.selectAll();
    }

    @Override
    public List<BookDTO> listBySearch(String keyword) {
        return adminMapperPKS.listBySearch(keyword);
    }

    @Override
    public BookDTO searchByBookId(long seq){
        return adminMapperPKS.searchByBookId(seq);
    }

}
