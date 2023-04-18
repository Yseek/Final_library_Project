package toolguys.library.library.mapper.admin;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import toolguys.library.library.domain.Book;

import java.util.List;

@Mapper
@Repository
public interface AdminMapperPKS {
	List<Book> selectAll();

	List<Book> listBySearch(String keyword);

	Book searchByBookId(long seq);
}
