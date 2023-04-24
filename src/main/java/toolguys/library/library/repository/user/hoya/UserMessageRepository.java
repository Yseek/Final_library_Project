package toolguys.library.library.repository.user.hoya;

import org.springframework.data.jpa.repository.JpaRepository;
import toolguys.library.library.domain.Message;

public interface UserMessageRepository extends JpaRepository<Message, Long>{
}
