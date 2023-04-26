import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ip from "../Ip";
import "./securityCss/Main.css";

export default function Main() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [searchedBooks, setSearchedBooks] = useState([]);

	useEffect(() => {
		fetch(`${Ip.url}/bookList?page=${params.page}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => { console.log(data); setData(data.content) })
	}, [params]);

	const search = (e) => {
		const bookTitle = e.target.value;
		if (bookTitle.length == 0) {
			setSearchedBooks([]);
		} else {
			fetch(`${Ip.url}/searchBook`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ bookTitle }),
			})
				.then(res => res.json())
				.then(res => {
					setSearchedBooks(res)
				});
		}
	}

	return (
		<div className="mainPage">
			<div className="mainTop">
				<div className="searchBookBox">
					<div className="searchBookBoxInput">
						<input type="text" onChange={e => search(e)} />검색
					</div>
					<table className='searchedBookList'>
						<tbody>
							{searchedBooks.map(res => (
								<tr key={res.bookSeq} className="searchedBookListTr">
									<Link to={`/user/bookDetail/${res.bookSeq}`}>
										<td><img src={res.bookImgPath} width={`50px`} height={`70px`} /></td>
										<td>{res.bookTitle}</td>
										<td>{res.bookWriter}</td>
										<td>{res.bookPub}</td>
									</Link>
								</tr>
							))}
						</tbody>
						<tbody>
				</tbody>
					</table>
				</div>
			</div>
			<div className="mainBottom">
				<div className="mainLeftBottom">
					뭐가 있긴 하겠지
				</div>
				<div className="mainRightBottom">
					뭐가 있긴 하겠지
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookSeq}>
							<td className='BookListTd'>{res.bookTitle}</td>
							<td className='BookListTd'>{res.bookWriter}</td>
							<td className='BookListTd'>{res.bookPub}</td>
							<td className='BookListTd'>{res.bookStatus}</td>
							<td className='BookListTd'><Link to={`/user/bookDetail/${res.bookSeq}`} className='BookListA'>보기</Link></td>
							<td className='BookListTd'><button>예약</button></td>
						</tr>
					))}
				</div>
			</div>
		</div>
	)
}