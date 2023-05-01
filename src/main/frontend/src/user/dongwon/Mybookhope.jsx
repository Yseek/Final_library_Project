import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Ip from "../../Ip";
import "./css/Notice.css";

export default function Mybookhope() {
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
		fetch(`${Ip.url}/user/mybookhope?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [info, params]);

	useEffect(()=>{
		fetch(`${Ip.url}/user/mybookhope?memberSeq=${info.memberSeq}&page=${params.page}&size=5`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
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
		<div className="NoticeDiv">
			<div><h2>나의 희망도서</h2></div>
			<p className="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead>
					<tr>
						<th className="noticeTableTh">책 제목</th>
						<th className="noticeTableTh">저자</th>
						<th className="noticeTableTh">출판사</th>
						<th className="noticeTableTh">신청일</th>
						<th className="noticeTableTh">신청상태</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookHopeSeq}>
							<td className="noticeTableTd">{res.bookHopeTitle}</td>
							<td className="noticeTableTd">{res.bookHopeWriter}</td>
							<td className="noticeTableTd">{res.bookHopePub}</td>
							<td className="noticeTableTd">{res.bookHopeWantDay}</td>
							<td className="noticeTableTd">{bookHopeStat[res.bookHopeStatus]}</td>
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