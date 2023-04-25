package toolguys.library.library.service.admin;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.AdminAddBooksDto;
import toolguys.library.library.repository.admin.AdminAddBooksRepository;

public class AdminAddBooksService {

	@Value("${file.dir}")
	private String fileDir;

	@Autowired
	private final AdminAddBooksRepository adminAddBooksRepository;

	public AdminAddBooksService(AdminAddBooksRepository adminAddBooksRepository) {
		this.adminAddBooksRepository = adminAddBooksRepository;
	}

	public Long addBooks(AdminAddBooksDto dto, MultipartFile files) throws IOException {

		if (files.isEmpty()) {
			return null;
		}
		// 원래 파일 이름 추출
		String origName = files.getOriginalFilename();
		// 파일 이름으로 쓸 uuid 생성
		String uuid = UUID.randomUUID().toString();
		// 확장자 추출
		String extension = origName.substring(origName.lastIndexOf("."));

		String savedName = uuid + extension;

		String savedPath = fileDir + savedName;

		Book book = new Book();
		book.setBookTitle(dto.getBookTitle());
		book.setBookWriter(dto.getBookWriter());
		book.setBookPub(dto.getBookPub());
		book.setBookStory(dto.getBookStory());
		book.setBookStatus(dto.getBookStatus());
		book.setBookImgOgn(origName);
		book.setBookImgName(savedName);
		book.setBookImgPath(savedPath);
		files.transferTo(new File(savedPath));
		adminAddBooksRepository.save(book);
		return book.getBookSeq();
	}

}
