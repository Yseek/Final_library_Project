package toolguys.library.library.dto.admin;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Date;

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
