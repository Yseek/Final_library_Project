import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import moment from 'moment';

export default function Notice() {
	const params = useParams();

	const [param, setParam] = useState(useParams());
	const [page, setPage] = useState([]);

	useEffect(()=>{
		setParam({params})
	},[params]);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/admin/noticeAdmin?page=${params.page || 1}&size=10`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		})
		.then(res => res.json())
		.then(page => setPage(page))
	}, [param]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);
	
	function del(noticeSeq) {
		if (window.confirm("삭제하시겠습니까?")) {
			fetch(`http://127.0.0.1:8080/admin/noticeAdmin/delete/${noticeSeq}`, {
            	method: "DELETE",
            	headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
			})
			.then(res => {
				if (res.ok) {
					alert("삭제완료");
					setParam({param});
				}
			});
		}
	}

	return (
		<div className="Notice">
            <h2>공지사항</h2>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>작성자</th>
						<th>공지제목</th>
						<th>공지날짜</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(page.content) && page.content.map(res => (
						<tr key={res.noticeSeq}>
                            <td width="15%">{res.member.memberName}</td>
							<td width="50%"><Link to={`/noticeAdmin/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td width="25%">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
							<td><button onClick={() => del(res.noticeSeq)}>삭제</button></td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/noticeAdmin/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
				<p><button><Link to={`/noticeAdmin/write`}>글쓰기</Link></button></p>
			</div>
		</div>
	);
}