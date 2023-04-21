import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function AdminBookHope() {
    const { bookHopeSeq } = useParams();
    const [data, setData] = useState({});

    const titleRef = useRef();
    const writerRef = useRef();
    const pubRef = useRef();
    const bookHopeSeqRef = useRef();
    const bookHopeStatusRef = useRef();
    const bookStoryRef = useRef();
    const history = useNavigate(); //취소버튼용

    useEffect(()=>{
		fetch(`http://127.0.0.1:8080/admin/bookHopeOk/${bookHopeSeq}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		    })
        .then(res => res.json())
        .then(data => setData(data))
	}, [bookHopeSeq]);

    return(
        <div>
            {Object.keys(data).length > 0 && (
            <form method="post">
                <div className="row">
                    <div className="row-in">          
                        <h2>제목</h2><input type="text" name="bookTitle" ref={titleRef} defaultValue={data.bookHopeTitle}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>저자</h2><input type="text" name="bookWriter" ref={writerRef} defaultValue={data.bookHopeWriter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>출판사</h2><input type="text" name="bookPub" ref={pubRef} defaultValue={data.bookHopePub}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <input type="hidden" name="bookHopeSeq" ref={bookHopeSeqRef} defaultValue={data.bookHopeSeq}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <input type="hidden" name="bookHopeStatus" ref={bookHopeStatusRef} defaultValue="2"/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>줄거리</h2><textarea className="bookStory" name="bookStory" ref={bookStoryRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>책이미지</h2><input type="file" name="bookHopeTitle"/>
                    </div>
                </div>
                <div className="row">
                    <button>입력</button>
				</div>
            </form>)}
        </div>
    )
}