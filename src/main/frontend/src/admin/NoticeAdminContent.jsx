import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";

export default function Notice() {
	const params = useParams();
	const [data, setData] = useState([]);
	let url=`http://127.0.0.1:8080/notice/content/${params.noticeSeq}`
	useEffect(()=>{
		fetch(url)
		.then(res => res.json())
		.then(data => setData(data))
		.catch(error => console.log("####"+error))
	}, [url]);
	console.log("data:"+JSON.stringify(data))

	const history = useNavigate();

	function del(noticeSeq) {
		if (window.confirm("삭제하시겠습니까?")) {
			fetch(`http://127.0.0.1:8080/noticeAdmin/delete/${noticeSeq}`, {
				method: "DELETE"
			})
			.then(res => {
				if (res.ok) {
					alert("삭제완료");
					history('/noticeAdmin');
				}
			});
		}
	}

	return (
		<div className="NoticeContent">
            <h2>공지사항</h2>
			<font color='gray' size='4' face='휴먼편지체'>
			</font>
			<table className="noticeTable" border='2' width='800' align='center'>
				<tbody>
					<tr>
						<td className="contentColumnName" width="20%" align='center'>작성자</td>
						<td>{data.memberName}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>제목</td>
						<td>{data.noticeTitle}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>내용</td>
						<td id="contentContent">{data.noticeContent}</td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>작성날짜</td>
						<td>{data.noticeRdate}</td>
					</tr>
				</tbody>
			</table>
			<div>
            	<button><Link to={`/noticeAdmin/update/${data.noticeSeq}`}>수정</Link></button>&nbsp;&nbsp;&nbsp;
            	<button onClick={() => del(data.noticeSeq)}>삭제</button>
			</div>
		</div>
	);
}