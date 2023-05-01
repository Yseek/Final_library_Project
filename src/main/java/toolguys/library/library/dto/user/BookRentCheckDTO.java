package toolguys.library.library.dto.user;

import java.util.Date;

public interface BookRentCheckDTO {
    long getBOOKRENTSEQ();
    String getBOOKTITLE();
    String getBOOKWRITER();
    String getBOOKPUB();
    Date getBOOKRENTRDATE();
    Date getBOOKRENTDDAY();
    Date getBOOKRENTRETURN();
    byte getBOOKRENTCOIN();
}
