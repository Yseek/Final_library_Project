package toolguys.library.library.service.admin;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.MemberProfileDTO;

public interface ProfileServiceInterface {
    Member getBySeqS(long seq);

    void updateProfile(MemberProfileDTO memberProfileDTO);
}
