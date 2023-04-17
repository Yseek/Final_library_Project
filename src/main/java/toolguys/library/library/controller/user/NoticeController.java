package toolguys.library.library.controller.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.dongwon.Paginator;
import toolguys.library.library.service.user.NoticeService;

@RequestMapping("user")
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
}
