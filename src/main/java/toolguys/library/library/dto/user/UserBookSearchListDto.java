package toolguys.library.library.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserBookSearchListDto {
	private String bookTitle;
	private String bookWriter;
	private String bookPub;
	private String bookCount;
	private String bookImgPath;
	private String bookEnable;
}
