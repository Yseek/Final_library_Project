package toolguys.library.library.dto.admin;

import java.sql.Date;

import javax.persistence.Id;

import lombok.Data;

@Data
public class BookReserveDTO {
    @Id
    private long bookReserveSeq;

    private Date bookReservedDay;

    private byte bookReserveStatus;

    private long memberSeq;

    private String memberName;

    private long bookSeq;

    private String bookTitle;


}
