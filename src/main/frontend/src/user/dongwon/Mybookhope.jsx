import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "./css/Notice.css";

export default function Mybookhope() {
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
		fetch(`http://127.0.0.1:8080/user/mybookhope?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [info, params]);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/mybookhope?memberSeq=${info.memberSeq}&page=${params.page}&size=5`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(page => setPage(page))
	}, [info, params]);

	const bookHopeStat = {
		1: "신청중",
		2: "입고완료",
		3: "취소됨",
		4: "거부됨"
	}

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className="Notice">
			<div><h2>나의 희망도서</h2></div>
			<p id="mypageItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="mypageTable">
				<thead className="noticeTableHead">
					<tr>
						<th>책 제목</th>
						<th>저자</th>
						<th>출판사</th>
						<th>신청일</th>
						<th>신청상태</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookHopeSeq}>
							<td width="25%">{res.bookHopeTitle}</td>
							<td>{res.bookHopeWriter}</td>
							<td>{res.bookHopePub}</td>
							<td>{res.bookHopeWantDay}</td>
							<td>{bookHopeStat[res.bookHopeStatus]}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/mypage/mybookhope/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
		</div>
	);
}