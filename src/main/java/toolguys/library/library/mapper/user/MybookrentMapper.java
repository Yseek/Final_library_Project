package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.BookRent;

@Mapper
public interface MybookrentMapper {
    List<BookRent> getMybookrent(HashMap<String, Object> input);
    void prolongMybookrent(BookRent bookrent);
    long getTotalCount(long memberSeq);
}
