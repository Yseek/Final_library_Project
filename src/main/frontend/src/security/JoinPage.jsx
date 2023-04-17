import { useRef } from "react";
import "./securityCss/JoinPage.css"
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const nameRef = useRef(null);
	const phoneRef = useRef(null);
	const birthRef = useRef(null);
	const addrRef = useRef(null);
	const statusRef = useRef(null);
	const adminRef = useRef(null);
	const navi = useNavigate();

	function onSubmit(e) {
		e.preventDefault();
		const memberEmail = emailRef.current.value;
		const memberPwd = pwdRef.current.value;
		const memberName = nameRef.current.value;
		const memberPhone = phoneRef.current.value;
		const memberBirth = birthRef.current.value;
		const memberAddr = addrRef.current.value;
		const memberStatus = statusRef.current.value;
		const memberAdmin = adminRef.current.value;

		console.log(memberStatus);
		fetch(`http://127.0.0.1:8080/join.do`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ memberEmail, memberPwd, memberName, memberPhone, memberBirth, memberAddr, memberStatus, memberAdmin }),
		})
			.then(res => res.text())
			.then(res=> alert(res))
			.then(navi(`/`));
	}

	return (
		<div className="joinPage">
			<div><h3>회원가입</h3></div>
			<form onSubmit={onSubmit}>
				<div className="joinInput">
					이메일 : <input type="text" ref={emailRef} />
				</div>
				<div className="joinInput">
					비밀번호 : <input type="text" ref={pwdRef} />
				</div>
				<div className="joinInput">
					이름 : <input type="text" ref={nameRef} />
				</div>
				<div className="joinInput">
					휴대폰 : <input type="text" ref={phoneRef} />
				</div>
				<div className="joinInput">
					생년월일 : <input type="text" ref={birthRef} />
				</div>
				<div className="joinInput">
					주소 : <input type="text" ref={addrRef} />
				</div>
				<input type="hidden" name="" ref={statusRef} value={1} />
				<input type="hidden" name="" ref={adminRef} value={1} />
				<button>가입</button>
			</form>
		</div>
	)
}