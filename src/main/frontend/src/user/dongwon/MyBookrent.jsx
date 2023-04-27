import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "./css/Notice.css";
import moment from 'moment';

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
		if (!localStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		} else {
			fetch(`http://127.0.0.1:8080/memberInfo`, {
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

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/mybookrent?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [info, params]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/mybookrent?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [info, params]);

	const prolong = (bookRentSeq, bookRentDDay, bookRentCoin) => {
		if (bookRentCoin === 1) {
			alert("이미 연장하셨습니다");
		} else {
			fetch(`http://127.0.0.1:8080/user/mybookrent/prolong.do`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({ bookRentSeq, bookRentDDay }),
			}).then(window.location.reload())
		}
	};

	const bookLostBtn = (bookSeq, memberSeq) => {
		console.log(`page: ${JSON.stringify(page)}`);
		console.log(`memberSeq: ${memberSeq}`);
		if (window.confirm("분실신고 하시겠습니까?")) {
			fetch(`http://127.0.0.1:8080/user/mybookrent/reportBookLost`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({ bookSeq, memberSeq }),
			}).then(window.location.reload())
		}
	};

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className="Notice">
			<div><h2>나의 대여목록</h2></div>
			<p id="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
						<th>책 제목</th>
						<th>대여일</th>
						<th>반납예정일</th>
						<th>반납일</th>
						<th>책 상태</th>
						<th>연장횟수</th>
						<th>연장</th>
						<th>분실신고</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookRentSeq}>
							<td width="30%">{res.book.bookTitle}</td>
							<td width="15%">{moment(res.bookRentRdate).format('YYYY-MM-DD')}</td>
							<td width="15%">{moment(res.bookRentDDay).format('YYYY-MM-DD')}</td>
							<td width="15%">{moment(res.bookRentReturn).format('YYYY-MM-DD')}</td>
							<td width="10%">{bookStatusString[res.book.bookStatus]}</td>
							<td>{res.bookRentCoin}</td>
							<td><button id="prolongBtn" disabled={res.book.bookStatus !== 3}
								onClick={() => prolong(res.bookRentSeq, res.bookRentDDay, res.bookRentCoin)}>{res.book.bookStatus !== 3 ? "-" : "연장"}</button></td>
							<td><button id="bookLostBtn" disabled={res.book.bookStatus !== 3}
								onClick={() => bookLostBtn(res.book.bookSeq, info.memberSeq)}>{res.book.bookStatus !== 3 ? "-" : "신고"}</button></td>
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