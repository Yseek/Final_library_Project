package toolguys.library.library.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberLoginRequest {
	private String memberEmail;
	private String insertPwd;
}
