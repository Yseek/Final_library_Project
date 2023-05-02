import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./css/Notice.css";
import { useEffect, useState } from "react";
import moment from 'moment';
import Ip from "../Ip";

export default function Notice() {
	const params = useParams();
	const [data, setData] = useState([]);
	let url=`${Ip.url}/admin/notice/content/${params.noticeSeq}`
	useEffect(()=>{
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
		})
		.then(res => res.json())
		.then(data => setData(data))
		.catch(error => console.log("####"+error))
	}, [url]);
	console.log("data:"+JSON.stringify(data))

	const history = useNavigate();

	function update(noticeSeq){
		history(`/admin/notice/update/${noticeSeq}`);
	}

	function del(noticeSeq) {
		if (window.confirm("삭제하시겠습니까?")) {
			fetch(`${Ip.url}/admin/noticeAdmin/delete/${noticeSeq}`, {
				method: "DELETE",
				headers: {
				   "Content-Type": "application/json",
				   "Authorization": "Bearer " + sessionStorage.getItem("token"),
			 	},
			})
			.then(res => {
				if (res.ok) {
					alert("삭제완료");
					history('/admin/notice');
				}
			});
		}
	}

	const { state } = useLocation();
    const [loginSeq, setLoginSeq] = useState("");

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Authorization": "Bearer " + sessionStorage.getItem("token")
				}
			})
				.then(res => res.json())
				.then(res => {
                    setLoginSeq(res.memberSeq)
				})
		}
	}, [state]);

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
						<td id="contentContent"><div id="scroll_box">{data.noticeContent}</div></td>
					</tr>
					<tr>
						<td className="contentColumnName" align='center'>작성날짜</td>
						<td>{moment(data.noticeRdate).format('YYYY/MM/DD HH:mm:ss')}</td>
					</tr>
				</tbody>
			</table>
			<div>
				{data.memberSeq === loginSeq ? <><button onClick={() => update(data.noticeSeq)}>수정</button>&nbsp;&nbsp;&nbsp;
												<button onClick={() => del(data.noticeSeq)}>삭제</button></>
												: ""}
			</div>
		</div>
	);
}