package toolguys.library.library.service.user.hoya;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.domain.Message;
import toolguys.library.library.repository.user.hoya.UserMessageRepository;

@Service
@RequiredArgsConstructor
public class UserMessageService implements UserMessageServiceInterface{

  public final UserMessageRepository userMessageRepository;

  @Override
	public Page<Message> messageByMessage(Pageable pageable) {
		return userMessageRepository.findAll(pageable);
	}

  @Transactional
	public String deleteMessage(long messageSeq) {
		userMessageRepository.deleteById(messageSeq);
		return "ok";
	}

  @Transactional(readOnly = true)
	public Message messageDetail(Long messageSeq) {
		return userMessageRepository.findById(messageSeq).orElseThrow(() -> new IllegalStateException("없는 쪽지 입니다."));
	}
}