import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./css/Notice.css";

export default function Notice() {
	const params = useParams();
	const [data, setData] = useState([]);
	let url=`http://127.0.0.1:8080/notice/content/${params.noticeSeq}`
	useEffect(()=>{
		fetch(url)
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
        fetch(`http://127.0.0.1:8080/noticeAdmin/update.do`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ noticeSeq, noticeTitle, noticeContent }),
		})
        .then(navigate(`/noticeAdmin/1`))
    };

	const fontWeight = {
        fontWeight:"500"
    }

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
                            <td align="left">홍길동</td>
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
                                <button>수정완료</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
		</div>
	);
}