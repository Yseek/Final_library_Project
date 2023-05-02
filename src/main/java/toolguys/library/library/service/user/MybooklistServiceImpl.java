package toolguys.library.library.service.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.MyBooks;
import toolguys.library.library.dto.user.MybooksDTO;
import toolguys.library.library.mapper.user.MybooklistMapper;

@Service
public class MybooklistServiceImpl implements MybooklistService{
    @Autowired
	MybooklistMapper mybooklistMapper;

    @Override
    public List<MybooksDTO> getMybooklistS(HashMap<String, Object> input){
        return mybooklistMapper.getMybooklist(input);
    }
    @Override
    public long getTotalCountS(long memberSeq) {
        return mybooklistMapper.getTotalCount(memberSeq);
    }
    @Override
    public void deleteMybookS(MyBooks mybooks) {
        mybooklistMapper.deleteMybook(mybooks);
    }
}
