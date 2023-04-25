package toolguys.library.library.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.dto.admin.AdminBookLostDTO;
import toolguys.library.library.service.admin.AdminBookLostServiceYSH;

@RequestMapping("admin")
@RestController
public class AdminBookLostControllerYSH {

    @Autowired
    AdminBookLostServiceYSH adminBookLostServiceYSH;

    @GetMapping("bookLost")
    public ResponseEntity<List<AdminBookLostDTO>> reportList(){
        return ResponseEntity.ok().body(adminBookLostServiceYSH.bookLostAll());
    }
    
    @GetMapping("bookLost/lost/{seq}")
    public void bookLost(@PathVariable long seq){
        adminBookLostServiceYSH.bookLostOne(seq);
    }

    @GetMapping("bookLost/return/{seq}")
    public void bookReturn(@PathVariable long seq){
        adminBookLostServiceYSH.bookReturnOne(seq);
    }
}
