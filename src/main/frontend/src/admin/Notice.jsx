import { Link, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";

export default function Notice() {
	const params = useParams();

	const [page, setPage] = useState([]);
	const [param, setParam] = useState(useParams());

	useEffect(() => {
		setParam({ params })
	}, [params]);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/notice?page=${params.page || 1}&size=10`)
		.then(res => res.json())
		.then(page => setPage(page))
	}, [param]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

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
                            <td width="15%">{res.member.memberName}</td>
							<td width="60%"><Link to={`/notice/content/${res.noticeSeq}`}>{res.noticeTitle}</Link></td>
							<td>{res.noticeRdate}</td>
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
		</div>
	);
}