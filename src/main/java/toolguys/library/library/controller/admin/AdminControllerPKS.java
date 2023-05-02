package toolguys.library.library.controller.admin;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import toolguys.library.library.dto.admin.BookDTO;
import toolguys.library.library.dto.admin.BookRentDTO;
import toolguys.library.library.dto.admin.BookReserveDTO;
import toolguys.library.library.service.admin.AdminServicePKS;

@RestController
@RequestMapping("admin")
public class AdminControllerPKS {
	@Autowired
    AdminServicePKS adminServicePKS;

    @GetMapping("booklist")
    public ResponseEntity<List<BookDTO>> bookList(){
        System.out.println(adminServicePKS.selectAll());
        return ResponseEntity.ok().body(adminServicePKS.selectAll());
    }

    @GetMapping("booklist/{option}={keyword}")
    public ResponseEntity<List<BookDTO>> bookListBySearch(@PathVariable String option, @PathVariable String keyword){
        return ResponseEntity.ok().body(adminServicePKS.listBySearch(option, keyword));
    }

    @GetMapping("booklist/search/{keyword}")
    public ResponseEntity<List<BookDTO>> searchAllBooks(@PathVariable String keyword){
        return ResponseEntity.ok().body(adminServicePKS.searchAll(keyword));
    }

    @GetMapping("booklist/search/detail/title={title}&writer={writer}&pub={pub}")
    public ResponseEntity<List<BookDTO>> searchDetail(@PathVariable("title") String title, @PathVariable("writer") String writer, @PathVariable("pub") String pub){
        return ResponseEntity.ok().body(adminServicePKS.searchDetail(title, writer, pub));
    }


    @GetMapping("booklist/id={seq}")
    public ResponseEntity<BookDTO> bookSearch(@PathVariable long seq){
        return ResponseEntity.ok().body(adminServicePKS.searchByBookId(seq));
    }

    @GetMapping("booklist/update/title={title}&writer={writer}&pub={pub}")
    public ResponseEntity<List<BookDTO>> bookUpdate(@PathVariable("title") String title, @PathVariable("writer") String writer, @PathVariable("pub") String pub){
        return ResponseEntity.ok().body(adminServicePKS.selectBookInfo(title, writer, pub));
    }

    @GetMapping("reserved")
    public ResponseEntity<List<BookReserveDTO>> allBookReserve(){
        return ResponseEntity.ok().body(adminServicePKS.allBookReserve());
    }

    @GetMapping("reserved/search/{option}={keyword}")
    public ResponseEntity<List<BookReserveDTO>> searchReserve(@PathVariable String option, @PathVariable String keyword){
        return ResponseEntity.ok().body(adminServicePKS.searchReserve(option, keyword));
    }

    @GetMapping("return")
    public ResponseEntity<List<BookRentDTO>> bookRentList(){
        System.out.println("111111111111111111" + adminServicePKS.bookRentList());
        return ResponseEntity.ok().body(adminServicePKS.bookRentList());
    }

    @GetMapping("return/search/{option}={keyword}")
    public ResponseEntity<List<BookRentDTO>> searchRentList(@PathVariable String option, @PathVariable String keyword){
        return ResponseEntity.ok().body(adminServicePKS.searchRentList(option, keyword));
    }

    @PostMapping("return/{bookRentSeq}&{bookSeq}")
    public void updateByReturn(@PathVariable long bookRentSeq, @PathVariable long bookSeq){
        adminServicePKS.updateByReturn(bookRentSeq, bookSeq);
    }

    @PostMapping("reserved/{reserveSeq}&{bookSeq}&{memberSeq}")
    public void updateByRent(@PathVariable long reserveSeq, @PathVariable long bookSeq, @PathVariable long memberSeq){
        adminServicePKS.updateByRent(reserveSeq, bookSeq, memberSeq);
    }

    @PostMapping("reserved/cancel={reserveSeq}&{bookSeq}")
    public void reserveCancel(@PathVariable long reserveSeq, @PathVariable long bookSeq){
        adminServicePKS.updateByCancel(reserveSeq, bookSeq);
    }

    @PostMapping("booklist/update")
    public void bookUpdate(@RequestBody BookDTO dto){
        adminServicePKS.updateBookInfo(dto);
    }

    @PostMapping("booklist/update/detail/1")
    public void bookUpdateDetail(@RequestParam("bookTitle") String title, @RequestParam("bookWriter") String writer, @RequestParam("bookPub") String pub, @RequestParam("bookStory") String bookStory, @RequestParam("bookSeq") long seq, @RequestParam("bookStatus") byte status, @RequestParam("file") MultipartFile file) throws IOException {
        System.out.println("11111111111111111111: " + file);
        adminServicePKS.updateBookInfoDetail(title, writer, pub, bookStory, seq, status, file);
    }

    @PostMapping("booklist/update/detail/2")
    public void bookUpdateDetail(@RequestParam("bookTitle") String title, @RequestParam("bookWriter") String writer, @RequestParam("bookPub") String pub, @RequestParam("bookStory") String bookStory, @RequestParam("bookSeq") long seq, @RequestParam("bookStatus") byte status) {
        System.out.println("22222222222222222222");
        adminServicePKS.updateBookInfoDetail2(title, writer, pub, bookStory, seq, status);
    }

    @GetMapping("bookinfo/title={title}&writer={writer}&pub={publisher}")
    public List<BookDTO> bookInfo(@PathVariable("title") String title, @PathVariable("writer") String writer, @PathVariable("publisher") String publisher){
        System.out.println("title: " + title);
        System.out.println("writer: " + writer);
        System.out.println("publisher: " + publisher);
        return null;
    }

    @PostMapping("booklist/delete/{seq}")
    public void bookWishDelete(@PathVariable long seq){
        System.out.println(seq);
        adminServicePKS.deleteBook(seq);
    }
}
