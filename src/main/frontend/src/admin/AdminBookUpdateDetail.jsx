import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Ip from "../Ip";

export default function AdminBookUpdateDetail(){
    const navigate = useNavigate();
    const { state } = useLocation();

    const bookSeq = encodeURIComponent(state)
    const [bookData, setbookData] = useState([]);
    const fileRef = useRef();

    useEffect(() => {
        fetch(`${Ip.url}/admin/booklist/id=${bookSeq}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        )
        .then((res) => res.json())
        .then((data) => setbookData(data))
        .catch((error) => console.error(error));
    }, [bookSeq]);

    console.log(bookData);

    function onSubmit(e){
        e.preventDefault();

        const bookTitle = e.target.bookTitle.value;
        const bookWriter = e.target.bookWriter.value;
        const bookPub = e.target.bookPub.value;

        const formData = new FormData();
        formData.append('bookSeq', e.target.bookSeq.value);
        formData.append('bookTitle', bookTitle);
        formData.append('bookWriter', bookWriter);
        formData.append('bookPub', bookPub);
        formData.append('bookStatus', e.target.bookStatus.value);
        formData.append('bookStory', e.target.bookStory.value)

        if(fileImg != null){
            formData.append('file', fileImg);
            fetch(`${Ip.url}/admin/booklist/update/detail/1`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: formData
            })
            .then(res => res.text())
            .then(() => {
                alert("수정완료");
                const a = [bookTitle,bookWriter,bookPub]
                navigate(`/admin/booklist/update`, {
                    state: a
                })
            })
            .catch((error) => console.error(error))
        }else{
            fetch(`${Ip.url}/admin/booklist/update/detail/2`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                body: formData
            })
            .then(res => res.text())
            .then(() => {
                alert("수정완료");
                const a = [bookTitle,bookWriter,bookPub]
                navigate(`/admin/booklist/update`, {
                    state: a
                })
            })
            .catch((error) => console.error(error))
        }

    }

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
    console.log(imageSrc)
    return(
        <div>
             {Object.keys(bookData).length > 0 && (
            <form method="post" name="e" onSubmit={onSubmit} autoComplete="off">
                <div className="row">
                    <div className="row-in">          
                        <h2>책번호</h2><input readOnly type="text" name="bookSeq" defaultValue={bookData.bookSeq}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>제목</h2><input type="text" name="bookTitle" defaultValue={bookData.bookTitle}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>저자</h2><input type="text" name="bookWriter" defaultValue={bookData.bookWriter}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>출판사</h2><input type="text" name="bookPub"  defaultValue={bookData.bookPub}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>줄거리</h2><input type="text" name="bookStory"  defaultValue={bookData.bookStory}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>책 이미지 파일</h2><input multiple type="file" accept="image/*" onChange={e => onUpload(e)} ref={fileRef}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        {imageSrc !== null && <img src={imageSrc} width={`300px`} height={`300px`} ></img>}
                        {imageSrc === null && <img src={bookData.bookImgPath} width={`300px`} height={`300px`}></img> }
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>상태</h2><input type="text" name="bookStatus"  defaultValue={bookData.bookStatus}/>
                    </div>
                </div>
                <div className="row">
                    <button>저장</button>
                </div>
            </form>)}
        </div>)
}