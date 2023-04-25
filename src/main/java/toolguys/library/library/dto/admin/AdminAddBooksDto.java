package toolguys.library.library.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminAddBooksDto {
	private String bookTitle;
	private String bookWriter;
	private String bookPub;
	private String bookStory;
	private byte bookStatus;
}
