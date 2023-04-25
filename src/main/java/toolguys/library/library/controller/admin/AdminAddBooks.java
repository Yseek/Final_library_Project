package toolguys.library.library.controller.admin;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import toolguys.library.library.dto.admin.AdminAddBooksDto;
import toolguys.library.library.service.admin.AdminAddBooksService;

@Controller
@RequestMapping("admin")
public class AdminAddBooks {

	@Autowired
	AdminAddBooksService addBooksService;

	@PostMapping("addBooks")
	public ResponseEntity<String> addBooks(@RequestParam("data") List<String> data,
			@RequestParam("file") MultipartFile file)
			throws IOException {
		addBooksService.addBooks(AdminAddBooksDto.builder()
				.bookTitle(data.get(0))
				.bookWriter(data.get(1))
				.bookPub(data.get(2))
				.bookStory(data.get(3))
				.bookStatus(Byte.valueOf(data.get(4))).build(), file);
		return ResponseEntity.ok().body("등록완료");
	}
}
