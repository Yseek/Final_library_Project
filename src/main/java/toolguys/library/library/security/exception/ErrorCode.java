package toolguys.library.library.security.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
	USERNAME_DUPLICATED(HttpStatus.CONFLICT, ""),
	USERNAME_NOT_FOUND(HttpStatus.NOT_FOUND, ""),
	INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, ""),
	INVALID_TOKEN(HttpStatus.INTERNAL_SERVER_ERROR,"");

	private HttpStatus httpStatus;
	private String message;
}
