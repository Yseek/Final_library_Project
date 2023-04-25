package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.BookRent;
import toolguys.library.library.mapper.user.MybookrentMapper;

@Service
public class MybookrentServiceImpl implements MybookrentService{
    @Autowired
	MybookrentMapper mybookrentMapper;

    @Override
    public List<BookRent> getMybookrentS(HashMap<String, Object> input){
        return mybookrentMapper.getMybookrent(input);
    }
    @Override
    public void prolongMybookrentS(BookRent bookrent){
        mybookrentMapper.prolongMybookrent(bookrent);
    }
    @Override
    public long getTotalCountS(long memberSeq) {
        return mybookrentMapper.getTotalCount(memberSeq);
    }
}
