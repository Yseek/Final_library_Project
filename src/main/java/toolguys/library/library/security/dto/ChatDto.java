package toolguys.library.library.security.dto;

import lombok.Data;

@Data
public class ChatDto {
    private Integer channelId;
    private String writerId;
    private String chat;
}