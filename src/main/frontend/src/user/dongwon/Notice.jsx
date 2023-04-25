import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Notice() {
	const params = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);
	const [userInput, setUserInput] = useState('');

	const getValue = (e) => {
		setUserInput(e.target.value.toLowerCase())
	};

	const onClickSearchInput = (e) => {
		e.preventDefault();
		navigate(`/notice/search/${userInput}/1`);
	};

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/notice?page=${params.page}&size=10`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(data => setData(data.content))
	}, [params]);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/notice?page=${params.page}&size=10`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(page => setPage(page))
	}, [params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className="Notice">
			<div id="NoticeTitle"><h2>공지사항</h2></div>
			<p id="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>작성자</th>
						<th>공지 제목</th>
						<th>공지날짜</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.noticeSeq}>
                            <td width="15%">{res.member.memberName}</td>
							<td width="60%"><Link to={`/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							{/* <td>{res.noticeRdate}</td> */}
							<td>{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
							
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/notice/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
			<span><input type="text" placeholder="검색어를 입력해 주세요" onChange={getValue} size="25"/>&nbsp;
			<button id="noticeSearchBtn" onClick={onClickSearchInput} disabled={userInput.length === 0}>검색</button></span>
		</div>
	);
}