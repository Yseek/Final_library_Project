package toolguys.library.library.mapper.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import toolguys.library.library.dto.admin.AdminBookLostDTO;

@Mapper
@Repository
public interface AdminBookLostMapperYSH {
    List<AdminBookLostDTO> selectAll();
}
