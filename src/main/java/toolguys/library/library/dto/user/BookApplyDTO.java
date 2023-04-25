package toolguys.library.library.dto.user;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookApplyDTO {
  private String bookHopeTitle;
  private String bookHopeWriter;
  private String bookHopePub;
  private Date bookHopeWantDay;
  private Long memberSeq;
  
}
