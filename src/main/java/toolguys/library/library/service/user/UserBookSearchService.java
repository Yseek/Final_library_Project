package toolguys.library.library.service.user;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.user.UserBookSearchListDto;
import toolguys.library.library.repository.user.UserBookSearchRepository;

@Service
public class UserBookSearchService {

	@Autowired
	UserBookSearchRepository userBookSearchRepository;

	public List<UserBookSearchListDto> searchBook(String bookTitle) {

		List<Book> books = userBookSearchRepository.findByBookTitleContaining(bookTitle);

		Map<String, Long> list = books.stream()
				.filter(item -> books.stream().filter(e -> e.getBookTitle().equals(item.getBookTitle()))
						.filter(e -> e.getBookPub().equals(item.getBookPub()))
						.filter(e -> e.getBookWriter().equals(item.getBookWriter())).count() > 0)
				.collect(Collectors.groupingBy(book -> book.getBookTitle() + book.getBookWriter() + book.getBookPub(),
						Collectors.counting()));

		Map<String, Long> enable = books.stream()
				.filter(e -> e.getBookStatus() == 1)
				.collect(Collectors.groupingBy(book -> book.getBookTitle() + book.getBookWriter() + book.getBookPub(),
						Collectors.counting()));

		List<UserBookSearchListDto> dto = books.stream()
				.collect(Collectors.toMap(
						e -> e.getBookTitle() + e.getBookWriter() + e.getBookPub(),
						e -> UserBookSearchListDto.builder()
								.bookTitle(e.getBookTitle())
								.bookWriter(e.getBookWriter())
								.bookPub(e.getBookPub())
								.bookCount(
										String.valueOf(list.get(e.getBookTitle() + e.getBookWriter() + e.getBookPub())))
								.bookImgPath(e.getBookImgPath())
								.bookEnable(String.valueOf(enable.get(e.getBookTitle() + e.getBookWriter() + e.getBookPub())))
								.build(),
						(dto1, dto2) -> dto1))
				.values()
				.stream()
				.collect(Collectors.toList());
		return dto;
	}
}
