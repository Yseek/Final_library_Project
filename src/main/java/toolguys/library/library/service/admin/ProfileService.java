package toolguys.library.library.service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.domain.Member;
import toolguys.library.library.dto.admin.MemberProfileDTO;
import toolguys.library.library.repository.admin.ProfileRepository;

@Service
public class ProfileService implements ProfileServiceInterface {
    @Autowired
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }

    @Override
    public Member getBySeqS(long seq){
        Member member = profileRepository.findById(seq).get();
        return member;
    }

    @Override
    public void updateProfile(MemberProfileDTO memberProfileDTO){
        Member member = profileRepository.findById(memberProfileDTO.getMemberSeq()).get();
        member.setMemberPhone(memberProfileDTO.getMemberPhone());
        member.setMemberAddr(memberProfileDTO.getMemberAddr());        
        profileRepository.save(member);
        System.out.println("memberProfileDTO2"+memberProfileDTO);
    }
}
