package toolguys.library.library.dto.admin;

import lombok.Builder;
import lombok.Data;
import toolguys.library.library.domain.Book;

@Builder
@Data
public class AdminBookRentDto {
    private final long bookSeq;
    private final String bookTitle;
    private final String bookWriter;
    private final String bookPub;
    private final byte bookStatus;

    public static AdminBookRentDto from(Book book){
        return AdminBookRentDto.builder()
        .bookSeq(book.getBookSeq())
        .bookTitle(book.getBookTitle())
        .bookWriter(book.getBookWriter())
        .bookPub(book.getBookPub())
        .bookStatus(book.getBookStatus())
        .build();
    }
}
