package toolguys.library.library.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookReserveDTO {

  private Long bookSeq;
  private Long memberSeq;
}
