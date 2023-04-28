import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Ip from "../Ip";
import './css/BookReserv.css';

export default function BookReserv() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);
	const { bookReserveSeq } = useParams();

	useEffect(() => {
		fetch(`${Ip.url}/user/bookReserv?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(data => { console.log(data); setData(data.content) })
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/user/bookReserv?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(page => { setPage(page) })
	}, [params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

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
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/user/bookReserv/${res}`}>{res}</Link>
					</span>
				))}
			</div>
		</div>
	);
}