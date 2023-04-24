import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Notice.css";
import moment from 'moment';

export default function Mybookrent() {

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
		fetch(`http://127.0.0.1:8080/user/mybookrent?memberSeq=${info.memberSeq}`,{
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			}
		})
		.then(res => res.json())
		.then(data => setData(data))
	}, [info]);

	const prolong = (bookRentSeq, bookRentDDay, bookRentCoin) => {
		if(bookRentCoin === 1) {
			alert("이미 연장하셨습니다");
		}else {
			fetch(`http://127.0.0.1:8080/user/mybookrent/prolong.do`,{
				method:"POST",
				headers : {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({ bookRentSeq, bookRentDDay }),
			}).then(window.location.reload())
		}
	};

	return (
		<div className="Notice">
			<div><h2>나의 대여목록</h2></div>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
						<th>책 제목</th>
                        <th>대여일</th>
						<th>반납예정일</th>
                        <th>반납일</th>
						<th>연장횟수</th>
						<th>연장</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.bookRentSeq}>
							<td>{res.book.bookTitle}</td>
                            <td width="25%">{moment(res.bookRentRdate).format('YYYY-MM-DD')}</td>
							<td>{moment(res.bookRentDDay).format('YYYY-MM-DD')}</td>
							<td>{moment(res.bookRentReturn).format('YYYY-MM-DD')}</td>
							<td>{res.bookRentCoin}</td>
							<td><button onClick={() => prolong(res.bookRentSeq, res.bookRentDDay, res.bookRentCoin)}>연장</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}