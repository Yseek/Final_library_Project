package toolguys.library.library.security.controller;

import java.util.Set;
import java.util.TreeSet;

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
	static Set<Integer> userSet = new TreeSet<>();

	@MessageMapping("/chat")
	public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
		simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChannelId(), chatDto);
		if(chatDto.getChat().equals("접속을 종료했습니다")){
			userSet.remove(chatDto.getChannelId());
		}else{
			userSet.add(chatDto.getChannelId());
		}
		System.out.println(userSet);
	}

	@MessageMapping("/chat/pub")
	public void sendCheck(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
		simpMessagingTemplate.convertAndSend("/sub/chat/pub", chatDto);
	}
}
