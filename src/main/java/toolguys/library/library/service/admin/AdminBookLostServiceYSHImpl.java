package toolguys.library.library.service.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import toolguys.library.library.dto.admin.AdminBookLostDTO;
import toolguys.library.library.mapper.admin.AdminBookLostMapperYSH;

@Service
public class AdminBookLostServiceYSHImpl implements AdminBookLostServiceYSH{

    @Autowired
    AdminBookLostMapperYSH adminBookLostMapperYSH;

    @Override
    public List<AdminBookLostDTO> bookLostAll(){
        return adminBookLostMapperYSH.selectAll();
    }
}