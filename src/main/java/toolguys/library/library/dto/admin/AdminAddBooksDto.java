package toolguys.library.library.dto.admin;

import lombok.Data;

@Data
public class AdminAddBooksDto {
	private String bookTitle;
	private String bookWriter;
	private String bookPub;
	private String bookStory;
	private byte bookStatus;
}
