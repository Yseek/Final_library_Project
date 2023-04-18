package toolguys.library.library.controller.user.hoya;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Message;
import toolguys.library.library.service.user.hoya.MessageServiceInterface;

@RestController
@RequestMapping("user")
public class MessageController {

  @Autowired
	MessageServiceInterface messageServiceInterface;

  @GetMapping("messageCheck")
	public Page<Message> messageCheck(
			@PageableDefault(page = 0, size = 3, sort = "messageSeq", direction = Sort.Direction.DESC) Pageable pageable,
			Model model) {
		return messageServiceInterface.messageByMessage(pageable);
	}
}
