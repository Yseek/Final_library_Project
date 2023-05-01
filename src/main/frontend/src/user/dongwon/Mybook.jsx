import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./css/Notice.css";
import Ip from "../../Ip";

export default function Mybook() {
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
		fetch(`${Ip.url}/user/mybooklist?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [info, params]);

	useEffect(() => {
		fetch(`${Ip.url}/user/mybooklist?memberSeq=${info.memberSeq}&page=${params.page}&size=5`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			}
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [info, params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	const deleteFromMybook = (myBooksSeq) => {
		fetch(`${Ip.url}/user/mybook/delete.do`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
			body: JSON.stringify({ myBooksSeq }),
		}).then(res => res.text())
			.then(res => {
				alert(res);
				window.location.reload();
			})
	};

	function bookDetail(bookTitle, bookWriter, bookPub) {
		const a = [bookTitle, bookWriter, bookPub]
		navi(`/user/bookDetail`, {
			state: a
		});
	}

	return (
		<div className="NoticeDiv">
			<h2>내 서재</h2>
			<p className="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead>
					<tr>
						<th className="noticeTableTh">제목</th>
						<th className="noticeTableTh">표지</th>
						<th className="noticeTableTh">저자</th>
						<th className="noticeTableTh">출판사</th>
						<th className="noticeTableTh">내서재에서 제거</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.myBooksSeq}>
							<a onClick={() => bookDetail(res.book.bookTitle, res.book.bookWriter, res.book.bookPub)}>
								<td className="noticeTableTd">{res.book.bookTitle}</td>
							</a>
							<td className="noticeTableTd"><img src={res.book.bookImgPath} width={`100px`} height={`140px`} /></td>
							<td className="noticeTableTd">{res.book.bookWriter}</td>
							<td className="noticeTableTd">{res.book.bookPub}</td>
							<td className="noticeTableTd"><button className="noticeLostBtn" onClick={() => deleteFromMybook(res.myBooksSeq)}>제거</button></td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/mypage/mybook/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
		</div >
	);
}