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

    public AdminMemberDto(long memberSeq, String memberName, String memberEmail, byte memberStatus){
        this.memberSeq = memberSeq;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberStatus = memberStatus;
    }

    public static AdminMemberDto from(Member member){
        return AdminMemberDto.builder()
        .memberSeq(member.getMemberSeq())
        .memberName(member.getMemberName())
        .memberEmail(member.getMemberEmail())
        .memberStatus(member.getMemberStatus())
        .build();
    }

    public static AdminMemberDto from(AdminMemberVo member){
        return AdminMemberDto.builder()
        .memberSeq(member.getMEMBERSEQ())
        .memberName(member.getMEMBERNAME())
        .memberEmail(member.getMEMBEREMAIL())
        .memberStatus(member.getMEMBERSTATUS())
        .build();
    }
}
