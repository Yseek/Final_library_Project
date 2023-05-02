import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./securityCss/LoginPage.css"
import Ip from "../Ip";

export default function LoginPage() {

	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const navi = useNavigate();
	const { state } = useLocation();

	function onSubmit(e) {
		e.preventDefault();
		const memberEmail = emailRef.current.value;
		const insertPwd = pwdRef.current.value;
		fetch(`${Ip.url}/login.do`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ memberEmail, insertPwd }),
		})
			.then(res => res.text())
			.then(res => {
				if(res.startsWith("USERNAME_NOT_FOUND")|| res.startsWith("INVALID_PASSWORD")){
					alert(res);
					return false;
				}
				sessionStorage.setItem("token", res);
				if (state) {
					navi(state, { state: emailRef });
				} else {
					navi('/', { state: emailRef });
				}
			});
	}

	return (
		<div className="loginPageDiv">
			<div><h3>로그인</h3></div>
			<form onSubmit={onSubmit}>
				<div className="loginInput">
					<span>아이디</span>
					<input className='loginInputId' type="text" placeholder="email입력" ref={emailRef} />
				</div>
				<div className="loginInput">
					<span>비밀번호</span>
					<input className='loginInputPwd' type="password" placeholder="비밀번호입력" ref={pwdRef} />
				</div>
				<button className='loginPageBtn' >로그인</button>
			</form>
			<div>
				<Link to={`/findEmail`} className="loginBottomButton">이메일찾기</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				<Link to={`/findPwd`} className="loginBottomButton">비밀번호찾기</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
				<Link to={`/joinPage`} className="loginBottomButton">회원가입</Link>
			</div>

		</div>
	)
}