package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.Notice;

@Mapper
public interface NoticeMapper {
	List<Notice> getNoticeList();
    long getTotalCount();
    List<Notice> getNoticeListByPage(HashMap<String, Integer> input);
    Notice getNoticeContent(long noticeSeq);
    void deleteNotice(long noticeSeq);
    void insertNotice(Notice notice);
    void updateNotice(Notice notice);
}
