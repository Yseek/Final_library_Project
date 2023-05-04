import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Ip from "../Ip";
import './css/BookReserv.css';
import './css/Paging.css';

export default function BookReserv() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);
	const { bookReserveSeq } = useParams();

	useEffect(() => {
		fetch(`${Ip.url}/user/bookReserv?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(data => { console.log(data); setData(data.content) })
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/user/bookReserv?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(page => { setPage(page) })
	}, [params]);

	function deleteBookReserve(bookReserveSeq) {
		if (window.confirm("취소하시겠습니까?")) {
			fetch(`${Ip.url}/user/bookReserv/${bookReserveSeq}`, {
				method: "DELETE"
			})
				.then(res => {
					if (res.ok) {
						window.location.replace("/user/bookReserv");
					}
				});
		}
	}

	// 한 화면에 보여줄 페이지 수 계산
	var pageWidth = 10;
	var pageWidthNumber = Math.floor(page.number / pageWidth); // 현재 페이지목록 index
	var startPage = 1 + pageWidthNumber * pageWidth;
	var endPage = pageWidthNumber * pageWidth + pageWidth;
	if (endPage > page.totalPages) endPage = page.totalPages;

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className='BookReservDiv'>
			<h2>예약내역 확인</h2>
			<table className='BookReservTable'>
				<thead>
					<tr>
						<th className='BookReservTh'>제목</th>
						<th className='BookReservTh'>저자</th>
						<th className='BookReservTh'>출판사</th>
						<th className='BookReservThC'>예약취소</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookReserveSeq}>
							<td className='BookReservTd'>{res.book.bookTitle}</td>
							<td className='BookReservTd'>{res.book.bookWriter}</td>
							<td className='BookReservTd'>{res.book.bookPub}</td>
							<td className='BookReservTd'><button className='BookReservBtn' onClick={() => deleteBookReserve(bookReserveSeq)}>취소</button></td>
						</tr>
					))}
				</tbody>
			</table>
			{pageList.length === 0 && <span>검색 결과가 없습니다</span>}
			{pageList.length !== 0 && <div className="paging">
				<span><Link to={`/user/bookReserv/1`} className="btn-paging first">&laquo;</Link></span>&nbsp;
				<span><Link to={`/user/bookReserv/${Math.max(1, page.number + 1 - pageWidth)}`} className="btn-paging prev">&lt;</Link></span>&nbsp;
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/user/bookReserv/${res}`}>
							{page.number + 1 === res ? <span className="tp">{res}</span> : res}
						</Link>
						{" "}
					</span>
				))}
				<span><Link to={`/user/bookReserv/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`} className="btn-paging next">&gt;</Link></span>&nbsp;&nbsp;
				<span><Link to={`/user/bookReserv/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
			</div>}<br />
		</div>
	);
}