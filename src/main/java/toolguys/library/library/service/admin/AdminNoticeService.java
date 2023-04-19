package toolguys.library.library.service.admin;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.Notice;

public interface AdminNoticeService {
	List<Notice> listNotice();
    long getTotalCountS();
    List<Notice> listNoticeByPage(HashMap<String, Integer> input);
    Notice getNoticeContentS(long noticeSeq);
    void deleteNoticeS(long noticeSeq);
    void insertNoticeS(Notice notice);
    void updateNoticeS(Notice notice);
}
