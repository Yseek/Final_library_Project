package toolguys.library.library.dto.admin;


import lombok.Data;

@Data
public class NoticeDTO {
	private String noticeTitle;
	private String noticeContent;
	private long memberSeq;
}