package toolguys.library.library.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import toolguys.library.library.domain.Member;
import toolguys.library.library.security.dto.MemberLoginRequest;
import toolguys.library.library.security.service.SecurityMemberService;

@RestController
@Slf4j
public class SecurityController {

	@Autowired
	SecurityMemberService securityMemberService;
	
	@PostMapping("login.do")
	public ResponseEntity<String> login(@RequestBody MemberLoginRequest dto){
		String msg = securityMemberService.login(dto.getMemberEmail(), dto.getInsertPwd());
		return ResponseEntity.ok().body(msg);
	}

	@PostMapping("join.do")
	public ResponseEntity<String> join(@RequestBody Member member){
		log.info("멤버 정보가 들어오는지 "+member.getMemberEmail());
		securityMemberService.join(member);
		return ResponseEntity.ok().body("회원가입 성공");
	}

	@PostMapping("memberInfo")
	public ResponseEntity<Object> memberInfo(Authentication authentication){
		return ResponseEntity.ok().body(securityMemberService.memberInfo(authentication.getName()));
	}
}
