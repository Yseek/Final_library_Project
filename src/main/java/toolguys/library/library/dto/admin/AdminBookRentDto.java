package toolguys.library.library.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import toolguys.library.library.domain.BookRent;

@AllArgsConstructor
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

    public static AdminBookRentDto from(BookRent bookRent){
        return AdminBookRentDto.builder()
        .bookSeq(bookRent.getBook().getBookSeq())
        .bookTitle(bookRent.getBook().getBookTitle())
        .bookWriter(bookRent.getBook().getBookWriter())
        .bookPub(bookRent.getBook().getBookPub())
        .bookStatus(bookRent.getBook().getBookStatus())
        .build();
    }
}
