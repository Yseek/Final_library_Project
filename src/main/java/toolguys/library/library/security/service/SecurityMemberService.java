package toolguys.library.library.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import toolguys.library.library.domain.Member;
import toolguys.library.library.security.exception.AppException;
import toolguys.library.library.security.exception.ErrorCode;
import toolguys.library.library.security.repository.SecurityMemberRepository;
import toolguys.library.library.security.utils.JwtUtil;

public class SecurityMemberService {

	private final SecurityMemberRepository securityMemberRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	@Value("${jwt.secret}")
	private String secretKey;

	private Long expiredMs = 10000 * 60 * 60L;

	public SecurityMemberService(SecurityMemberRepository securityMemberRepository,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.securityMemberRepository = securityMemberRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public String login(String memberEmail, String insertPwd) {
		Member member = securityMemberRepository.findByMemberEmail(memberEmail)
				.orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_FOUND, memberEmail + "이 없습니다."));
		if (!bCryptPasswordEncoder.matches(insertPwd, member.getMemberPwd())) {
			throw new AppException(ErrorCode.INVALID_PASSWORD, "패스워드를 잘못 입력했습니다");
		}
		return JwtUtil.createJwt(memberEmail, secretKey, expiredMs);
	}

	public void join(Member member) {
		securityMemberRepository.findByMemberEmail(member.getMemberEmail()).ifPresent(res -> {
			throw new AppException(ErrorCode.USERNAME_DUPLICATED, member.getMemberEmail() + "는 이미 있습니다.");
		});
		member.setMemberPwd(bCryptPasswordEncoder.encode(member.getMemberPwd()));
		securityMemberRepository.save(member);
	}

	public Member memberInfo(String memberEmail) {
		return securityMemberRepository.findByMemberEmail(memberEmail).get();
	}

	public String findEmail(String memberPhone, String memberName, int memberBirth) {
		Member member = securityMemberRepository
				.findByMemberPhoneAndMemberNameAndMemberBirth(memberPhone, memberName, memberBirth)
				.orElseThrow(() -> new AppException(ErrorCode.NO_USER, "유저 정보가 존재하지 않습니다."));
		return member.getMemberEmail();
	}

	public Optional<Member> findByMemberEmail(String memberEmail) {
		return securityMemberRepository.findByMemberEmail(memberEmail);
	}

	public Optional<Member> findByMemberPhone(String memberPhone) {
		return securityMemberRepository.findByMemberPhone(memberPhone);
	}

	public void findPwd(String findPwdEmail, String findPwdName) {
		Member member = securityMemberRepository.findByMemberEmail(findPwdEmail)
				.orElseThrow(() -> new AppException(ErrorCode.NO_USER, "유저 정보가 존재하지 않습니다"));
		if (!member.getMemberName().equals(findPwdName)) {
			throw new AppException(ErrorCode.NO_USER, "유저 정보가 존재하지 않습니다");
		}
	}

	public void changePwd(String findPwdEmail, String tempoPwd) {
		System.out.println(tempoPwd + findPwdEmail);
		Member member = securityMemberRepository.findByMemberEmail(findPwdEmail).get();
		member.setMemberPwd(bCryptPasswordEncoder.encode(tempoPwd));
		securityMemberRepository.save(member);
	}
}
