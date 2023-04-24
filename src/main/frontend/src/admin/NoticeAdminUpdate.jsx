import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./css/Notice.css";
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
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
		.then(res => res.json())
		.then(data => setData(data))
	}, [url]);

	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const seqRef = useRef(null);

	const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        const noticeTitle = titleRef.current.value;
		const noticeContent = contentRef.current.value;
		const noticeSeq = seqRef.current.value;
        fetch(`${Ip.url}/admin/noticeAdmin/update.do`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({ noticeSeq, noticeTitle, noticeContent }),
		})
        .then(navigate(`/admin/notice`))
    };

	const fontWeight = {
        fontWeight:"500"
    }
    const goBack = () => {
        navigate(-1);
    };

	return (
		<div className="NoticeContent">
            <h2>게시글 수정</h2>
			<font color='gray' size='4' face='휴먼편지체'>
			</font>
			<form onSubmit={handleSubmit}>
                <table border="0" width="700" align="center" bordercolor="gray">
                    <tbody>
                        <tr>
                            <td width="30%" align="center" style={fontWeight}>Name</td>
                            {/* <td><input type="text" name="writer" readonly value='홍길동' size="80"/></td> */}
                            <td align="left"><label>{data.memberName}</label></td>
                        </tr>
                        <tr>
                            <td align="center" style={fontWeight}>Title</td>
                            <td><input type="text" ref={titleRef} defaultValue={data.noticeTitle} size="80"/></td>
                        </tr>
                        <tr>
                            <td align="center" style={fontWeight}>Content</td>
                            <td><textarea ref={contentRef} defaultValue={data.noticeContent} rows="20" cols="76"></textarea></td>
                        </tr>
						<input type="hidden" ref={seqRef} value={data.noticeSeq}/>
                        <tr>
                            <td></td>
                            <td align="center">
                                <button>수정완료</button>&nbsp;&nbsp;&nbsp;
                                <button type="button" className="profileB" onClick={goBack}>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
		</div>
	);
}