package toolguys.library.library.dto.admin;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Date;

@Data
@Entity
public class BookReserveDTO {
    @Id
    @Column(name = "BOOKRESERVESEQ")
    private long bookReserveSeq;

    @ManyToOne
    private MemberDTO memberDTO;

    @ManyToOne
    private BookDTO bookDTO;

    @Column(name = "BOOKRESERVEDDAY")
    private Date bookReservedDay;

    @Column(name = "BOOKRESERVESTATUS")
    private byte bookReserveStatus;
}
