package toolguys.library.library.dto.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;
import toolguys.library.library.domain.Member;

@Entity
@Data
public class AdminBookLostDTO {
	@Id
	@Column(name = "BOOKSEQ")
	private long bookSeq;

	@Column(name = "BOOKTITLE")
	private String bookTitle;

	@Column(name = "BOOKWRITER")
	private String bookWriter;

	@Column(name = "BOOKPUB")
	private String bookPub;

	@Column(name = "BOOKSTORY")
	private String bookStory;

	@Column(name = "BOOKIMGNAME")
	private String bookImgName;

	@Column(name = "BOOKIMGPATH")
	private String bookImgPath;

	@Column(name = "BOOKIMGOGN")
	private String bookImgOgn;

	@Column(name = "BOOKSTATUS")
	private byte bookStatus;

	@ManyToOne
    private Member member;
}