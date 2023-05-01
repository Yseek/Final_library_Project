import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";
import "./securityCss/FindPwd.css"

export default function FindPwd() {

	const findPwdEmailRef = useRef(null);
	const findPwdNameRef = useRef(null);
	const navi = useNavigate();

	function sendMail(e) {
		e.preventDefault();
		const findPwdEmail = findPwdEmailRef.current.value;
		const findPwdName = findPwdNameRef.current.value;
		fetch(`${Ip.url}/findPwd`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ findPwdEmail, findPwdName }),
		})
			.then(res => res.text())
			.then(res => {
				alert(res);
				if(res.includes("로 발송된 임시비밀번호로 로그인해주세요.")){
					navi(`/loginPage`);
				}
			});
	}

	return (
		<div className="findPwdDiv">
			<h2>비밀번호 찾기</h2>
			<form onSubmit={sendMail}>
				<div className="findPwdInput">
					<span>이메일</span>
					<input className='findPwdEmail' type="text" ref={findPwdEmailRef} placeholder="가입시 등록한 이메일을 입력하세요."/>
				</div>
				<div className="findPwdInput">
					<span>이름</span>
					<input className='findPwdName' type="text" ref={findPwdNameRef} placeholder="가입시 등록한 이름을 입력하세요."/>
				</div>
				<button className='findPwdBtn'>비밀번호찾기</button>
			</form>
		</div>
	)
}