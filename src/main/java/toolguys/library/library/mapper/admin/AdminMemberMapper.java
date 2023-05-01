package toolguys.library.library.mapper.admin;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.BookRent;

@Mapper
public interface AdminMemberMapper {
    List<BookRent> searchBookRent(HashMap<String, Object> input);
    long getTotalCount(long memberSeq);
}
