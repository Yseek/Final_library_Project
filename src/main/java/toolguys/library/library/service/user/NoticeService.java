package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import toolguys.library.library.domain.Notice;

public interface NoticeService {
    long getTotalCountS();
    List<Notice> listNoticeByPage(HashMap<String, Object> input);
    List<Notice> listNoticeByPageAndSearch(HashMap<String, Object> input);
    Notice getNoticeContentS(long noticeSeq);
    void deleteNoticeS(long noticeSeq);
    void insertNoticeS(Notice notice);
    void updateNoticeS(Notice notice);
}
