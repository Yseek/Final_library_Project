import { Link, useNavigate, useParams } from "react-router-dom";
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

	
	const history = useNavigate();
	function write(){
		history('/admin/notice/write');
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
					</tr>
				</thead>
				<tbody>
					{Array.isArray(page.content) && page.content.map(res => (
						<tr key={res.noticeSeq}>
                            <td width="20%">{res.member.memberName}</td>
							<td width="60%"><Link to={`/admin/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td width="20%">{moment(res.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/admin/notice/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
				<p><button onClick={() => write()}>글쓰기</button></p>
			</div>
		</div>
	);
}