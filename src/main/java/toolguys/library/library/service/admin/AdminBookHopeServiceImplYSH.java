package toolguys.library.library.service.admin;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.BookHope;
import toolguys.library.library.repository.admin.AdminBookHopeRepositoryYSH;
import toolguys.library.library.repository.admin.AdminBookRepositoryYSH;

@Service
public class AdminBookHopeServiceImplYSH implements AdminBookHopeServiceYSH {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	AmazonS3Client amazonS3Client;

	@Autowired
	private final AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH;
	@Autowired
	private final AdminBookRepositoryYSH adminBookRepositoryYSH;

	public AdminBookHopeServiceImplYSH(AmazonS3Client amazonS3Client,
			AdminBookHopeRepositoryYSH adminBookHopeRepositoryYSH, AdminBookRepositoryYSH adminBookRepositoryYSH) {
		this.amazonS3Client = amazonS3Client;
		this.adminBookHopeRepositoryYSH = adminBookHopeRepositoryYSH;
		this.adminBookRepositoryYSH = adminBookRepositoryYSH;
	}

	@Override
	public Page<BookHope> BookHopeListAll(Pageable pageable) {
		return adminBookHopeRepositoryYSH.findAll(pageable);
	}

	@Override
	public BookHope bookHopeRead(long seq) {
		return adminBookHopeRepositoryYSH.findById(seq).get();
	}

	@Override
	public Long bookHopeConvertingByBook(List<String> data, MultipartFile files) throws IOException {

		if (files.isEmpty()) {
			return null;
		}

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType(files.getContentType());
		objectMetadata.setContentLength(files.getSize());

		// 원래 파일 이름 추출
		String origName = files.getOriginalFilename();
		// 파일 이름으로 쓸 uuid 생성
		String uuid = UUID.randomUUID().toString();
		// 확장자 추출
		String extension = origName.substring(origName.lastIndexOf("."));

		String savedName = uuid + extension;

		try (InputStream inputStream = files.getInputStream()) {
			amazonS3Client.putObject(new PutObjectRequest(bucket, savedName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		}

		String storeFileUrl = amazonS3Client.getUrl(bucket, savedName).toString();

		Book book = new Book();
		book.setBookTitle(data.get(0));
		book.setBookWriter(data.get(1));
		book.setBookPub(data.get(2));
		book.setBookStory(data.get(3));
		book.setBookImgName(savedName);
		book.setBookImgPath(storeFileUrl);
		book.setBookImgOgn(origName);
		book.setBookStatus((byte) 1);
		adminBookRepositoryYSH.save(book);
		BookHope bookHope = adminBookHopeRepositoryYSH.findById(Long.valueOf(data.get(4))).get();
		bookHope.setBookHopeStatus(Byte.valueOf(data.get(5)));
		adminBookHopeRepositoryYSH.save(bookHope);
		return null;
	}

	@Override
	public void bookHopeDeny(long seq) {
		BookHope bookHope = adminBookHopeRepositoryYSH.findById(seq).get();
		bookHope.setBookHopeStatus((byte) 4);
		adminBookHopeRepositoryYSH.save(bookHope);
	}
}
