package toolguys.library.library.security.dto;

import lombok.Data;

@Data
public class FindEmailRequest {
	private String memberPhone;
	private String memberName;
	private int memberBirth;
}
