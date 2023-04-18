package toolguys.library.library.dto.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import toolguys.library.library.domain.Member;

@Entity
@Data
@Table(name = "RENTCARD")
public class RentCardDTO {
    @Id
    @Column(name = "RENTCARDSEQ")
    private long rentCardSeq;

    @ManyToOne
    private MemberDTO memberDTO;
}

