package toolguys.library.library.security.dto;

import lombok.Data;

@Data
public class ChangePwdRequest {
	private String changePwdEmail;
	private String changePwdPwd;
}
