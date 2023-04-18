package toolguys.library.library.repository.user.hoya;

import org.springframework.data.jpa.repository.JpaRepository;
import toolguys.library.library.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
}
