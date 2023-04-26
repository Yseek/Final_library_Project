package toolguys.library.library.mapper.admin;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.dto.admin.NoticeDTO;

@Mapper
public interface AdminNoticeMapper {
	List<Notice> getNoticeList();
    long getTotalCount();
    List<Notice> getNoticeListByPage(HashMap<String, Integer> input);
    Notice getNoticeContent(long noticeSeq);
    void deleteNotice(long noticeSeq);
    void insertNotice(NoticeDTO noticeDTO);
    void updateNotice(Notice notice);
}
