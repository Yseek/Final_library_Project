package toolguys.library.library.dto.admin;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdminBookRentDto {
    private final long bookSeq;
    private final String bookTitle;
    private final String bookWriter;
    private final String bookPub;
    private final byte bookStatus;

    public static AdminBookRentDto from(AdminBookRentVo book){
        return AdminBookRentDto.builder()
        .bookSeq(book.getBOOKSEQ())
        .bookTitle(book.getBOOKTITLE())
        .bookWriter(book.getBOOKWRITER())
        .bookPub(book.getBOOKPUB())
        .bookStatus(book.getBOOKSTATUS())
        .build();
    }
}
