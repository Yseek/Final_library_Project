package toolguys.library.library.mapper.admin;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.dto.admin.BookRentDTO;
import toolguys.library.library.dto.admin.BookReserveDTO;

@Mapper
@Repository
public interface AdminMapperPKS {
	List<BookDTO> selectAll();

	List<BookDTO> listBySearch(HashMap<String, Object> map);

	BookDTO searchByBookId(long seq);

	List<BookDTO> selectBookInfo(HashMap<String, Object> map);

	List<BookDTO> searchAll(String keyword);

	List<BookDTO> searchDetail(HashMap<String, Object> map);

	List<BookReserveDTO> allBookReserve();

	List<BookReserveDTO> searchReserve(String option, String keyword);

	List<BookRentDTO> bookRentList();

	void updateBookInfo(HashMap<String, Object> map);

	void updateBookInfoDetail(HashMap<String, Object> map);

	void statUpdateByRent(long reserveSeq);

	void bookUpdateByRent(long bookSeq);

	void statUpdateByCancel(long reserveSeq);

	void bookUpdateByCancel(long bookSeq);

	void insertRentCard(long memberSeq);

	void insertBookRent(long bookSeq);

	void deleteBook(long seq);
}
