package toolguys.library.library.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.MemberProfileDTO;
import toolguys.library.library.service.admin.ProfileServiceInterface;

@RestController
public class ProfileController {
    @Autowired
    ProfileServiceInterface profileServiceInterface;

    @GetMapping("read/{seq}")
    public Member read(@PathVariable long seq){
        Member member = profileServiceInterface.getBySeqS(seq);
        System.out.println("멤버 : "+member);
        return member;
    }

    @PostMapping("update")
    public void update(MemberProfileDTO memberProfileDTO){
        profileServiceInterface.updateProfile(memberProfileDTO);
    }
}