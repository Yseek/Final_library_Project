import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import "./css/Notice.css";

export default function NoticeWrite() {
	const titleRef = useRef(null);
	const contentRef = useRef(null);

    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        const noticeTitle = titleRef.current.value;
		const noticeContent = contentRef.current.value;
        fetch(`http://127.0.0.1:8080/noticeAdmin/write.do`,{
			method:"POST",
			headers : {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ noticeTitle, noticeContent }),
		})
        .then(navigate(`/noticeAdmin/1`))
    };

    const fontWeight = {
        fontWeight:"500"
    }

    return (
        <div className="Notice">
            <h2>게시글 작성</h2>
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
                            <td><input type="text" ref={titleRef} size="80"/></td>
                        </tr>
                        <tr>
                            <td align="center" style={fontWeight}>Content</td>
                            <td><textarea ref={contentRef} rows="20" cols="76"></textarea></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align="center">
                                <button>전송</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}