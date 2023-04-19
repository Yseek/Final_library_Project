package toolguys.library.library.mapper.admin;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.BookDTO;

import java.util.HashMap;
import java.util.List;

@Mapper
@Repository
public interface AdminMapperPKS {
	List<BookDTO> selectAll();

	List<BookDTO> listBySearch(String keyword);

	BookDTO searchByBookId(long seq);

	List<BookDTO> selectBookInfo(HashMap map);
}
