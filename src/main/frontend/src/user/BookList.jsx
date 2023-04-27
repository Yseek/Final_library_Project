import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ip from "../Ip";
import Pagination from '../admin/Pagination';
import './css/BookList.css';
import styled from 'styled-components';

export default function BookList() {
	const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
	const [bookList, setBookList] = useState([]);
	const offset = (page - 1) * limit;
	const navigate = useNavigate();

	/* useEffect(() => {
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
	}, [params]); */

	useEffect(()=>{
		fetch(`${Ip.url}/bookList`,{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
		.then(res => res.json())
		.then(data => setBookList(data))
    }, [])

	/* const { state } = useLocation();
    const [memberSeq, setMemberSeq] = useState(""); */

	/* const bookStat = {
		1: "대출가능",
		2: "예약중",
		3: "대출중",
		4: "분실됨",
		5: "분실신고됨"
	} */

	/* function reserveBook(e, bookSeq, bookTitle){
		e.preventDefault();

		if(window.confirm(`'${bookTitle}' 도서를 예약합니다`)){
			fetch(`${Ip.url}/user/bookreserve/${memberSeq}&${bookSeq}`,{
				method: "POST",
				headers : {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
			})
			.then(() =>{
				alert("예약이 완료되었습니다. 1일 이내에 방문하여 책을 수령해주세요")
				window.location.reload();
			})
		}
	} */
	function bookDetail(bookTitle, bookWriter, bookPub){
		const a = [bookTitle, bookWriter, bookPub]
		navigate(`/user/bookDetail`, {
			state: a
		});
	}

	return (
		<div className='BookListDiv'>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'></th>
						<th className='BookListTh'>제목</th>
						<th className='BookListTh'>저자</th>
						<th className='BookListTh'>출판사</th>
						<th className='BookListTh'>상태</th>
						<th className='BookListTh'>내용보기</th>
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