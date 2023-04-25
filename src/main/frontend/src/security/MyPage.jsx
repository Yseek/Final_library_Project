import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Ip from "../Ip";
import "./securityCss/MyPage.css"

export default function MyPage() {
	const navi = useNavigate();
	const { pathname } = useLocation();
	const [info, setInfo] = useState({});

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		} else {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
			})
				.then(res => res.json())
				.then(res => setInfo(res))
		}
	}, []);

	function toChangPwd(e) {
		e.preventDefault();
		navi(`/myPage/changePwd`, { state: info.memberEmail })
	}

	return (
		<div className="MyPage">
			<div className="userInfo">
				<div>
					이름 : {info.memberName}
				</div>
				<div>
					이메일 : {info.memberEmail}
				</div>
				<div>
					연락처 : {info.memberPhone}
				</div>
				<div>
					{info.memberAddr}
				</div>
				<div>
					생년월일 : {info.memberBirth}
				</div>
			</div>
			<div className="myPageInnerLink">
				<a href="#" onClick={toChangPwd}>비밀번호 변경</a>
				<p><Link to={`/mypage/mybook`}>내서재</Link></p>
				<p><Link to={`/mypage/mybookhope`}>희망도서신청상태확인</Link></p>
				<p><Link to={`/mypage/mybookrent`}>대여목록</Link></p>
			</div>
		</div>
	)
}