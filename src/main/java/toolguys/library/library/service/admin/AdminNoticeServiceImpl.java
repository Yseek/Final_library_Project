package toolguys.library.library.service.admin;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Notice;
import toolguys.library.library.dto.admin.NoticeDTO;
import toolguys.library.library.mapper.admin.AdminNoticeMapper;

@Service
public class AdminNoticeServiceImpl implements AdminNoticeService {

    @Autowired
	AdminNoticeMapper noticeMapper;

	@Override
	public List<Notice> listNotice() {
		return noticeMapper.getNoticeList();
	}
    @Override
    public long getTotalCountS() {
        return noticeMapper.getTotalCount();
    }
    @Override
    public List<Notice> listNoticeByPage(HashMap<String, Object> input) {
        return noticeMapper.getNoticeListByPage(input);
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
    public void insertNoticeS(NoticeDTO noticeDTO) {
        noticeMapper.insertNotice(noticeDTO);
    }
    @Override
    public void updateNoticeS(Notice notice) {
        noticeMapper.updateNotice(notice);
    }
    @Override
    public long getTotalCountBySearchS(String search) {
        return noticeMapper.getTotalCountBySearch(search);
    }
    @Override
    public List<Notice> listNoticeByPageAndSearch(HashMap<String, Object> input) {
        return noticeMapper.getNoticeListByPageAndSearch(input);
    }
}
