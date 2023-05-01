import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./securityCss/ChangePwd.css"
import Ip from "../Ip";

export default function ChangePwd() {

	const pwdRef = useRef(null);
	const pwdCheckRef = useRef(null);
	const { state } = useLocation();
	const [pwdInCheck, setPwdInCheck] = useState("");
	const navi = useNavigate();


	function pwdCheck(e) {
		e.preventDefault();
		const oriPwd = pwdRef.current.value;
		const dupliPwd = pwdCheckRef.current.value;
		let pwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (oriPwd.length == 0 || dupliPwd.length == 0) {
			setPwdInCheck("");
		} else {
			if (!pwdReg.test(oriPwd)) {
				setPwdInCheck("영문, 숫자, 특수기호 조합으로 8-20자리로 입력해주세요");
			} else {
				if (oriPwd === dupliPwd) {
					setPwdInCheck("비밀번호가 일치합니다");
				} else {
					setPwdInCheck("비밀번호가 다릅니다");
				}
			}
		}
	}

	function changePwdInfo(e) {
		e.preventDefault();
		const changePwdPwd = pwdRef.current.value;
		const changePwdEmail = state;
		if (pwdInCheck == "비밀번호가 일치합니다") {
			fetch(`${Ip.url}/user/changePwd`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token"),
				},
				body: JSON.stringify({ changePwdEmail, changePwdPwd }),
			})
				.then(res => res.text())
				.then(res => {
					alert(res);
					navi(`/`);
				})
		} else {
			alert("비밀번호가 옳지 않습니다.");
		}
	}

	return (
		<div className="changePwd">
			<h3>비밀번호변경</h3>
			<form onSubmit={changePwdInfo}>
				<div className="joinInput">
					비밀번호 : <input type="password" onKeyUp={pwdCheck} ref={pwdRef} placeholder="8-20 영문,숫자,특수기호" />
				</div>
				<div className="joinInput">
					비밀번호확인 : <input type="password" onKeyUp={pwdCheck} ref={pwdCheckRef} />
					<br />
					<span>{pwdInCheck}</span>
				</div>
				<button>변경</button>
			</form>
		</div>
	)
}