import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Ip from "../../Ip";

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
		//e.preventDefault();
		navigate(`/notice/search/${userInput}/1`);
	};
	const enterkey = (e) => {
		if (e.key == 'Enter') {
			onClickSearchInput();
		}
	}

	useEffect(() => {
		fetch(`${Ip.url}/notice?page=${params.page}&size=10`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(res => res.json())
			.then(data => setData(data.content))
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/notice?page=${params.page}&size=10`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [params]);

	// 한 화면에 보여줄 페이지 수 계산
	var pageWidth = 10;
	var pageWidthNumber = Math.floor((page.page - 1) / pageWidth); // 현재 페이지목록 index
	var startPage = 1 + pageWidthNumber * pageWidth;
	var endPage = pageWidthNumber * pageWidth + pageWidth;
	if (endPage > page.totalPages) endPage = page.totalPages;
	
    const pageList = Array.from({ length: (endPage - startPage + 1) }, (_, index) => startPage + index);
	
	return (
		<center>
			<h2>공지사항</h2>
			<p className="NoticeItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead>
					<tr>
						<th className="noticeTableTh">작성자</th>
						<th className="noticeTableTh">공지 제목</th>
						<th className="noticeTableTh">공지날짜</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.noticeSeq}>
							<td className="noticeTableTd">{res.member.memberName}</td>
							<td className="noticeTableTd"><Link to={`/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td className="noticeTableTd">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
						</tr>
					))}
				</tbody>
			</table>
			{pageList.length === 0 && <span>검색 결과가 없습니다</span>}
			{pageList.length !== 0 && <div className="paging">
				<span><Link to={`/notice/1`} className="btn-paging first">&laquo;</Link></span>&nbsp;
				<span><Link to={`/notice/${Math.max(1, page.page - pageWidth)}`} className="btn-paging prev">&lt;</Link></span>&nbsp;
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/notice/${res}`}>
							{page.page === res ? <span className="tp">{res}</span> : res}
						</Link>
						{" "}
					</span>
				))}
				<span><Link to={`/notice/${Math.min(page.totalPages, page.page + pageWidth)}`} className="btn-paging next">&gt;</Link></span>&nbsp;&nbsp;
				<span><Link to={`/notice/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
			</div>}<br />
			<span><input type="text" placeholder="검색어를 입력해 주세요" onChange={getValue} onKeyUp={enterkey} size="25" />&nbsp;
				<button className="noticeSearchBtn" onClick={onClickSearchInput} disabled={userInput.length === 0}>검색</button></span>
		</center>
	);
}