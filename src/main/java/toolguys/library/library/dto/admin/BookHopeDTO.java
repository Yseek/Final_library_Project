package toolguys.library.library.dto.admin;

import lombok.Data;

@Data
public class BookHopeDTO {
    private String bookTitle;
    private String bookWriter;
    private String bookPub;
    private String bookStory;
    private String bookImgName;
    private String bookImgPath;
    private String bookImgOgn;    
    private long bookHopeSeq;
    private byte bookHopeStatus;
}
