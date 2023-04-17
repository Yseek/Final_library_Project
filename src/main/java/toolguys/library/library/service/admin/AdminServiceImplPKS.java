package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import toolguys.library.library.domain.Book;
import toolguys.library.library.mapper.admin.AdminMapperPKS;

import java.util.List;

@Service
public class AdminServiceImplPKS implements AdminServicePKS{
    @Autowired
    AdminMapperPKS adminMapperPKS;

    @Override
    public List<Book> selectAll(){
        return adminMapperPKS.selectAll();
    }

    @Override
    public List<Book> listBySearch(String sort, String keyword) {
        return adminMapperPKS.listBySearch(sort, keyword);
    }

}
