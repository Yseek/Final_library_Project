import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./css/BookList.css";

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
		<div className="BookListDiv">
			<Link to={`/`}>메인메인!!!!</Link>
			<table className="table">
				<thead>
					<tr>
						<th>제목</th>
						<th>저자</th>
						<th>출판사</th>
						<th>상태</th>
						<th>예약</th>
						<th>내용보기</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookSeq}>
							<td>{res.bookTitle}</td>
							<td>{res.bookWriter}</td>
							<td>{res.bookPub}</td>
							<td>{stat === "2" ? <span>대여가능</span> : <span>대여불가</span>}</td>
							<td>{btn === "2" ? <button>예약</button> : <button>불가</button>}</td>
							<td><Link to={`/user/bookDetail/${res.bookSeq}`}>보기</Link></td>
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