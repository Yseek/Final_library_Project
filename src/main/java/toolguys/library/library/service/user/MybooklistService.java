package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.dto.user.MybooksDTO;

public interface MybooklistService {
    List<MybooksDTO> getMybooklistS(HashMap<String, Object> input);
    long getTotalCountS(long memberSeq);
}
