package toolguys.library.library.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "BOOKLOST")
public class BookLost {
	@Id
	@Column(name = "BOOKLOSTSEQ")
	private long bookLostSeq;
	
	@OneToOne
	private Book book;

	@ManyToOne
	private Member memeber;
}
