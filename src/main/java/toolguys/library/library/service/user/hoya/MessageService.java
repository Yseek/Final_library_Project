package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.Message;
import toolguys.library.library.repository.user.hoya.MessageRepository;

@Service
@RequiredArgsConstructor
public class MessageService implements MessageServiceInterface{

  public final MessageRepository messageRepository;

  @Override
	public Page<Message> messageByMessage(Pageable pageable) {
		return messageRepository.findAll(pageable);
	}

  @Transactional
	public String deleteMessage(long messageSeq) {
		messageRepository.deleteById(messageSeq);
		return "ok";
	}
}