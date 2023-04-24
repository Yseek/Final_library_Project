package toolguys.library.library.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.BookRent;

@Mapper
public interface MybookrentMapper {
    List<BookRent> getMybookrent(long memberSeq);
    void prolongMybookrent(BookRent bookrent);
}
