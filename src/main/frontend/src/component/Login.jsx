import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const histroy = useNavigate();

	function onSubmit(e) {
		e.preventDefault();
		const memberEmail = emailRef.current.value;
		const insertPwd = pwdRef.current.value;
		fetch(`http://127.0.0.1:8080/login`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({memberEmail,insertPwd}),
		})
		.then(res=>res.text())
		.then(res=> {
			console.log(res);
			if(res){
				localStorage.setItem("token",res)
			}
			console.log(localStorage.getItem("token"));
			histroy(`/`);
		});
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				이메일 : <input type="text" placeholder="email입력" ref={emailRef} />
				비밀번호 : <input type="password" placeholder="비밀번호입력" ref={pwdRef} />
				<button>로그인</button>
			</form>
		</div>
	);
}