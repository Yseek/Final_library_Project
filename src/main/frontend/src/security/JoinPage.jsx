import { useEffect, useRef, useState } from "react";
import "./securityCss/JoinPage.css"
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

export default function JoinPage() {
	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const nameRef = useRef(null);
	const phoneRef = useRef(null);
	const birthRef = useRef(null);
	const zipRef = useRef(null);
	const addrRef = useRef(null);
	const detailAddrRef = useRef(null);
	const statusRef = useRef(null);
	const adminRef = useRef(null);
	const certiPwdRef = useRef(null);
	const pwdCheckRef = useRef(null);
	const navi = useNavigate();

	const [checkMsg, setCheckMsg] = useState("");
	const [pwdInCheck, setPwdInCheck] = useState("");
	const [modal, setModal] = useState(false);
	const [addressValue, setAddressValue] = useState("");
	const [zipCodeValue, setZipCodeValue] = useState("");
	const [emailCerti, setEmailCerti] = useState(false);
	const [emailDuplicate, setEmailDuplicate] = useState("");
	const [phoneDuplicate, setPhoneDuplicate] = useState("");
	const [submitBtn, setSubmitBtn] = useState(true);

	useEffect(() => {
		if (emailDuplicate == "사용가능한 이메일 입니다" && checkMsg == "인증완료" && pwdInCheck == "비밀번호가 일치합니다" && phoneDuplicate == "사용가능한 휴대폰번호 입니다") {
			setSubmitBtn(false);
		}
	}, [emailDuplicate, checkMsg, pwdInCheck, phoneDuplicate])

	function onSubmit(e) {
		e.preventDefault();
		const memberEmail = emailRef.current.value;
		const memberPwd = pwdRef.current.value;
		const memberName = nameRef.current.value;
		const memberPhone = phoneRef.current.value;
		const memberBirth = birthRef.current.value.replaceAll(`-`, ``);
		const memberAddr = `우편번호: ${zipRef.current.value} 주소: ${addrRef.current.value} ${detailAddrRef.current.value}`;
		const memberStatus = statusRef.current.value;
		const memberAdmin = adminRef.current.value;

		if (memberEmail.length == 0 || memberPwd.length == 0 || memberName.length == 0 || memberPhone.length == 0 || memberBirth.length == 0 || zipRef.current.value.length == 0 || addrRef.current.value.length == 0 || detailAddrRef.current.value.length == 0) {
			alert("모든 값을 입력하세요");
		} else {
			fetch(`http://127.0.0.1:8080/join.do`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ memberEmail, memberPwd, memberName, memberPhone, memberBirth, memberAddr, memberStatus, memberAdmin }),
			})
				.then(res => res.text())
				.then(res => alert(res))
				.then(navi(`/`));
		}

	}

	function sendMail(e) {
		e.preventDefault();
		setEmailCerti(true);
		const joinEmail = emailRef.current.value;
		const joinName = nameRef.current.value;
		fetch(`http://127.0.0.1:8080/mail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ joinName, joinEmail }),
		})
			.then(res => res.text())
			.then(res => alert(res));
	}

	function certi(e) {
		e.preventDefault();
		const key = certiPwdRef.current.value;
		const joinEmail = emailRef.current.value;
		fetch(`http://127.0.0.1:8080/joinMailCheck`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ joinEmail, key }),
		})
			.then(res => res.text())
			.then(res => setCheckMsg(res));
	}

	function duplicateCheck(e) {
		e.preventDefault();
		const checkEmail = emailRef.current.value;
		var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (!reg_email.test(checkEmail)) {
			alert("올바른 이메일형식이 아닙니다");
			return false;
		}
		else {
			fetch(`http://127.0.0.1:8080/mailDupliceteCheck`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ checkEmail }),
			})
				.then(res => res.text())
				.then(res => {
					setEmailDuplicate(res);
					alert(res);
				});
		}
	}

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

	function phoneCheck(e) {
		e.preventDefault();
		const checkPhone = phoneRef.current.value;
		let phoneReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
		if (phoneReg.test(checkPhone)) {
			fetch(`http://127.0.0.1:8080/phoneDuplicateCheck`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ checkPhone }),
			})
				.then(res => res.text())
				.then(res => {
					setPhoneDuplicate(res);
					alert(res)
				});
		}else{
			alert("올바른 형태가 아닙니다");
		}
	}

	const postCodeStyle = {
		width: '400px',
		height: '400px',
		display: modal ? `block` : `none`,
	};

	const emailCertidis = {
		display: emailCerti ? `block` : `none`,
	};

	const onCompletePost = data => {
		setAddressValue(data.address);
		setZipCodeValue(data.zonecode);
		setModal(false);
	}

	function findPost(e) {
		e.preventDefault();
		setModal(true);
	}

	return (
		<div className="joinPage">
			<div><h3>회원가입</h3></div>
			<form onSubmit={onSubmit}>
				<div className="joinInput">
					이메일 : <input type="text" ref={emailRef} placeholder="ex@example.com" />
					<button type="button" onClick={duplicateCheck}>중복체크</button>
				</div>
				<div className="joinInput">
					이름 : <input type="text" ref={nameRef} placeholder="성명" />
				</div>
				<button type="button" onClick={sendMail}>이메일 인증</button>
				<div style={emailCertidis}>
					인증번호 확인 : <input type="text" onKeyUp={certi} ref={certiPwdRef} />
					<br />
					<span>{checkMsg.length != 0 ? checkMsg : "인증번호를 입력해주세요"}</span>
				</div>
				<div className="certiCheckBox">
				</div>
				<div className="joinInput">
					비밀번호 : <input type="password" onKeyUp={pwdCheck} ref={pwdRef} placeholder="8-20 영문,숫자,특수기호" />
				</div>
				<div className="joinInput">
					비밀번호확인 : <input type="password" onKeyUp={pwdCheck} ref={pwdCheckRef} />
					<br />
					<span>{pwdInCheck}</span>
				</div>
				<div className="joinInput">
					휴대폰 : <input type="text" ref={phoneRef} placeholder="010-0000-0000" />
					<button type="button" onClick={phoneCheck}>중복체크</button>
				</div>
				<div className="joinInput">
					생년월일 : <input type="date" min="1920-01-01" max="2023-01-01" ref={birthRef} />
				</div>
				<div className="joinInput">
					우편번호 : <input type="text" value={zipCodeValue} ref={zipRef} />
					<br />
					주소 : <input type="text" value={addressValue} ref={addrRef} />
					상세주소 : <input type="text" ref={detailAddrRef} />
					<button type="button" onClick={findPost}>주소찾기</button>
				</div>
				<div className="postApi">
					<DaumPostcode style={postCodeStyle} onComplete={onCompletePost} autoClose={false}>
					</DaumPostcode>
				</div>
				<input type="hidden" name="" ref={statusRef} value={1} />
				<input type="hidden" name="" ref={adminRef} value={1} />
				<button disabled={submitBtn}>{!submitBtn ? "가입" : "정보입력필요"}</button>
			</form>
		</div>
	)
}