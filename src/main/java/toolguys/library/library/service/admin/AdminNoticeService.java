package toolguys.library.library.service.admin;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.dto.admin.NoticeDTO;

public interface AdminNoticeService {
	List<Notice> listNotice();
    long getTotalCountS();
    List<Notice> listNoticeByPage(HashMap<String, Integer> input);
    Notice getNoticeContentS(long noticeSeq);
    void deleteNoticeS(long noticeSeq);
    void insertNoticeS(NoticeDTO noticeDTO);
    void updateNoticeS(Notice notice);
}
