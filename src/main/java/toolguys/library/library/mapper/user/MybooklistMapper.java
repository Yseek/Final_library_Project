package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.MyBooks;
import toolguys.library.library.dto.user.MybooksDTO;

@Mapper
public interface MybooklistMapper {
    List<MybooksDTO> getMybooklist(HashMap<String, Object> input);
    long getTotalCount(long memberSeq);
    void deleteMybook(MyBooks mybooks);
}
