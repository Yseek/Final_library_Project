import { useEffect, useState } from "react";
import './css/AdminBookHope.css';
import Ip from "../Ip";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminBookHope() {
	const params = useParams();

	const [param, setParam] = useState(useParams()); // 삭제 새로고침용 
	const [page, setPage] = useState([]);
	const history = useNavigate();

	useEffect(() => {  // 페이지 이동용 
		setParam({ params })
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/admin/bookHope?page=${params.page}&size=10`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [param]);
	console.log(JSON.stringify(page))

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	function deny(bookHopeSeq) {
		if (window.confirm("거부하시겠습니까?")) {
			fetch(`${Ip.url}/admin/bookHope/deny/${bookHopeSeq}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + sessionStorage.getItem("token"),
				},
			})
				.then(res => {
					if (res.ok) {
						alert("거부완료");
						setParam({ param });
					}
				});
		}
	}

	return (
		<div className="AdminBookHope">
			<h2>희망 책 신청 승인페이지</h2>
			<table className="AdminBookHopeTable">
				<thead>
					<tr>
						<th className="AdminBookHopeTableTh">책제목</th>
						<th className="AdminBookHopeTableTh">저자</th>
						<th className="AdminBookHopeTableTh">출판사</th>
						<th className="AdminBookHopeTableTh">신청날짜</th>
						<th className="AdminBookHopeTableTh">신청상태</th>
						<th className="AdminBookHopeTableTh">신청자</th>
						<th className="AdminBookHopeTableTh">승인</th>
						<th className="AdminBookHopeTableTh">거절</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(page.content) && page.content.map(res => (
						<tr key={res.bookHopeSeq}>
							<td className="AdminBookHopeTableTd">{res.bookHopeTitle}</td>
							<td className="AdminBookHopeTableTd">{res.bookHopeWriter}</td>
							<td className="AdminBookHopeTableTd">{res.bookHopePub}</td>
							<td className="AdminBookHopeTableTd">{res.bookHopeWantDay}</td>
							<td className="AdminBookHopeTableTd">
								{res.bookHopeStatus === 1 && '신청중'}
								{res.bookHopeStatus === 2 && '입고완료'}
								{res.bookHopeStatus === 3 && '취소됨'}
								{res.bookHopeStatus === 4 && '거부됨'}
							</td>
							<td className="AdminBookHopeTableTd">{res.member.memberName}</td>
							<td className="AdminBookHopeTableTd"><button className="bookHopeButton" disabled={res.bookHopeStatus !== 1} onClick={() => history(`/admin/bookHopeOk/${res.bookHopeSeq}`)}>승인</button></td>
							<td className="AdminBookHopeTableTd"><button className="bookHopeButton bookHopeBtCc" disabled={res.bookHopeStatus !== 1} onClick={() => deny(res.bookHopeSeq)}>거부</button></td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				<span><Link to={`/admin/bookhope/1`}>&lt;</Link>&nbsp;</span>
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/admin/bookhope/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
				<span><Link to={`/admin/bookhope/${page.totalPages}`}>&gt;</Link></span>
			</div>
		</div>
	);
}