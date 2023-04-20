import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";

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
		<div className="findPwd">
			<div><h3>비밀번호 찾기</h3></div>
			<form onSubmit={sendMail}>
				<div className="findPwd_Email">
					<label htmlFor="findPwd_Email_id">이메일</label>
					<input id="findPwd_Email_id" type="text" ref={findPwdEmailRef} placeholder="가입시 등록한 이메일을 입력하세요."/>
				</div>
				<div className="findPwd_Name">
					<label htmlFor="findPwd_Name_id">이름</label>
					<input id="findPwd_Name_id" type="text" ref={findPwdNameRef} placeholder="가입시 등록한 이름을 입력하세요."/>
				</div>
				<button>비밀번호찾기</button>
			</form>
		</div>
	)
}