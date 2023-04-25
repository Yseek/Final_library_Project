package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.BookHope;

@Mapper
public interface MybookhopeMapper {
    List<BookHope> getMybookhope(HashMap<String, Object> input);
    long getTotalCount(long memberSeq);
}
