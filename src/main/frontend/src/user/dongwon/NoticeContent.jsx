import { useParams, useNavigate } from "react-router-dom";
import "./css/Notice.css";
import useFetch from "./useFetch";

export default function Notice() {
	const params = useParams();
	const noticeList = useFetch(
		`http://127.0.0.1:8080/user/notice/content/${params.noticeSeq}`
		);
	const navigate = useNavigate();

	const goBack = (e) => {
		e.preventDefault();
		navigate(-1);
	};
	
	return (
		<div className="NoticeContent">
            <h2>공지사항</h2>
			<font color='gray' size='4' face='휴먼편지체'>
			</font>
			<table className="noticeTable" border='2' width='800' align='center'>
				<tbody>
					<tr>
						<td className="contentColumnName" width="20%" align='center'>작성자</td>
						<td>{noticeList.memberName}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>제목</td>
						<td>{noticeList.noticeTitle}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>내용</td>
						<td id="contentContent">{noticeList.noticeContent}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>작성날짜</td>
						<td>{noticeList.noticeRdate}</td>
					</tr>
				</tbody>
			</table>
			<button id="noticeSearchBtn" onClick={goBack}>목록</button>
		</div>
	);
}