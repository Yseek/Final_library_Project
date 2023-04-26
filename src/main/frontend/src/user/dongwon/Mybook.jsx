import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import "./css/Notice.css";

export default function Mybook() {
	const params = useParams();
	const navi = useNavigate();
	const { pathname } = useLocation();
	const [info, setInfo] = useState({});
	const [data, setData] = useState([]);
	const [page, setPage] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		} else {
			fetch(`http://127.0.0.1:8080/memberInfo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
			})
				.then(res => res.json())
				.then(res => setInfo(res))
		}
	}, []);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/mybooklist?memberSeq=${info.memberSeq}&page=${params.page}&size=5`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(data => setData(data.content))
	}, [info, params]);

	useEffect(()=>{
		fetch(`http://127.0.0.1:8080/user/mybooklist?memberSeq=${info.memberSeq}&page=${params.page}&size=5`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(page => setPage(page))
	}, [info, params]);

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	const deleteFromMybook = (myBooksSeq) => {
		fetch(`http://127.0.0.1:8080/user/mybooklist/delete.do`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({ myBooksSeq }),
		}).then(window.location.reload())
	};

	return (
		<div className="Notice">
			<div><h2>내 서재</h2></div>
			<p id="mypageItems">총 {page.totalCount}건, {params.page}/{page.totalPages}페이지</p>
			<table className="mypageTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
                        <th>커버 이미지</th>
						<th>저자</th>
						<th>출판사</th>
						<th>내서재에서 제거</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.myBooksSeq}>
                            <td width="25%">{res.book.bookTitle}</td>
							<td>{res.book.bookImgPath}</td>
							<td>{res.book.bookWriter}</td>
							<td>{res.book.bookPub}</td>
							<td><button id="deleteFromMybookBtn" onClick={() => deleteFromMybook(res.myBooksSeq)}>제거</button></td>
							{/* <td><button id="deleteFromMybookBtn">제거</button></td> */}
						</tr>
					))}
				</tbody>
			</table>
			<div className="page">
				{pageList.map(res => (
					<span key={res}>
						<Link to={`/mypage/mybook/${res}`}>{res}</Link>
						{" "}
					</span>
				))}
			</div>
		</div>
	);
}