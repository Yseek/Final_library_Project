package toolguys.library.library.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "RENTCARD")
public class RentCard {
	@Id
	@Column(name = "RENTCARDSEQ")
	private long rentCardSeq;

	@ManyToOne
	private Member member;
}
