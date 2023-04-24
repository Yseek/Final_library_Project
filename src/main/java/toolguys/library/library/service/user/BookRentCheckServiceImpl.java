package toolguys.library.library.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import toolguys.library.library.dto.user.BookRentCheckDTO;
import toolguys.library.library.repository.user.BookRentRepository;

@Service
public class BookRentCheckServiceImpl implements BookRentCheckService {
    
     @Autowired
     BookRentRepository bookRentRepository;
    

    @Override
    public Page<BookRentCheckDTO> bookrentcheck(String memberemail, Pageable pageable) {
        // Member member=djMemberRepository.findByMemberEmail(memberemail);
        // List<RentCard> rentCard=djRentCardRepository.findByMemberSeq(member);
        // List<BookRent> bookRent=bookRentRepository.findByRentCard(rentCard);
        return bookRentRepository.findByEmail(memberemail, pageable);
    }
}
