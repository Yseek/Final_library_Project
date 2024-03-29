import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Ip from "../Ip";

export default function Notice() {
	const params = useParams();

    const [param, setParam] = useState(useParams());
	const navigate = useNavigate();
	const [page, setPage] = useState([]);
	const [userInput, setUserInput] = useState('');

    useEffect(()=>{
		setParam({params})
	},[params]);

	const getValue = (e) => {
		setUserInput(e.target.value.toLowerCase())
	};

	// 검색 버튼 클릭 이벤트 처리
	const onClickSearchInput = (e) => {
		e.preventDefault();
		navigate(`/admin/notice/search/${userInput}`);
	};
	// 엔터 키 입력 이벤트 처리
    const onKeyDownSearchInput = (e) => {
        if (e.keyCode === 13 && userInput.length > 0) {
            onClickSearchInput(e);
        }
    };
	const onClickList = (e) => {
		e.preventDefault();
		navigate(`/admin/notice`);
	};

	useEffect(()=>{
		fetch(`${Ip.url}/admin/notice?page=${params.page || 1}&size=10&search=${params.userInput}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + sessionStorage.getItem("token"),
      		},
		})
		.then(res => res.json())
		.then(page => setPage(page))
	}, [param]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className="Notice">
			<h2>공지사항</h2>
			<p id="NoticeItems">총 {page.totalCount}건, {page.page}/{page.totalPages}페이지</p>
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
							<td className="noticeTableTd"><Link to={`/admin/notice/content/${res.noticeSeq}`} className="noticeNoColor">{res.noticeTitle}</Link></td>
							<td className="noticeTableTd">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
						</tr>
					))}
				</tbody>
			</table>
            <span><input type="text" placeholder="검색어를 입력해 주세요" onChange={getValue} onKeyDown={onKeyDownSearchInput} size="25" />&nbsp;
				<button className="AdminNoticeSearchBtn" onClick={onClickSearchInput} disabled={userInput.length === 0}>검색</button>&nbsp;</span>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/admin/notice/search/${userInput}/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
				<span><button onClick={onClickList}>전체목록</button></span>
		</div>
	);
}