package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Book;
import toolguys.library.library.mapper.user.MybooklistMapper;

@Service
public class MybooklistServiceImpl implements MybooklistService{
    @Autowired
	MybooklistMapper mybooklistMapper;

    @Override
    public List<Book> getMybooklistS(HashMap<String, Object> input){
        return mybooklistMapper.getMybooklist(input);
    }
    @Override
    public long getTotalCountS(long memberSeq) {
        return mybooklistMapper.getTotalCount(memberSeq);
    }
}
