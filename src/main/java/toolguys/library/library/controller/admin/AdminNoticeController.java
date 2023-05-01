package toolguys.library.library.controller.admin;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.domain.dongwon.Paginator;
import toolguys.library.library.dto.admin.NoticeDTO;
import toolguys.library.library.service.admin.AdminNoticeService;

@RequestMapping("admin")
@RestController
public class AdminNoticeController {

	@Autowired
	AdminNoticeService noticeService;

	@GetMapping("notice")
	public HashMap<String, Object> notice(@RequestParam(value="page" ,defaultValue = "1") int page, int size, String search) {
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
		output.put("totalCount", totalCount);
		output.put("totalPages", paginator.getTotalPageCount());
		}else {
			long totalCountBySearch = noticeService.getTotalCountBySearchS(search);
			Paginator paginatorBySearch = new Paginator(page, size, totalCountBySearch);
			input.put("search", search);
			output.put("content", noticeService.listNoticeByPageAndSearch(input));
			output.put("page", page);
			output.put("size", size);
			output.put("totalCount", totalCountBySearch);
			output.put("totalPages", paginatorBySearch.getTotalPageCount());
		}
		return output;
	}
	@GetMapping("notice/content/{noticeSeq}")
	public HashMap<String, Object> noticeContent(@PathVariable long noticeSeq){
		HashMap<String, Object> output = new HashMap<String, Object>();
		output.put("memberName", noticeService.getNoticeContentS(noticeSeq).getMember().getMemberName());
		output.put("memberSeq", noticeService.getNoticeContentS(noticeSeq).getMember().getMemberSeq());
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
		HashMap<String, Object> input = new HashMap<String, Object>();
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
	public void noticeWrite(@RequestBody NoticeDTO noticeDTO){
		System.out.println("noticeDTO:"+noticeDTO);
		noticeService.insertNoticeS(noticeDTO);
	}
	@PostMapping("noticeAdmin/update.do")
	public void noticeUpdate(@RequestBody Notice notice){
		noticeService.updateNoticeS(notice);
	}
}
