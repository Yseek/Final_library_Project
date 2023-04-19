package toolguys.library.library.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Notice {
	@Id
	@Column(name = "NOTICESEQ")
	private long noticeSeq;

	@Column(name = "NOTICETITLE")
	private String noticeTitle;

	@Column(name = "NOTICECONTENT")
	private String noticeContent;

	@Column(name = "NOTICERDATE")
	private LocalDateTime noticeRdate;

	@ManyToOne
	private Member member;
}