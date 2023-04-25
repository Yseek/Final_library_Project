package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.Book;

@Mapper
public interface MybooklistMapper {
    List<Book> getMybooklist(HashMap<String, Object> input);
    long getTotalCount(long memberSeq);
}
