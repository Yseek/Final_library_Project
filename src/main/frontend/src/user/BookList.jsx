import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Ip from "../Ip";
import './css/BookList.css';

export default function BookList() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);

	useEffect(() => {
		fetch(`${Ip.url}/bookList?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => { console.log(data); setData(data.content) })
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/bookList?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(page => { setPage(page) })
	}, [params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	const bookStat = {
		1: "대출가능",
		2: "예약중",
		3: "대출중",
		4: "분실됨",
		5: "분실신고됨"
	}

	return (
		<div className='BookListDiv'>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'>제목</th>
						<th className='BookListTh'>저자</th>
						<th className='BookListTh'>출판사</th>
						<th className='BookListTh'>상태</th>
						<th className='BookListTh'>내용보기</th>
						{/* <th className='BookListTh'>예약하기</th> */}
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookSeq}>
							<td className='BookListTd'>{res.bookTitle}</td>
							<td className='BookListTd'>{res.bookWriter}</td>
							<td className='BookListTd'>{res.bookPub}</td>
							<td className='BookListTd'>{bookStat[res.bookStatus]}</td>
							<td className='BookListTd'><Link to={`/user/bookDetail/${res.bookSeq}`} className='BookListA'>보기</Link></td>
							{/* <td className='BookListTd'><button>예약</button></td> */}
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/user/bookList/${res}`}>{res}</Link>
					</span>
				))}
			</div>
		</div>
	);
}