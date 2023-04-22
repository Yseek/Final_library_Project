import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Ip from "../Ip";

export default function AdminBookHope() {
    const { bookHopeSeq } = useParams();
    const [data, setData] = useState({});


    const titleRef = useRef();
    const writerRef = useRef();
    const pubRef = useRef();
    const bookHopeSeqRef = useRef();
    const bookHopeStatusRef = useRef();
    const bookStoryRef = useRef();
    const bookImgNameRef = useRef();
    const bookImgPathRef = useRef();
    const bookImgOgnRef = useRef();
    const history = useNavigate(); //취소버튼용

    useEffect(()=>{
		fetch(`${Ip.url}/admin/bookHopeOk/${bookHopeSeq}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		    })
        .then(res => res.json())
        .then(data => setData(data))
	}, [bookHopeSeq]);
    console.log("토큰값"+localStorage.getItem("token"));

    const handleSubmit = (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append('bookTitle', titleRef.current.value);
        // formData.append('bookWriter', writerRef.current.value);
        // formData.append('bookPub', pubRef.current.value);
        // formData.append('bookStory', bookStoryRef.current.value);
        // formData.append('bookImgName', bookImgNameRef.current.value);
        // formData.append('bookImgPath', bookImgPathRef.current.value);
        // formData.append('bookImgOgn', bookImgOgnRef.current.value);
        // formData.append('bookHopeSeq', bookHopeSeqRef.current.value);
        // formData.append('bookHopeStatus', bookHopeStatusRef.current.value);

        const bookTitle = titleRef.current.value;
        const bookWriter = writerRef.current.value;
        const bookPub = pubRef.current.value;
        const bookStory = bookStoryRef.current.value;
        const bookImgName = bookImgNameRef.current.value;
        const bookImgPath = bookImgPathRef.current.value;
        const bookImgOgn = bookImgOgnRef.current.value;
        const bookHopeSeq = bookHopeSeqRef.current.value;
        const bookHopeStatus = bookHopeStatusRef.current.value;
        
        fetch(`${Ip.url}/admin/bookHopeOk/Input`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
           },
          body: JSON.stringify({ bookTitle, bookWriter, bookPub, bookStory, bookImgName, bookImgPath, bookImgOgn, bookHopeSeq, bookHopeStatus }),
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
          history(`/admin/bookHope`)
    };

    return(
        <div>
            {Object.keys(data).length > 0 && (
            <form method="post" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="row-in">          
                        <h2>제목</h2><input type="text" ref={titleRef} defaultValue={data.bookHopeTitle}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>저자</h2><input type="text" ref={writerRef} defaultValue={data.bookHopeWriter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>출판사</h2><input type="text" ref={pubRef} defaultValue={data.bookHopePub}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>줄거리</h2><textarea className="bookStory" ref={bookStoryRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>책 이미지 파일명</h2><input type="text" ref={bookImgNameRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>책 이미지 경로</h2><input type="text" ref={bookImgPathRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>책 이미지 원본파일명</h2><input type="text" ref={bookImgOgnRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <input type="hidden" ref={bookHopeSeqRef} defaultValue={data.bookHopeSeq}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <input type="hidden" ref={bookHopeStatusRef} defaultValue="2"/>
                    </div>
                </div>
                <div className="row">
                    <button type="submit">입력</button>
				</div>
            </form>)}
        </div>
    )
}