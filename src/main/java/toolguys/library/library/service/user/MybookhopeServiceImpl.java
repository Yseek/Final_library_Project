package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.BookHope;
import toolguys.library.library.mapper.user.MybookhopeMapper;

@Service
public class MybookhopeServiceImpl implements MybookhopeService{
    @Autowired
	MybookhopeMapper mybookhopeMapper;

    @Override
    public List<BookHope> getMybookhopeS(HashMap<String, Object> input){
        return mybookhopeMapper.getMybookhope(input);
    }
    @Override
    public long getTotalCountS(long memberSeq) {
        return mybookhopeMapper.getTotalCount(memberSeq);
    }
}
