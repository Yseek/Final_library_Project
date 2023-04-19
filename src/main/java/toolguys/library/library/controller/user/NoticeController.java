package toolguys.library.library.controller.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.domain.dongwon.Paginator;
import toolguys.library.library.service.user.NoticeService;

@RequestMapping("user")
@RestController
public class NoticeController {

	@Autowired
	NoticeService noticeService;

	@GetMapping("notice")
	public HashMap<String, Object> notice(int page, int size, String search) {
		long totalCount = noticeService.getTotalCountS();
		Paginator paginator = new Paginator(page, size, totalCount);
		HashMap<String, Object> input = new HashMap<String, Object>();
		input.put("offset", (page-1)*size);
		input.put("size", size);
		HashMap<String, Object> output = new HashMap<String, Object>();

		if(search == null) {
			output.put("content", noticeService.listNoticeByPage(input));
			output.put("page", page);
			output.put("size", size);
			output.put("totalPages", paginator.getTotalPageCount());
		}else {
			input.put("search", search);
			output.put("content", noticeService.listNoticeByPageAndSearch(input));
			output.put("page", page);
			output.put("size", size);
			output.put("totalPages", paginator.getTotalPageCount());
		}
		return output;
	}
	@GetMapping("notice/content/{noticeSeq}")
	public HashMap<String, Object> noticeContent(@PathVariable long noticeSeq){
		HashMap<String, Object> output = new HashMap<String, Object>();
		Notice noticeContent = noticeService.getNoticeContentS(noticeSeq);
		output.put("memberName", noticeContent.getMember().getMemberName());
		output.put("noticeSeq", noticeContent.getNoticeSeq());
		output.put("noticeTitle", noticeContent.getNoticeTitle());
		output.put("noticeContent", noticeContent.getNoticeContent());
		output.put("noticeRdate", noticeContent.getNoticeRdate());
		return output;
	}
}
