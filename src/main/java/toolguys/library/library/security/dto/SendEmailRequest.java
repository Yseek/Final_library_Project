package toolguys.library.library.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SendEmailRequest {
	private String joinName;
	private String joinEmail;
}
