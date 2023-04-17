package toolguys.library.library.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Message {
	@Id
	@Column(name = "MESSAGESEQ")
	private long messageSeq;

	@Column(name = "MESSAGEDATE")
	private Date messageDate;

	@Column(name = "MESSAGECONTENT")
	private String messageContent;

	@ManyToOne
	private Member member;
}