package toolguys.library.library.security.dto;

import lombok.Data;

@Data
public class FindPwdRequest {
	private String findPwdEmail;
	private String findPwdName;
}
