import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Ip from "../Ip";
import Pagination from '../admin/Pagination';
import './css/BookList.css';
import styled from 'styled-components';

export default function BookList() {
	const [limit, setLimit] = useState(5);
	const [page, setPage] = useState(1);
	const [bookList, setBookList] = useState([]);
	const { pathname } = useLocation();
	const offset = (page - 1) * limit;
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${Ip.url}/bookList`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => setBookList(data))
	}, [])

	function bookDetail(bookTitle, bookWriter, bookPub) {
		const a = [bookTitle, bookWriter, bookPub]
		navigate(`/user/bookDetail`, {
			state: a
		});
	}

	function bookMyFavorite(bookTitle, bookWriter, bookPub) {
		if (!localStorage.getItem("token")) {
			navigate("/loginPage", { state: pathname });
		} else {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
			})
				.then(res => res.json())
				.then(res => {
					const info = res.memberSeq;
					fetch(`${Ip.url}/user/bookMyFavorite`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("token"),
						},
						body: JSON.stringify({bookTitle, bookWriter, bookPub, info})
					})
						.then(res => res.text())
						.then(res => alert(res));
				})
				
		}
		
	}

	return (
		<div className='BookListDiv'>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'>사진</th>
						<th className='BookListTh'>제목</th>
						<th className='BookListTh'>저자</th>
						<th className='BookListTh'>출판사</th>
						<th className='BookListTh'>상태</th>
						<th className='BookListTh'>내용보기</th>
						<th className='BookListTh'>내서재추가</th>
					</tr>
				</thead>
				<tbody>
					{bookList.slice(offset, offset + limit).map((res, index) => (
						<tr key={index}>
							<td className='BookListTd'>
								<img src={res.bookImgPath} width={`100px`} height={`100px`}></img></td>
							<td className='BookListTd'>{res.bookTitle}</td>
							<td className='BookListTd'>{res.bookWriter}</td>
							<td className='BookListTd'>{res.bookPub}</td>
							<td className='BookListTd'>
								{res.rentCount === 0 && "예약불가"}
								{res.rentCount !== 0 && `예약가능 (총 ${res.bookCount}권 중 ${res.rentCount}권)`}
							</td>
							<td className='BookListTd'><A onClick={() => bookDetail(res.bookTitle, res.bookWriter, res.bookPub)} className='BookListA'>보기</A></td>
							<td className='BookListTd'><a style={{ cursor: "pointer" }} onClick={() => bookMyFavorite(res.bookTitle, res.bookWriter, res.bookPub)} className='BookListA'>추가</a></td>
						</tr>
					))}
				</tbody>
			</table>
			<span>
				<Pagination
					total={bookList.length}
					limit={limit}
					page={page}
					setPage={setPage}
				/>
			</span>
		</div>
	);
}

const A = styled.a`
	color: -webkit-link;
	cursor: pointer;
`;