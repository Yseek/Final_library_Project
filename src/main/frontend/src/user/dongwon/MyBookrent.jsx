import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "./css/Notice.css";
import moment from 'moment';
import Ip from "../../Ip";

export default function Mybookrent() {

	const bookStatusString = {
		1: "대출가능",
		2: "예약중",
		3: "대출중",
		4: "분실됨",
		5: "분실신고중"
	}

	const params = useParams();
	const navi = useNavigate();
	const { pathname } = useLocation();
	const [info, setInfo] = useState({});
	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);

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

	useEffect(() => {
		fetch(`${Ip.url}/user/mybookrent?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [info, params]);

	useEffect(() => {
		fetch(`${Ip.url}/user/mybookrent?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [info, params]);

	const prolong = (bookRentSeq, bookRentDDay, bookRentCoin, bookStatus) => {
		if (bookRentCoin === 1) {
			alert("이미 연장하셨습니다");
		} else if (bookStatus !== 3) {
			alert("대출중인 책이 아닙니다");
		} else {
			fetch(`${Ip.url}/user/mybookrent/prolong.do`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token"),
				},
				body: JSON.stringify({ bookRentSeq, bookRentDDay }),
			}).then(window.location.reload())
		}
	};

	const bookLostBtn = (bookSeq, memberSeq, bookStatus) => {
		if (bookStatus !== 3) {
			alert("대출중인 책이 아닙니다");
		} else if (window.confirm("분실신고 하시겠습니까?")) {
			fetch(`${Ip.url}/user/mybookrent/reportBookLost`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token"),
				},
				body: JSON.stringify({ bookSeq, memberSeq }),
			}).then(window.location.reload())
		}
	};

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className="NoticeDiv">
			<h2>나의 대여목록</h2>
			<p className="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead>
					<tr>
						<th className='noticeTableTh'>책 제목</th>
						<th className='noticeTableTh'>대여일</th>
						<th className='noticeTableTh'>반납예정일</th>
						<th className='noticeTableTh'>반납일</th>
						<th className='noticeTableTh'>연장횟수</th>
						<th className='noticeTableTh'>연장하기</th>
						<th className='noticeTableTh'>분실신고</th>

					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookRentSeq}>
							<td className='noticeTableTd'>{res.book.bookTitle}</td>
							<td className='noticeTableTd'>{moment(res.bookRentRdate).format('YYYY-MM-DD')}</td>
							<td className='noticeTableTd'>{moment(res.bookRentDDay).format('YYYY-MM-DD')}</td>
							<td className='noticeTableTd'>{res.bookRentReturn != null ? moment(res.bookRentReturn).format('YYYY-MM-DD') : "반납전"}</td>
							<td className='noticeTableTd'>{res.bookRentCoin}</td>
							<td className='noticeTableTd'><button className='noticeRentBtn' id="prolongBtn"
								onClick={() => prolong(res.bookRentSeq, res.bookRentDDay, res.bookRentCoin, res.book.bookStatus)}>연장</button></td>
							<td className='noticeTableTd'><button className='noticeLostBtn' id="bookLostBtn"
								onClick={() => bookLostBtn(res.book.bookSeq, info.memberSeq, res.book.bookStatus)}>신고</button></td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/mypage/mybookrent/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
		</div>
	);
}