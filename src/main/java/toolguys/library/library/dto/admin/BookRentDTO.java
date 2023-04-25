package toolguys.library.library.dto.admin;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "BOOKRENT")
public class BookRentDTO {
    @Id
    @Column(name = "BOOKRENTSEQ")
    private long bookRentSeq;

    @Column(name = "BOOKRENTRDATE")
    private Date bookRentDate;

    @Column(name = "BOOKRENTDDAY")
    private Date bookRentDDay;

    @Column(name = "BOOKRENTRETURN")
    private Date bookRentReturn;

    @Column(name = "BOOKRENTCOIN")
    private byte bookRentCoin;

    private long rentCardSeq;

    private long bookSeq;
}
