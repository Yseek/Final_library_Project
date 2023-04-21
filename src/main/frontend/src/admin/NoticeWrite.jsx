import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import "./css/Notice.css";
import Ip from '../Ip';

export default function NoticeWrite() {
	const titleRef = useRef(null);
	const contentRef = useRef(null);

    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        const noticeTitle = titleRef.current.value;
		const noticeContent = contentRef.current.value;
        fetch(`${Ip.url}/admin/noticeAdmin/write.do`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({ memberSeq, noticeTitle, noticeContent }),
		})
        .then(navigate(`/admin/notice`))
    };

    const fontWeight = {
        fontWeight:"500"
    }
    const goBack = () => {
        navigate(-1);
    };

    const { state } = useLocation();
	const [name, setName] = useState("");
    const [memberSeq, setMemberSeq] = useState("");


	useEffect(() => {
		if (localStorage.getItem("token")) {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
				.then(res => res.json())
				.then(res => {
					setName(res.memberName);
                    setMemberSeq(res.memberSeq)
				})
		}
	}, [state]);

    return (
        <div className="Notice">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <table border="0" width="700" align="center" bordercolor="gray">
                    <tbody>
                        <tr>
                            <td width="30%" align="center" style={fontWeight}>Name</td>
                            {/* <td><input type="text" name="writer" readonly value='홍길동' size="80"/></td> */}
                            <td align="left">{name}</td>
                        </tr>
                        <tr>
                            <td align="center" style={fontWeight}>Title</td>
                            <td><input type="text" ref={titleRef} size="80"/></td>
                        </tr>
                        <tr>
                            <td align="center" style={fontWeight}>Content</td>
                            <td><textarea ref={contentRef} rows="20" cols="76"></textarea></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align="center">
                                <button>전송</button>&nbsp;&nbsp;&nbsp;
                                <button type="button" className="profileB" onClick={goBack}>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}