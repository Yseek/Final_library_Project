package toolguys.library.library.dto.user;

import javax.persistence.ManyToOne;

import lombok.Data;
import toolguys.library.library.domain.Member;

@Data
public class BookApplyDTO {
  private Long BookHopeSeq;
  private String BookHopeTitle;
  private String BookHopeWriter;
  private String BookHopePub;
  @ManyToOne
	private Member member;
  private Long memberSeq;
  
}
