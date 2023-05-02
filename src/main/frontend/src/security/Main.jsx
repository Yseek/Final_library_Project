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

	console.log("확인용"+JSON.stringify(data));
	useEffect(() => {
		fetch(`${Ip.url}/mainbooklist`, {
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
						<input type="text" onChange={e => search(e)} placeholder='책 제목을 입력해주세요' />
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
					<div className="mainNoticeTable">
						공지사항
						{Array.isArray(page) && page.map(res => (
							<tr key={res.noticeSeq}>
								<td	className="mainNoticeTableTdTitle">  <a href={`/notice/content/${res.noticeSeq}`} style={{ color: 'black' }}> {res.noticeTitle.length > 20 ? res.noticeTitle.slice(0, 20) + "..." : res.noticeTitle} </a></td>
							</tr>
						))}
					</div>
				</div>
				<div className="BookListTable2">
					추천 도서 목록
					{Array.isArray(data) && data.map(res => (
						<td key={res.bookSeq}>
							<td className='BookListTable2'>
								<img src={res.bookImgPath} width={`100px`} height={`180px`}></img></td>
						</td>
					))}
				</div>
			</div>
		</div>
	)
}