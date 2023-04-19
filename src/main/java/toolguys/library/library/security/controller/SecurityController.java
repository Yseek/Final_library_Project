package toolguys.library.library.security.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import toolguys.library.library.domain.Member;
import toolguys.library.library.security.dto.ChangePwdRequest;
import toolguys.library.library.security.dto.FindEmailRequest;
import toolguys.library.library.security.dto.FindPwdRequest;
import toolguys.library.library.security.dto.JoinEmailCheckRequest;
import toolguys.library.library.security.dto.MailDupliceteCheckRequst;
import toolguys.library.library.security.dto.MemberLoginRequest;
import toolguys.library.library.security.dto.PhoneDuplicateCheckRequest;
import toolguys.library.library.security.dto.SendEmailRequest;
import toolguys.library.library.security.service.SecurityMemberService;
import toolguys.library.library.security.utils.MailSenderRunner;

@RestController
@Slf4j
public class SecurityController {

	@Autowired
	SecurityMemberService securityMemberService;

	@Autowired
	MailSenderRunner mailSenderRunner;

	private Map<String, String> key = new HashMap<>();

	@PostMapping("/login.do")
	public ResponseEntity<String> login(@RequestBody MemberLoginRequest dto) {
		String msg = securityMemberService.login(dto.getMemberEmail(), dto.getInsertPwd());
		return ResponseEntity.ok().body(msg);
	}

	@PostMapping("/join.do")
	public ResponseEntity<String> join(@RequestBody Member member) {
		log.info("멤버 정보가 들어오는지 " + member.getMemberEmail());
		securityMemberService.join(member);
		return ResponseEntity.ok().body("회원가입 성공");
	}

	@PostMapping("/logout.do")
	public ResponseEntity<Object> logout(Authentication authentication) {
		return ResponseEntity.ok().body(securityMemberService.memberInfo(authentication.getName()));
	}

	@PostMapping("/memberInfo")
	public ResponseEntity<Object> memberInfo(Authentication authentication) {
		return ResponseEntity.ok().body(securityMemberService.memberInfo(authentication.getName()));
	}

	@PostMapping("/findEmail")
	public ResponseEntity<String> findEmail(@RequestBody FindEmailRequest dto) {
		String email = securityMemberService.findEmail(dto.getMemberPhone(), dto.getMemberName(), dto.getMemberBirth());
		return ResponseEntity.ok().body(email);
	}

	@PostMapping("/mail")
	public ResponseEntity<String> sendEmail(@RequestBody SendEmailRequest dto) throws Exception {
		key.put(dto.getJoinEmail(), mailSenderRunner.createKey());
		mailSenderRunner.sendEmail(dto.getJoinName(), dto.getJoinEmail(), key.get(dto.getJoinEmail()));
		return ResponseEntity.ok().body("메일이 잘 갔어요");
	}

	@PostMapping("/joinMailCheck")
	public ResponseEntity<String> joinMailCheck(@RequestBody JoinEmailCheckRequest dto) throws Exception {
		if (key.get(dto.getJoinEmail()).equals(dto.getKey())) {
			return ResponseEntity.ok().body("인증완료");
		} else {
			return ResponseEntity.ok().body("인증실패");
		}
	}

	@PostMapping("/mailDupliceteCheck")
	public ResponseEntity<String> mailDupliceteCheck(@RequestBody MailDupliceteCheckRequst dto) {
		if (securityMemberService.findByMemberEmail(dto.getCheckEmail()).isPresent()) {
			return ResponseEntity.ok().body("존재하는 이메일 입니다");
		}
		return ResponseEntity.ok().body("사용가능한 이메일 입니다");
	}

	@PostMapping("/phoneDuplicateCheck")
	public ResponseEntity<String> phoneDuplicateCheck(@RequestBody PhoneDuplicateCheckRequest dto) {
		if (securityMemberService.findByMemberPhone(dto.getCheckPhone()).isPresent()) {
			return ResponseEntity.ok().body("사용할 수 없는 휴대폰번호 입니다");
		}
		return ResponseEntity.ok().body("사용가능한 휴대폰번호 입니다");
	}

	@PostMapping("/findPwd")
	public ResponseEntity<String> findPwd(@RequestBody FindPwdRequest dto) throws Exception{
		securityMemberService.findPwd(dto.getFindPwdEmail(), dto.getFindPwdName());
		String tempoPwd = mailSenderRunner.createKey();
		securityMemberService.changePwd(dto.getFindPwdEmail(),tempoPwd);
		mailSenderRunner.sendEmailPwd(dto.getFindPwdEmail(), dto.getFindPwdName(), tempoPwd);
		return ResponseEntity.ok().body(dto.getFindPwdEmail()+"로 발송된 임시비밀번호로 로그인해주세요.");
	}

	@PostMapping("/user/changePwd")
	public ResponseEntity<String> changePwd(@RequestBody ChangePwdRequest dto){
		securityMemberService.changePwd(dto.getChangePwdEmail(),dto.getChangePwdPwd());
		return ResponseEntity.ok().body("비밀번호 변경이 완료 되었습니다");
	}

	@GetMapping("/auth")
	public ResponseEntity<String> test(){
		return ResponseEntity.ok().body("권한이 없습니다");
	}
}
