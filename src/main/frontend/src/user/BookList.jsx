import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/BookList.css';

export default function BookList() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/bookList?page=${params.page}`)
			.then(res => res.json())
			.then(data => { setData(data.content) })
	}, [params]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/bookList?page=${params.page}`)
			.then(res => res.json())
			.then(page => { setPage(page) })
	}, [params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	let btn = "1"
	let stat = "1"

	return (
		<div className='BookListDiv'>
			<button><Link to={`/`}>메인메인!!!!</Link></button>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'>제목</th>
						<th className='BookListTh'>저자</th>
						<th className='BookListTh'>출판사</th>
						<th className='BookListTh'>상태</th>
						<th className='BookListTh'>예약</th>
						<th className='BookListTh'>내용보기</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookSeq}>
							<td className='BookListTd'>{res.bookTitle}</td>
							<td className='BookListTd'>{res.bookWriter}</td>
							<td className='BookListTd'>{res.bookPub}</td>
							<td className='BookListTd'>{stat === "2" ? <span>대여가능</span> : <span>대여불가</span>}</td>
							<td className='BookListTd'>{btn === "2" ? <button>예약</button> : <button>불가</button>}</td>
							<td className='BookListTd'><Link to={`/user/bookDetail/${res.bookSeq}`} className='BookListA'>보기</Link></td>
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