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
				localStorage.setItem("token", res);
				if (state) {
					navi(state, { state: emailRef });
				} else {
					navi('/', { state: emailRef });
				}
			});
	}

	return (
		<div className="loginPage">
			<div><h3>로그인</h3></div>
			<form onSubmit={onSubmit}>
				<div className="loginInput">
					<label htmlFor="id">아이디</label>
					<input id="id" type="text" placeholder="email입력" ref={emailRef} />
				</div>
				<div className="loginInput">
					<label htmlFor="pwd">비밀번호</label>
					<input id="text" type="password" placeholder="비밀번호입력" ref={pwdRef} />
				</div>
				<button>로그인</button>
			</form>
			<div>
				<Link to={`/findEmail`} className="loginBottomButton">이메일찾기</Link>
				<Link to={`/findPwd`} className="loginBottomButton">비밀번호찾기</Link>
				<Link to={`/joinPage`} className="loginBottomButton">회원가입</Link>
			</div>

		</div>
	)
}