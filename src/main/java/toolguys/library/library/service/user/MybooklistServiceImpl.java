package toolguys.library.library.service.user;

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
    public List<Book> getMybooklistS(long memberSeq){
        return mybooklistMapper.getMybooklist(memberSeq);
    }
}
