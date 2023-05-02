import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Ip from "../Ip";
import './css/BookDetail.css';

export default function BookDetail() {
	const { state } = useLocation();
	const { pathname } = useLocation();
	const [book, setBook] = useState([]);
	const [selectedBook, setSelectedBook] = useState();

	useEffect(() => {
		const encodedTitle = encodeURIComponent(state[0]);
		const encodedWriter = encodeURIComponent(state[1]);
		const encodedPub = encodeURIComponent(state[2]);

		fetch(`${Ip.url}/user/bookDetail/${encodedTitle}&${encodedWriter}&${encodedPub}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => setBook(data))
	}, [selectedBook])

	console.log(book[0]);
	console.log(selectedBook);

	const navigate = useNavigate();
	const onClickBack = () => {
		navigate(-1);
	};

	function bookReserve(e) {
		e.preventDefault();
		if (window.confirm(`'${book[0].bookTitle}' 도서를 예약하시겠습니까?`)) {
			if (!sessionStorage.getItem("token")) {
				alert("로그인 후 이용해주세요")
				//navigate("/loginPage", { state: pathname });
			}
			else {
				fetch(`${Ip.url}/memberInfo`, {
					method: "POST",
					headers: {
						"Authorization": "Bearer " + sessionStorage.getItem("token")
					}
				})
				.then(res => res.json())
				.then((res) => {
					fetch(`${Ip.url}/bookreserve/${res.memberSeq}&${selectedBook}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + sessionStorage.getItem("token"),
						},
					})
					.then(() => {
						alert("예약이 완료되었습니다. 1일 이내에 방문하여 책을 수령해주세요")
						window.location.reload();
					})
				})
			}
		}
	}

	return (
		<>
			{book.length > 0 &&
				<div className='BookDetailDiv'>
					<h2>상세내용</h2>
					<table className="BookDetailTable">
						<thead>
							<tr>
								<th className='BookDetailTh'>구분</th>
								<th className='BookDetailTh'>내용</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='font-bold BookDetailTd'>책 표지</td>
								<td className='BookDetailTd'><img src={book[0].bookImgPath} width={`300px`} height={`300px`} /></td>
							</tr>
							<tr>
								<td className='font-bold BookDetailTd'>제목</td>
								<td className='BookDetailTd'>{book[0].bookTitle}</td>
							</tr>
							<tr>
								<td className='font-bold BookDetailTd'>저자</td>
								<td className='BookDetailTd'>{book[0].bookWriter}</td>
							</tr>
							<tr>
								<td className='font-bold BookDetailTd'>출판사</td>
								<td className='BookDetailTd'>{book[0].bookPub}</td>
							</tr>
							<tr>
								<td className='font-bold BookDetailTd'>내용</td>
								<td className='BookDetailTd'>{book[0].bookStory}</td>
							</tr>
							<tr>
								<td className='font-bold BookDetailTd'>예약하기</td>
								<td className='BookDetailTd'>
									책 번호를 선택해주세요: <select
										type="number"
										value={selectedBook}
										onChange={({ target: { value } }) => setSelectedBook(Number(value))}
									>
										<option value="none">===</option>
										{book.map((res, bookSeq) => (
											<option key={bookSeq}>
												{res.bookStatus === 1 ? <option value={res.bookSeq}>{res.bookSeq}</option> : <option value="none">예약불가</option>}
											</option>))}
									</select>
								</td>
							</tr>
						</tbody>
					</table>
					<button className='BookDetailBtn' onClick={onClickBack}>목록으로</button>
					<button className='BookDetailBtn' onClick={(e) => bookReserve(e)}>예약하기</button>
				</div>
			}</>
	)
};