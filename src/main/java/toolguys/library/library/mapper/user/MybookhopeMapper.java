package toolguys.library.library.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.BookHope;

@Mapper
public interface MybookhopeMapper {
    List<BookHope> getMybookhope(long memberSeq);
}
