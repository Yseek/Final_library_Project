package toolguys.library.library.dto.admin;

import lombok.Builder;
import lombok.Data;
import toolguys.library.library.domain.Member;

@Builder
@Data
public class AdminMemberDto {
    private final long memberSeq;
    private final String memberName;
    private final String memberEmail;
    private final byte memberStatus;

    public static AdminMemberDto from(Member member){
        return AdminMemberDto.builder()
        .memberSeq(member.getMemberSeq())
        .memberName(member.getMemberName())
        .memberEmail(member.getMemberEmail())
        .memberStatus(member.getMemberStatus())
        .build();
    }
}
