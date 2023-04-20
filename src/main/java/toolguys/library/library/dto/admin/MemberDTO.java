package toolguys.library.library.dto.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class MemberDTO {

    @Id
    @Column(name = "MEMBERSEQ")
    private long memberSeq;
    @Column(name = "MEMBEREMAIL")
    private String memberEmail;
    @Column(name = "MEMBERPWD")
    private String memberPwd;
    @Column(name = "MEMBERNAME")
    private String memberName;
    @Column(name = "MEMBERPHONE")
    private String memberPhone;
    @Column(name = "MEMBERBIRTH")
    private int memberBirth;
    @Column(name = "MEMBERADDR")
    private String memberAddr;
    @Column(name = "MEMBERSTATUS")
    private byte memberStatus;
    @Column(name = "MEMBERORADMIN")
    private byte memeberOrAdmin;
}
