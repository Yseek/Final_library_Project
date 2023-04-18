import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/BookList.css';

export default function MessageCheck() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/messageCheck?page=${params.page}`)
			.then(res => res.json())
			.then(data => { setData(data.content) })
	}, [params]);

	useEffect(() => {
		fetch(`http://127.0.0.1:8080/user/messageCheck?page=${params.page}`)
			.then(res => res.json())
			.then(page => { setPage(page) })
	}, [params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className='BookListDiv'>
			<button><Link to={`/`}>메인메인!!!!</Link></button>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'>번호</th>
						<th className='BookListTh'>날짜</th>
						<th className='BookListTh'>내용</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.messageSeq}>
							<td className='BookListTd'>{res.messageSeq}</td>
							<td className='BookListTd'>{res.messageDate}</td>
							<td className='BookListTd'>{res.messageContent}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/user/BookMessage/${res}`}>{res}</Link>
					</span>
				))}
			</div>
		</div>
	);
}