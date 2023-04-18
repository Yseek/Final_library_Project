package toolguys.library.library.security.utils;

import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MailSenderRunner {

	private final JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String from;

	public void sendEmail(String joinName, String joinEmail, String key) throws Exception {
		MimeMessage m = mailSender.createMimeMessage();
		MimeMessageHelper h = new MimeMessageHelper(m, "UTF-8");
		h.setFrom(from);
		h.setTo(joinEmail);
		h.setSubject(joinName + "님이 요청하신 이메일인증 코드 입니다.");
		h.setText("인증코드는 다음과 같습니다. " + key);
		mailSender.send(m);
	}

	public void sendEmailPwd(String findPwdEmail, String findPwdName, String tempoPwd) throws Exception {
		MimeMessage m = mailSender.createMimeMessage();
		MimeMessageHelper h = new MimeMessageHelper(m, "UTF-8");
		h.setFrom(from);
		h.setTo(findPwdEmail);
		h.setSubject(findPwdName + "님이 요청하신 임시비밀번호 입니다.");
		h.setText("임시비밀번호는 다음과 같습니다. " + tempoPwd);
		mailSender.send(m);
	}

	public String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

			switch (index) {
				case 0:
					key.append((char) ((int) (rnd.nextInt(26)) + 97));
					// a~z (ex. 1+97=98 => (char)98 = 'b')
					break;
				case 1:
					key.append((char) ((int) (rnd.nextInt(26)) + 65));
					// A~Z
					break;
				case 2:
					key.append((rnd.nextInt(10)));
					// 0~9
					break;
			}
		}
		return key.toString();
	}

}
