package toolguys.library.library.controller.admin;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import toolguys.library.library.dto.admin.AdminAddBooksDto;
import toolguys.library.library.service.admin.AdminAddBooksService;

@Controller
@RequestMapping("admin")
public class AdminAddBooks {

	@Autowired
	AdminAddBooksService addBooksService;

	@PostMapping("addBooks")
	public ResponseEntity<String> addBooks(@RequestParam("data") String data,
			@RequestParam("file") MultipartFile file)
			throws IOException {
		System.out.println("@@@@@@@@@@@@@" + data);
		ObjectMapper mapper = new ObjectMapper();
		AdminAddBooksDto adminAddBooksDto = mapper.readValue(data, AdminAddBooksDto.class);
		System.out.println(adminAddBooksDto);
		addBooksService.addBooks(adminAddBooksDto, file);
		return ResponseEntity.ok().body("등록완료");
	}
}
