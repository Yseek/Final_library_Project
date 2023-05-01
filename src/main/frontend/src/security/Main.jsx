import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ip from "../Ip";
import "./securityCss/Main.css";
import moment from 'moment';

export default function Main() {

	const params = useParams();

	const [data, setData] = useState([]);
	const [searchedBooks, setSearchedBooks] = useState([]);
	const navi = useNavigate();
	const [page, setPage] = useState([]);

	useEffect(() => {
		fetch(`${Ip.url}/bookList`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => { console.log(data); setData(data) })
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
	console.log("확인용"+params.page);
	useEffect(() => {
		fetch(`${Ip.url}/notice?page=${params.page || 1}&size=5`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(res => res.json())
			.then(page => setPage(page.content))
	}, [params]);
	
	console.log("page"+JSON.stringify(page));
	function bookDetail(bookTitle, bookWriter, bookPub) {
		const a = [bookTitle, bookWriter, bookPub]
		navi(`/user/bookDetail`, {
			state: a
		});
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
									<a onClick={() => bookDetail(res.bookTitle, res.bookWriter, res.bookPub)} style={{cursor:"pointer"}}>
										<td><img src={res.bookImgPath} width={`50px`} height={`70px`} /></td>
										<td>{res.bookTitle}</td>
										<td>{res.bookWriter}</td>
										<td>{res.bookPub}</td>
										<td>{res.bookEnable == "null" ? 0 : res.bookEnable}/{res.bookCount}권</td>
									</a>
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
					공지사항
					<thead>
					<tr>
						<th className="noticeTableTh">작성자</th>
						<th className="noticeTableTh">공지 제목</th>
						<th className="noticeTableTh">공지날짜</th>
					</tr>
				</thead>
		
					{Array.isArray(page) && page.map(res => (
						<tr key={res.noticeSeq}>
							<td className="noticeTableTd">{res.member.memberName}</td>
							<td className="noticeTableTd"><Link to={`/notice/content/${res.noticeSeq}`}>{res.noticeTitle.length > 5 ? res.noticeTitle.slice(0, 5) + "..." : res.noticeTitle}</Link></td>
							{/* <td>{res.noticeRdate}</td> */}
							<td className="noticeTableTd">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
						</tr>
					))}
				</div>
				<div className="BookListTable2">
					추천 도서 목록
					<thead>
					<tr>
						<th className='BookListTh'>사진</th>
						<th className='BookListTh'>제목</th>
						<th className='BookListTh'>저자</th>
						<th className='BookListTh'>출판사</th>
						<th className='BookListTh'>내용</th>
					</tr>
				</thead>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookSeq}>
							<td className='BookListTd'>
								<img src={res.bookImgPath} width={`60px`} height={`75px`}></img></td>
							<td className='BookListTd'>{res.bookTitle}</td>
							<td className='BookListTd'>{res.bookWriter}</td>
							<td className='BookListTd'>{res.bookPub}</td>
							<td className='BookListTd'><Link to={`/user/bookDetail/${res.bookSeq}`} className='BookListA'>보기</Link></td>
						</tr>
					))}
				</div>
			</div>
		</div>
	)
}