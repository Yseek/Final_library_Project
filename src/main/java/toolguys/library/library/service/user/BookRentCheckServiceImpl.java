package toolguys.library.library.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.BookRent;
import toolguys.library.library.domain.Member;
import toolguys.library.library.domain.RentCard;
import toolguys.library.library.repository.user.BookRentCheckRepository;
import toolguys.library.library.repository.user.BookRentRepository;
import toolguys.library.library.repository.user.DjMemberRepository;
import toolguys.library.library.repository.user.DjRentCardRepository;

@Service
public class BookRentCheckServiceImpl implements BookRentCheckService {
    
    @Autowired
    BookRentCheckRepository bookRentCheckRepository;
    @Autowired
    DjMemberRepository djMemberRepository;
    @Autowired
    DjRentCardRepository djRentCardRepository;
    @Autowired
    BookRentRepository bookRentRepository;
    

    @Override
    public Page<BookRent> bookrentmember(String memberemail, Pageable pageable) {
        Member member=djMemberRepository.findByMemberEmail(memberemail);
        List<RentCard> rentCard=djRentCardRepository.findByMemberSeq(member);
        List<BookRent> bookRent=bookRentRepository.findByRentCard(rentCard);
        return bookRentCheckRepository.findAll(pageable);
    }
}
