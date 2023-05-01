import { useRef } from "react";
import Ip from "../Ip";
import "./securityCss/FindEmail.css"

export default function FindEmail() {

	const findEmailPhoneRef = useRef(null);
	const findEmailNameRef = useRef(null);
	const findEmailBirthRef = useRef(null);

	function onSubmit(e) {
		e.preventDefault();
		const memberPhone = findEmailPhoneRef.current.value;
		const memberName = findEmailNameRef.current.value;
		const memberBirth = findEmailBirthRef.current.value;

		fetch(`${Ip.url}/findEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ memberPhone, memberName, memberBirth }),
		})
			.then(res => res.text())
			.then(res => {
				alert(res);
			});
	}

	return (
		<div className="findEmailDiv">
			<h2>이메일찾기</h2>
			<form onSubmit={onSubmit}>
				<div className="findEmailInput">
					<span>연락처</span>
					<input className='findEmailPhone' type="text" placeholder="ex) 010-1234-5678" ref={findEmailPhoneRef} />
				</div>
				<div className="findEmailInput">
					<span>성명</span>
					<input className='findEmailName' type="text" ref={findEmailNameRef} />
				</div>
				<div className="findEmailInput">
					<span>생년월일</span>
					<input className='findEmailBirth' type="text" placeholder="ex) 20001010" ref={findEmailBirthRef} />
				</div>
				<button className='findEmailBtn'>이메일찾기</button>
			</form>
		</div>
	)
}