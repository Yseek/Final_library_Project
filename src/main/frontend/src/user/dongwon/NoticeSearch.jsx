import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Notice() {
	const params = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	// const [page, setPage] = useState([]);
	const [userInput, setUserInput] = useState('');

	const getValue = (e) => {
		setUserInput(e.target.value.toLowerCase())
	};

	const onClickSearchInput = (e) => {
		e.preventDefault();
		navigate(`/notice/search/${userInput}`);
	};
    const onClickList = (e) => {
		e.preventDefault();
		navigate(`/notice/1`);
	};

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/notice?page=1&size=10&search=${params.userInput}`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(data => setData(data.content))
	}, [params]);

	return (
		<div className="Notice">
            <h2>공지사항</h2>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>작성자</th>
						<th>공지제목</th>
						<th>공지날짜</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.noticeSeq}>
                            <td width="15%">{res.member.memberName}</td>
							<td width="60%"><Link to={`/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td>{res.noticeRdate}</td>
						</tr>
					))}
				</tbody>
			</table>
			<span><input type="text" placeholder="검색어를 입력해 주세요" onChange={getValue} size="25"/>&nbsp;
			<button id="noticeSearchBtn" onClick={onClickSearchInput} disabled={userInput.length === 0}>검색</button>&nbsp;
            <button id="noticeSearchBtn" onClick={onClickList}>전체목록</button></span>
		</div>
	);
}