package toolguys.library.library.dto.user;

import lombok.Data;

@Data
public class MybooksDTO {
    private long myBooksSeq;
    private long bookSeq;
    private String bookTitle;
	private String bookImgPath;
	private String bookWriter;
    private String bookPub;
}
