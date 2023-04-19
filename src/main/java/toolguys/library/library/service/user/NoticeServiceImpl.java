package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.mapper.user.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
	NoticeMapper noticeMapper;

    @Override
    public long getTotalCountS() {
        return noticeMapper.getTotalCount();
    }
    @Override
    public List<Notice> listNoticeByPage(HashMap<String, Object> input) {
        return noticeMapper.getNoticeListByPage(input);
    }
    @Override
    public List<Notice> listNoticeByPageAndSearch(HashMap<String, Object> input) {
        return noticeMapper.getNoticeListByPageAndSearch(input);
    }
    @Override
    public Notice getNoticeContentS(long noticeSeq) {
        return noticeMapper.getNoticeContent(noticeSeq);
    }
    @Override
    public void deleteNoticeS(long noticeSeq) {
        noticeMapper.deleteNotice(noticeSeq);
    }
    @Override
    public void insertNoticeS(Notice notice) {
        noticeMapper.insertNotice(notice);
    }
    @Override
    public void updateNoticeS(Notice notice) {
        noticeMapper.updateNotice(notice);
    }
}
