package toolguys.library.library.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "BOOKRENT")
public class BookRent {
	@Id
	@Column(name = "BOOKRENTSEQ")
	private long bookRentSeq;

	@Column(name = "BOOKRENTRDATE")
	private Date bookRentRdate;

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