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
    public List<BookDTO> listBySearch(String option, String keyword) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("option", option);
        map.put("keyword", keyword);
        return adminMapperPKS.listBySearch(map);
    }
    @Override
    public List<BookDTO> searchAll(String keyword){
        return adminMapperPKS.searchAll(keyword);
    }

    @Override
    public List<BookDTO> searchDetail(String title, String writer, String pub){
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        return adminMapperPKS.searchDetail(map);
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

    @Override
    public void updateBookInfo(BookDTO dto){
        HashMap<String, Object> map = new HashMap<>();
        map.put("seq", dto.getBookSeq());
        map.put("title", dto.getBookTitle());
        map.put("writer", dto.getBookWriter());
        map.put("pub", dto.getBookPub());
        map.put("status", dto.getBookStatus());
        adminMapperPKS.updateBookInfo(map);
    }

    @Override
    public void updateBookInfoDetail(BookDTO dto){
        HashMap<String, Object> map = new HashMap<>();
        map.put("seq", dto.getBookSeq());
        map.put("title", dto.getBookTitle());
        map.put("writer", dto.getBookWriter());
        map.put("pub", dto.getBookPub());
        map.put("status", dto.getBookStatus());
        map.put("bookStory", dto.getBookStory());
        map.put("bookImgName", dto.getBookImgName());
        map.put("bookImgPath", dto.getBookImgPath());
        map.put("boomImgOgn", dto.getBookImgOgn());
        adminMapperPKS.updateBookInfoDetail(map);
    }
}
