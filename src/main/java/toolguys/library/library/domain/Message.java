package toolguys.library.library.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
public class Message {
	@Id
	@Column(name = "MESSAGESEQ")
	private long messageSeq;

	@Column(name = "MESSAGEDATE")
	@DateTimeFormat(pattern = "yyyy-MM")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date messageDate;

	@Column(name = "MESSAGECONTENT")
	private String messageContent;

	@ManyToOne
	private Member member;
}