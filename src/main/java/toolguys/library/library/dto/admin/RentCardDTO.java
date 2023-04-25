package toolguys.library.library.dto.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "RENTCARD")
public class RentCardDTO {
    @Id
    @Column(name = "RENTCARDSEQ")
    private long rentCardSeq;

    private long memberSeq;
}

