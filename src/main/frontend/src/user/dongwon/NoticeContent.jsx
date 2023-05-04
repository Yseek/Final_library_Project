import { useParams, useNavigate } from "react-router-dom";
import "./css/Notice.css";
import useFetch from "./useFetch";
import Ip from "../../Ip";
import moment from 'moment';

export default function Notice() {
	const params = useParams();
	const noticeList = useFetch(
		`${Ip.url}/notice/content/${params.noticeSeq}`
	);
	const navigate = useNavigate();

	const goBack = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	return (
		<center>
			<h2>공지사항</h2>
			<font color='gray' size='4' face='휴먼편지체'>
			</font>
			<table className="noticeTableDetail">
				<tbody>
					<tr>
						<td className="noticeTableThDetail">작성자</td>
						<td className="noticeTableTdDetail">{noticeList.memberName}</td>
					</tr>
					<tr>
						<td className="noticeTableThDetail">제목</td>
						<td className="noticeTableTdDetail">{noticeList.noticeTitle}</td>
					</tr>
					<tr>
						<td className="noticeTableThDetail">내용</td>
						<td className="noticeTableTdDetail"><div id="scroll_box">{noticeList.noticeContent}</div></td>
					</tr>
					<tr>
						<td className="noticeTableThDetail">작성날짜</td>
						<td className="noticeTableTdDetail">{moment(noticeList.noticeRdate).format('YYYY-MM-DD HH:mm:ss')}</td>
					</tr>
				</tbody>
			</table>
			<button id="noticeSearchBtn" onClick={goBack}>목록</button>
		</center>
	);
}