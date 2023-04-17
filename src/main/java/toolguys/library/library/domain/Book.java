package toolguys.library.library.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Book {
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
}