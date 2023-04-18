package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.mapper.admin.AdminMapperPKS;

import java.util.HashMap;
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

    @Override
    public List<BookDTO> selectBookInfo(String title, String writer, String pub){
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        return adminMapperPKS.selectBookInfo(map);
    }
}
