package toolguys.library.library.controller.admin;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.domain.admin.Paginator;
import toolguys.library.library.service.admin.NoticeService;

@RestController
public class NoticeController {

	@Autowired
	NoticeService noticeService;

	@GetMapping("notice")
	public HashMap<String, Object> notice(int page, int size) {
		long totalCount = noticeService.getTotalCountS();
		Paginator paginator = new Paginator(page, size, totalCount);
		HashMap<String, Integer> input = new HashMap<String, Integer>();
		input.put("offset", (page-1)*size);
        input.put("size", size);
		HashMap<String, Object> output = new HashMap<String, Object>();
		output.put("content", noticeService.listNoticeByPage(input));
		output.put("page", page);
		output.put("size", size);
		output.put("totalPages", paginator.getTotalPageCount());
		return output;
	}
	@GetMapping("notice/content/{noticeSeq}")
	public HashMap<String, Object> noticeContent(@PathVariable long noticeSeq){
		HashMap<String, Object> output = new HashMap<String, Object>();
		output.put("memberName", noticeService.getNoticeContentS(noticeSeq).getMember().getMemberName());
		output.put("noticeSeq", noticeService.getNoticeContentS(noticeSeq).getNoticeSeq());
		output.put("noticeTitle", noticeService.getNoticeContentS(noticeSeq).getNoticeTitle());
		output.put("noticeContent", noticeService.getNoticeContentS(noticeSeq).getNoticeContent());
		output.put("noticeRdate", noticeService.getNoticeContentS(noticeSeq).getNoticeRdate());
		return output;
	}
	@GetMapping("noticeAdmin")
	public HashMap<String, Object> noticeAdmin(int page, int size) {
		long totalCount = noticeService.getTotalCountS();
		Paginator paginator = new Paginator(page, size, totalCount);
		HashMap<String, Integer> input = new HashMap<String, Integer>();
		input.put("offset", (page-1)*size);
        input.put("size", size);
		HashMap<String, Object> output = new HashMap<String, Object>();
		output.put("content", noticeService.listNoticeByPage(input));
		output.put("page", page);
		output.put("size", size);
		output.put("totalPages", paginator.getTotalPageCount());
		return output;
	}
	@DeleteMapping("noticeAdmin/delete/{noticeSeq}")
	public void delete(@PathVariable long noticeSeq) {
		noticeService.deleteNoticeS(noticeSeq);
	}
	@PostMapping("noticeAdmin/write.do")
	public void noticeWrite(@RequestBody Notice notice){
		noticeService.insertNoticeS(notice);
	}
	@PostMapping("noticeAdmin/update.do")
	public void noticeUpdate(@RequestBody Notice notice){
		noticeService.updateNoticeS(notice);
	}
}
