package toolguys.library.library.security.dto;

import lombok.Data;

@Data
public class JoinEmailCheckRequest {
	private String joinEmail;
	private String key;
}
