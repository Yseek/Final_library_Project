import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Ip from "../Ip";

export default function AdminBookHope() {
    const { bookHopeSeq } = useParams();
    const [data, setData] = useState({});


    const titleRef = useRef();
    const writerRef = useRef();
    const pubRef = useRef();
    const bookHopeStatusRef = useRef();
    const bookStoryRef = useRef();
    const fileRef = useRef();

    const history = useNavigate(); //취소버튼용

    useEffect(()=>{
		fetch(`${Ip.url}/admin/bookHopeOk/${bookHopeSeq}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + sessionStorage.getItem("token"),
      		},
		    })
        .then(res => res.json())
        .then(data => setData(data))
	}, [bookHopeSeq]);
    console.log("토큰값"+sessionStorage.getItem("token"));

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', fileImg);
        formData.append('title', titleRef.current.value);
        formData.append('writer', writerRef.current.value);
        formData.append('pub', pubRef.current.value);
        formData.append('bookStory', bookStoryRef.current.value);
        formData.append('bookHopeSeq', data.bookHopeSeq);
        formData.append('bookHopeStatus', bookHopeStatusRef.current.value);

        fetch(`${Ip.url}/admin/bookHopeOk/Input`, {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
           },
          body: formData
        })
          .then(response => response.text())
          .then(res => alert(res))
          .catch(error => console.error(error));
          history(`/admin/bookHope`)
          window.location.reload();
    };

    const [imageSrc, setImageSrc] = useState(null);
    const [fileImg, setFileImg] = useState(null);

    const onUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        return new Promise(res => {
           reader.onload = () => {
              setImageSrc(reader.result || null);
              setFileImg(file);
              res();
           }
        })
     }

    return(
        <div>
            {Object.keys(data).length > 0 && (
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <div>          
                        <h2>제목</h2><input type="text" ref={titleRef} defaultValue={data.bookHopeTitle}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <h2>저자</h2><input type="text" ref={writerRef} defaultValue={data.bookHopeWriter}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <h2>출판사</h2><input type="text" ref={pubRef} defaultValue={data.bookHopePub}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <h2>줄거리</h2><textarea className="bookStory" ref={bookStoryRef}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <h2>책 이미지 파일</h2>
                        <label htmlFor="flie_upload" className='fileBtn'>파일선택</label>
                        <input id="flie_upload" multiple type="file" accept="image/*" onChange={e => onUpload(e)} ref={fileRef}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <img src={imageSrc} width={`300px`} height={`300px`} ></img>
                    </div>
                </div>
                <div>
                    <div>          
                        <input type="hidden" defaultValue={data.bookHopeSeq}/>
                    </div>
                </div>
                <div>
                    <div>          
                        <input type="hidden" ref={bookHopeStatusRef} defaultValue="2"/>
                    </div>
                </div>
                <div>
                    <button type="submit">입력</button>
				</div>
            </form>)}
        </div>
    )
}