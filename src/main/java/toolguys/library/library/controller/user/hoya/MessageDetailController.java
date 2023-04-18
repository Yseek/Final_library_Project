package toolguys.library.library.controller.user.hoya;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import toolguys.library.library.service.user.hoya.MessageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class MessageDetailController {

  private final MessageService messageService;

  @GetMapping("messageDetail/{messageSeq}")
  public ResponseEntity<?> findById(@PathVariable Long messageSeq) {
    return new ResponseEntity<>(messageService.messageDetail(messageSeq), HttpStatus.OK);
  }
}