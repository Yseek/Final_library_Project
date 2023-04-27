package toolguys.library.library.service.user;

public interface UserBookLostService {
    void reportBookLost(long bookSeq, long memberSeq);
}
