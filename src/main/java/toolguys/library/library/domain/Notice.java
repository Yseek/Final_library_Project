package toolguys.library.library.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
	
	public String getFormattedNoticeRdate() {
        return noticeRdate.format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 a hh시 mm분 ss초"));
    }
}