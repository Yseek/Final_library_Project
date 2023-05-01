package toolguys.library.library.security.service;

import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String, String> redisTemplate;

	public String getValues(String key) {
		ValueOperations<String, String> values = redisTemplate.opsForValue();
		return values.get(key);
	}

	public void setValues(String key, String value){
		ValueOperations<String, String> values = redisTemplate.opsForValue();
		values.set(key, value);
	}

	public void setSets(String key, String... values){
		redisTemplate.opsForSet().add(key, values);
	}

	public Set<String> getSets(String key){
		return redisTemplate.opsForSet().members(key);
	}

	public void deleteValues(String key){
		redisTemplate.delete(key);
	}
}
