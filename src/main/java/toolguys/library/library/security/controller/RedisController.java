package toolguys.library.library.security.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import toolguys.library.library.security.dto.RedisGetValueDTO;
import toolguys.library.library.security.dto.RedisSetSetsDTO;
import toolguys.library.library.security.dto.RedisSetValueDTO;
import toolguys.library.library.security.service.RedisService;

@RestController
public class RedisController {

	@Autowired
	RedisService redisService;

	@RequestMapping("setValue")
	public ResponseEntity<String> setValue(@RequestBody RedisSetValueDTO dto) {
		redisService.setValues(dto.getTestKey(), dto.getTestValue());
		return ResponseEntity.ok().body(dto.getTestKey() + "와" + dto.getTestValue() + "가 잘 들어갔습니다");
	}

	@RequestMapping("getValue")
	public ResponseEntity<String> getValue(@RequestBody RedisGetValueDTO dto) {
		return ResponseEntity.ok().body(redisService.getValues(dto.getTestKey()));
	}

	@RequestMapping("setSets")
	public ResponseEntity<String> setSets(@RequestBody RedisSetSetsDTO dto) {
		redisService.setSets(dto.getTestKey(), dto.getTestValues1(), dto.getTestValues2());
		return ResponseEntity.ok()
				.body(dto.getTestKey() + "와" + dto.getTestValues1() + "," + dto.getTestValues2() + "가 잘 들어갔습니다.");
	}

	@RequestMapping(value = "getSets", method = RequestMethod.POST)
	public ResponseEntity<Set<String>> getSets(@RequestBody RedisGetValueDTO dto){
		return ResponseEntity.ok().body(redisService.getSets(dto.getTestKey()));
	}

	@RequestMapping("deleteValue")
	public ResponseEntity<String> deleteValue(@RequestBody RedisGetValueDTO dto){
		redisService.deleteValues(dto.getTestKey());
		return ResponseEntity.ok().body("삭제완료");
	}
}
