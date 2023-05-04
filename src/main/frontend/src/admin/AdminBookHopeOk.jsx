import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Ip from "../Ip";
import "./css/AdminAddBooks.css"

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
        <div className="adminAddBooksDiv">
            <h2>희망도서 승인</h2>
            {Object.keys(data).length > 0 && (
            <form method="post" onSubmit={handleSubmit}>
                <div className='adminAddBooksIpDiv'>
                    <span>제목</span><input className='adminAddBooksInput2' type="text" ref={titleRef} defaultValue={data.bookHopeTitle}/>
                </div>
                <div className='adminAddBooksIpDiv'>
                    <span>저자</span><input className='adminAddBooksInput2' type="text" ref={writerRef} defaultValue={data.bookHopeWriter}/>
                </div>
                <div className='adminAddBooksIpDiv'>
                    <span>출판사</span><input className='adminAddBooksInput2' type="text" ref={pubRef} defaultValue={data.bookHopePub}/>
                </div>
                <div className='adminAddBooksIpDiv'>
                     <span>줄거리</span><br/><textarea className="bookStory" ref={bookStoryRef}/>
                </div>
                <div className='adminAddBooksIpDiv2'>
                    <span>책 표지</span>
                    <label htmlFor="flie_upload" className='fileBtn'>파일선택</label>
                    <input id="flie_upload" multiple type="file" accept="image/*" onChange={e => onUpload(e)} ref={fileRef}/>
                </div>
                <div>
                    <img src={imageSrc} width={`300px`} height={`300px`} ></img>
                </div>
                <div>
                    <input type="hidden" defaultValue={data.bookHopeSeq}/>
                </div>
                <div>
                    <input type="hidden" ref={bookHopeStatusRef} defaultValue="2"/>
                </div>
                <div>
                    <button type="submit">입력</button>
				</div>
            </form>)}
        </div>
    )
}