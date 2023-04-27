package toolguys.library.library.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import toolguys.library.library.domain.Book;
import toolguys.library.library.domain.BookLost;
import toolguys.library.library.domain.Member;
import toolguys.library.library.repository.user.UserBookLostRepository;
import toolguys.library.library.repository.user.UserBookRentRepository;
import toolguys.library.library.repository.user.UserBookRepository;
import toolguys.library.library.repository.user.UserMemberRepository;

@Service
public class UserBookLostServiceImpl implements UserBookLostService{

    @Autowired
    UserBookLostRepository userBookLostRepository;

    @Autowired
    UserMemberRepository userMemberRepository;

    @Autowired
    UserBookRepository userBookRepository;

    @Autowired
    UserBookRentRepository userBookRentRepository;

    @Transactional
    @Override
    public void reportBookLost(long bookSeq, long memberSeq) {
        Book book = userBookRepository.findById(bookSeq).get();
        Member member = userMemberRepository.findById(memberSeq).get();
        
        // 책상태를 분실신고중으로 변경
        book.setBookStatus((byte)5);
        userBookRepository.save(book);
        
        // 분실신고 테이블에 추가
        BookLost booklost = new BookLost();
        booklost.setBook(book);
        booklost.setMember(member);
        userBookLostRepository.save(booklost);
    }
    
}
