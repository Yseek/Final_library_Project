import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import moment from 'moment';
import Ip from "../Ip";

export default function Notice() {
	const params = useParams();

	const [param, setParam] = useState(useParams());
	const [page, setPage] = useState([]);

	useEffect(() => {
		setParam({ params })
	}, [params]);

	useEffect(() => {
		fetch(`${Ip.url}/admin/notice?page=${params.page || 1}&size=10`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
		})
			.then(res => res.json())
			.then(page => setPage(page))
	}, [param]);

	const history = useNavigate();
	function write() {
		history('/admin/notice/write');
	}

	const [userInput, setUserInput] = useState('');
	const getValue = (e) => {
		setUserInput(e.target.value.toLowerCase())
	};

	// 검색 버튼 클릭 이벤트 처리
	const onClickSearchInput = (e) => {
		e.preventDefault();
		history(`/admin/notice/search/${userInput}`);
	};
	// 엔터 키 입력 이벤트 처리
    const onKeyDownSearchInput = (e) => {
        if (e.keyCode === 13 && userInput.length > 0) {
            onClickSearchInput(e);
        }
    };

	// 한 화면에 보여줄 페이지 수 계산
	var pageWidth = 10;
	var pageWidthNumber = Math.floor(page.number / pageWidth); // 현재 페이지목록 index
	var startPage = 1 + pageWidthNumber * pageWidth;
	var endPage = pageWidthNumber * pageWidth + pageWidth;
	if (endPage > page.totalPages) endPage = page.totalPages;

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);
	


	return (
		<center>
			<h2>공지사항</h2>
			<p className="NoticeItems">총 {page.totalCount}건, {page.page}/{page.totalPages}페이지</p>
			<table className="noticeTable">
				<thead>
					<tr>
						<th className="noticeTableTh">작성자</th>
						<th className="noticeTableTh">공지제목</th>
						<th className="noticeTableTh">공지날짜</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(page.content) && page.content.map(res => (
						<tr key={res.noticeSeq}>
							<td className="noticeTableTd">{res.member.memberName}</td>
							<td className="noticeTableTd"><Link to={`/admin/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td className="noticeTableTd">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
						</tr>
					))}
				</tbody>
			</table>
			<span><input type="text" placeholder="검색어를 입력해 주세요" onChange={getValue} onKeyDown={onKeyDownSearchInput} size="25" />&nbsp;
				<button className="adminNoticeSearchBtn" onClick={onClickSearchInput} disabled={userInput.length === 0}>검색</button></span>
			<button className="adminNoticeWriteBtn" onClick={() => write()}>글쓰기</button>
			{pageList.length === 0 && <span>검색 결과가 없습니다</span>}
			{pageList.length !== 0 && <div className="paging">
				<span><Link to={`/admin/notice/1`} className="btn-paging first">&laquo;</Link></span>&nbsp;
				<span><Link to={`/admin/notice/${Math.max(1, page.number + 1 - pageWidth)}`} className="btn-paging prev">&lt;</Link></span>&nbsp;
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/admin/notice/${res}`}>
							{page.number + 1 === res ? <span className="tp">{res}</span> : res}
						</Link>
						{" "}
					</span>
				))}
				<span><Link to={`/admin/notice/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`} className="btn-paging next">&gt;</Link></span>&nbsp;&nbsp;
				<span><Link to={`/admin/notice/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
			</div>}<br />
		</center>
	);
}