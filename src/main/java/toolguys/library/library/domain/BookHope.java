package toolguys.library.library.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
@Table(name = "BOOKHOPE")
public class BookHope {
	@Id
	@Column(name = "BOOKHOPESEQ")
	private long bookHopeSeq;

	@Column(name = "BOOKHOPETITLE")
	private String bookHopeTitle;

	@Column(name = "BOOKHOPEWRITER")
	private String bookHopeWriter;

	@Column(name = "BOOKHOPEPUB")
	private String bookHopePub;

	@Column(name = "BOOKHOPEWANTDAY")
	@DateTimeFormat(pattern = "yyyy-MM")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date bookHopeWantDay;
	
	@Column(name = "BOOKHOPESTATUS")
	private byte bookHopeStatus;
	
	@ManyToOne
	private Member member;


}
