package toolguys.library.library.controller.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.dongwon.Paginator;
import toolguys.library.library.service.user.MybooklistService;

@RequestMapping("user")
@RestController
public class MybookListController {
    
    @Autowired
	MybooklistService mybooklistService;
    
    @GetMapping("mybooklist")
    public HashMap<String, Object> MybookList(long memberSeq, int page, int size){
        long totalCount = mybooklistService.getTotalCountS(memberSeq);
        Paginator paginator = new Paginator(page, size, totalCount);
        HashMap<String, Object> input = new HashMap<String, Object>();
        input.put("memberSeq", memberSeq);
        input.put("offset", (page-1)*size);
		input.put("size", size);
        HashMap<String, Object> output = new HashMap<String, Object>();
        output.put("content", mybooklistService.getMybooklistS(input));
        output.put("page", page);
        output.put("size", size);
        output.put("totalCount", totalCount);
        output.put("totalPages", paginator.getTotalPageCount());
        return output;
    }
}
