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
	
	// 한 화면에 보여줄 페이지 수 계산
	var pageWidth = 10;
	var pageWidthNumber = Math.floor((page.page - 1) / pageWidth); // 현재 페이지목록 index
	var startPage = 1 + pageWidthNumber * pageWidth;
	var endPage = pageWidthNumber * pageWidth + pageWidth;
	if (endPage > page.totalPages) endPage = page.totalPages;
	
    const pageList = Array.from({ length: (endPage - startPage + 1) }, (_, index) => startPage + index);

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
						<th className="noticeTableTh">내용 보기</th>
						<th className="noticeTableTh">내서재에서 제거</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.myBooksSeq}>
							<td className="noticeTableTd">{res.book.bookTitle}</td>
							<td className="noticeTableTd"><img src={res.book.bookImgPath} width={`100px`} height={`140px`} /></td>
							<td className="noticeTableTd">{res.book.bookWriter}</td>
							<td className="noticeTableTd">{res.book.bookPub}</td>
							<td className="noticeTableTd"><a onClick={() => bookDetail(res.book.bookTitle, res.book.bookWriter, res.book.bookPub)}>보기</a></td>
							<td className="noticeTableTd"><button className="noticeLostBtn" onClick={() => deleteFromMybook(res.myBooksSeq)}>제거</button></td>
						</tr>
					))}
				</tbody>
			</table>
			{pageList.length === 0 && <span>검색 결과가 없습니다</span>}
			{pageList.length !== 0 && <div className="paging">
				<span><Link to={`/mypage/mybook/1`} className="btn-paging first">&laquo;</Link></span>&nbsp;
				<span><Link to={`/mypage/mybook/${Math.max(1, page.page - pageWidth)}`} className="btn-paging prev">&lt;</Link></span>&nbsp;
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/mypage/mybook/${res}`}>
							{page.page === res ? <span className="tp">{res}</span> : res}
						</Link>
						{" "}
					</span>
				))}
				<span><Link to={`/mypage/mybook/${Math.min(page.totalPages, page.page + pageWidth)}`} className="btn-paging next">&gt;</Link></span>&nbsp;&nbsp;
				<span><Link to={`/mypage/mybook/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
			</div>}<br />
		</div >
	);
}