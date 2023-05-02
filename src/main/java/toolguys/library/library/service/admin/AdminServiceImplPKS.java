package toolguys.library.library.service.admin;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.dto.admin.BookRentDTO;
import toolguys.library.library.dto.admin.BookReserveDTO;
import toolguys.library.library.mapper.admin.AdminMapperPKS;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Service
public class AdminServiceImplPKS implements AdminServicePKS{
    @Autowired
    AdminMapperPKS adminMapperPKS;

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public List<BookDTO> bookList(){
        return adminMapperPKS.bookList();
    }

    @Override
    public List<BookDTO> bookDetail(String title, String writer, String pub){
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        return adminMapperPKS.bookDetail(map);
    }

    @Override
    @Transactional
    public void bookReserve(long memberSeq, long bookSeq){
        HashMap<String, Object> map = new HashMap<>();
        map.put("memberSeq", memberSeq);
        map.put("bookSeq", bookSeq);
        adminMapperPKS.bookUpdateByReserve(bookSeq);
        adminMapperPKS.insertBookReserve(map);
    }

    @Override
    public List<BookDTO> selectAll(){
        return adminMapperPKS.selectAll();
    }

    @Override
    public List<BookDTO> listBySearch(String option, String keyword) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("option", option);
        map.put("keyword", keyword);
        return adminMapperPKS.listBySearch(map);
    }
    @Override
    public List<BookDTO> searchAll(String keyword){
        return adminMapperPKS.searchAll(keyword);
    }

    @Override
    public List<BookDTO> searchDetail(String title, String writer, String pub){
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        return adminMapperPKS.searchDetail(map);
    }


    @Override
    public BookDTO searchByBookId(long seq){
        return adminMapperPKS.searchByBookId(seq);
    }

    @Override
    public List<BookDTO> selectBookInfo(String title, String writer, String pub){
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        return adminMapperPKS.selectBookInfo(map);
    }

    @Override
    public List<BookReserveDTO> allBookReserve(){
        return adminMapperPKS.allBookReserve();
    }

    @Override
    public List<BookReserveDTO> searchReserve(String option, String keyword){
        HashMap<String, Object> map = new HashMap<>();
        map.put("option", option);
        map.put("keyword", keyword);
        return adminMapperPKS.searchReserve(map);
    }

    @Override
    public List<BookRentDTO> searchRentList(String option, String keyword){
        HashMap<String, Object> map = new HashMap<>();
        map.put("option", option);
        map.put("keyword", keyword);
        return adminMapperPKS.searchRentList(map);
    }

    @Override
    @Transactional
    public void updateByReturn(long bookRentSeq, long bookSeq){
        adminMapperPKS.bookUpdateByReturn(bookSeq);
        adminMapperPKS.statUpdateByReturn(bookRentSeq);
    }

    @Override
    public List<BookRentDTO> bookRentList(){
        return adminMapperPKS.bookRentList();
    }
    @Override
    public void updateBookInfo(BookDTO dto){
        HashMap<String, Object> map = new HashMap<>();
        map.put("seq", dto.getBookSeq());
        map.put("title", dto.getBookTitle());
        map.put("writer", dto.getBookWriter());
        map.put("pub", dto.getBookPub());
        map.put("status", dto.getBookStatus());
        adminMapperPKS.updateBookInfo(map);
    }

    @Override
    public void updateBookInfoDetail(String title, String writer, String pub, String bookStory, long seq, byte status, MultipartFile files) {

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(files.getContentType());
        objectMetadata.setContentLength(files.getSize());

        String origName = files.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = origName.substring(origName.lastIndexOf("."));

        String savedName = uuid + extension;

        try (InputStream inputStream = files.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, savedName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }catch(Exception e) {
            e.printStackTrace();
        }
        String storeFileUrl = amazonS3Client.getUrl(bucket, savedName).toString();

        HashMap<String, Object> map = new HashMap<>();
        map.put("seq", seq);
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        map.put("status", status);
        map.put("bookStory", bookStory);
        map.put("bookImgName", savedName);
        map.put("bookImgPath", storeFileUrl);
        map.put("boomImgOgn", origName);
        adminMapperPKS.updateBookInfoDetail(map);
    }

    @Override
    public void updateBookInfoDetail2(String title, String writer, String pub, String bookStory, long seq, byte status){
        HashMap<String, Object> map = new HashMap<>();
        map.put("seq", seq);
        map.put("title", title);
        map.put("writer", writer);
        map.put("pub", pub);
        map.put("status", status);
        map.put("bookStory", bookStory);
        adminMapperPKS.updateBookInfoDetail2(map);
    }
    @Override
    @Transactional
    public void updateByRent(long reserveSeq, long bookSeq, long memberSeq){
        adminMapperPKS.insertRentCard(memberSeq);
        adminMapperPKS.insertBookRent(bookSeq);
        adminMapperPKS.bookUpdateByRent(bookSeq);
        adminMapperPKS.statUpdateByRent(reserveSeq);
    }

    @Override
    @Transactional
    public void updateByCancel(long reserveSeq, long bookSeq){
        adminMapperPKS.bookUpdateByCancel(bookSeq);
        adminMapperPKS.statUpdateByCancel(reserveSeq);
    }

    @Override
    public void deleteBook(long seq){
        adminMapperPKS.deleteBook(seq);
    }
}
