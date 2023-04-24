package toolguys.library.library.security.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.security.dto.ChatDto;

@Controller
@RequiredArgsConstructor
public class ChatController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	static Map<Integer,Object> userSet = new HashMap<>();

	@MessageMapping("/chat")
	public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
		simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
		if(chatDto.getChat().equals("접속을 종료했습니다")){
			userSet.remove(chatDto.getChannelId());
		}else{
			userSet.put(chatDto.getChannelId(),chatDto);
		}
	}

	@MessageMapping("/chat/pub")
	public void sendCheck(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
		simpMessagingTemplate.convertAndSend("/sub/chat/pub", chatDto);
	}
}
