package toolguys.library.library.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "MYBOOKS")
public class MyBooks {
	@Id
	@Column(name = "MYBOOKSSEQ")
	private long myBooksSeq;

	@ManyToOne
	private Book book;

	@ManyToOne
	private Member member;
}
