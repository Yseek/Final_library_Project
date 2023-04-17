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
@Table(name = "BOOKRESERVE")
public class BookReserve {
	@Id
	@Column(name = "BOOKRESERVESEQ")
	private long bookReserveSeq;

	@Column(name = "BOOKRESERVEDDAY")
	private Date bookReserveDDay;

	@ManyToOne
	private Member member;

	@ManyToOne
	private Book book;
}