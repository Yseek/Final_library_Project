package toolguys.library.library.mapper.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.Notice;

@Mapper
public interface NoticeMapper {
    long getTotalCount();
    long getTotalCountBySearch(String search);
    List<Notice> getNoticeListByPage(HashMap<String, Object> input);
    List<Notice> getNoticeListByPageAndSearch(HashMap<String, Object> input);
    Notice getNoticeContent(long noticeSeq);
    void deleteNotice(long noticeSeq);
    void insertNotice(Notice notice);
    void updateNotice(Notice notice);
}
