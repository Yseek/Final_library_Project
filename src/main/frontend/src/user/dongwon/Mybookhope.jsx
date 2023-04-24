import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Notice.css";

export default function Mybookhope() {

	const navi = useNavigate();
	const { pathname } = useLocation();
	const [info, setInfo] = useState({});
	const [data, setData] = useState([]);

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
		fetch(`http://127.0.0.1:8080/user/mybookhope?memberSeq=${info.memberSeq}`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(data => setData(data))
	}, [info]);

	return (
		<div className="Notice">
			<div><h2>나의 희망도서</h2></div>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
						<th>저자</th>
						<th>출판사</th>
                        <th>신청일</th>
                        <th>신청상태</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookHopeSeq}>
                            <td width="25%">{res.bookHopeTitle}</td>
							<td>{res.bookHopeWriter}</td>
							<td>{res.bookHopePub}</td>
							<td>{res.bookHopeWantDay}</td>
							<td>{res.bookHopeStatus}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}