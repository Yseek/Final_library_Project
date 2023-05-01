import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Ip from "../Ip";
import "./securityCss/MyPage.css"

export default function MyPage() {
	const navi = useNavigate();
	const { pathname } = useLocation();
	const [info, setInfo] = useState({});

	useEffect(() => {
		if (!sessionStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		} else {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token"),
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
			<h2>마이페이지</h2>
			<div className="myPageInnerLink">
				<button><a href="#" onClick={toChangPwd}>비밀번호 변경</a></button>
				<button><Link to={`/mypage/mybook/1`}>내서재</Link></button>
				<button><Link to={`/mypage/mybookhope/1`}>희망도서신청상태확인</Link></button>
				<button><Link to={`/user/bookReserv`}>예약내역 확인</Link></button>
				<button><Link to={`/mypage/mybookrent/1`}>대여목록</Link></button>
			</div>
			<hr />
			<table className='myPageTable'>
				<thead>
					<tr>
						<th className='myPageTh'>구분</th>
						<th className='myPageTh'>내정보</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='myPageTd'>이름</td>
						<td className='myPageTd'>{info.memberName}</td>
					</tr>
					<tr>
						<td className='myPageTd'>이메일</td>
						<td className='myPageTd'>{info.memberEmail}</td>
					</tr>
					<tr>
						<td className='myPageTd'>연락처</td>
						<td className='myPageTd'>{info.memberPhone}</td>
					</tr>
					<tr>
						<td className='myPageTd'>주소</td>
						<td className='myPageTd'>{info.memberAddr}</td>
					</tr>
					<tr>
						<td className='myPageTd'>생년월일</td>
						<td className='myPageTd'>{info.memberBirth}</td>
					</tr>
				</tbody>

			</table>
		</div>
	)
}