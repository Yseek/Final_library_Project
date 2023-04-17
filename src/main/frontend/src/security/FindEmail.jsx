import { useRef } from "react";

export default function FindEmail() {

	const findEmailPhoneRef = useRef(null);
	const findEmailNameRef = useRef(null);
	const findEmailBirthRef = useRef(null);

	function onSubmit(e) {
		e.preventDefault();
		const memberPhone = findEmailPhoneRef.current.value;
		const memberName = findEmailNameRef.current.value;
		const memberBirth = findEmailBirthRef.current.value;

		fetch(`http://127.0.0.1:8080/findEmail`, {
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
		<div className="findEmail">
			<div><h3>이메일찾기</h3></div>
			<form onSubmit={onSubmit}>
				<div className="findEmail__phone">
					<label htmlFor="findEmail__phone_id">연락처</label>
					<input id="findEmail__phone_id" type="text" placeholder="ex) 010-1234-5678" ref={findEmailPhoneRef} />
				</div>
				<div className="findEmail__name">
					<label htmlFor="findEmail__name_id">성명</label>
					<input id="findEmail__name_id" type="text" ref={findEmailNameRef} />
				</div>
				<div className="findEmail__birth">
					<label htmlFor="findEmail__birth_id">생년월일</label>
					<input id="findEmail__birth_id" type="text" placeholder="ex) 20001010" ref={findEmailBirthRef} />
				</div>
				<button>이메일찾기</button>
			</form>
		</div>
	)
}