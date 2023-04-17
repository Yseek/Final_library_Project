package toolguys.library.library.dto.admin;

import lombok.Builder;
import lombok.Data;
import toolguys.library.library.domain.Member;


@Builder
@Data
public class MemberProfileDTO {

    private long memberSeq;
    private String memberPhone;
    private String memberAddr;

    public static MemberProfileDTO from(Member member){
        return MemberProfileDTO.builder()
                .memberSeq(member.getMemberSeq())
                .memberPhone(member.getMemberPhone())
                .memberAddr(member.getMemberAddr())
                .build();
    }
}
