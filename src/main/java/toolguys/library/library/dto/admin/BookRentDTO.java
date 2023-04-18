package toolguys.library.library.dto.admin;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.RentCard;

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

    @ManyToOne
    private RentCard rentCard;

    @ManyToOne
    private Book book;
}
