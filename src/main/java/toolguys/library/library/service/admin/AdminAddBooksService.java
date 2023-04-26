package toolguys.library.library.service.admin;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import toolguys.library.library.domain.Book;
import toolguys.library.library.dto.admin.AdminAddBooksDto;
import toolguys.library.library.repository.admin.AdminAddBooksRepository;

public class AdminAddBooksService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	AmazonS3Client amazonS3Client;

	@Autowired
	private final AdminAddBooksRepository adminAddBooksRepository;

	public AdminAddBooksService(AdminAddBooksRepository adminAddBooksRepository, AmazonS3Client amazonS3Client) {
		this.adminAddBooksRepository = adminAddBooksRepository;
		this.amazonS3Client = amazonS3Client;
	}

	public Long addBooks(AdminAddBooksDto dto, MultipartFile files) throws IOException {

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
		book.setBookTitle(dto.getBookTitle());
		book.setBookWriter(dto.getBookWriter());
		book.setBookPub(dto.getBookPub());
		book.setBookStory(dto.getBookStory());
		book.setBookStatus(dto.getBookStatus());
		book.setBookImgOgn(origName);
		book.setBookImgName(savedName);
		book.setBookImgPath(storeFileUrl);
		adminAddBooksRepository.save(book);
		return book.getBookSeq();
	}

}
