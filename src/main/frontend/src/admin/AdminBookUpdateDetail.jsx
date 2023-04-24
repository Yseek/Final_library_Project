import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Ip from "../Ip";

export default function AdminBookUpdateDetail(){
    const navigate = useNavigate();
    const { state } = useLocation();

    const bookSeq = encodeURIComponent(state)
    const [bookData, setbookData] = useState([]);

    useEffect(() => {
        fetch(`${Ip.url}/admin/booklist/id=${bookSeq}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
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

        const bookSeq = e.target.bookSeq.value;
        const bookTitle = e.target.bookTitle.value;
        const bookWriter = e.target.bookWriter.value;
        const bookPub = e.target.bookPub.value;
        const bookStatus = e.target.bookStatus.value;
        const bookStory = e.target.bookStory.value;
        const bookImgName = e.target.bookImgName.value;
        const bookImgPath = e.target.bookImgPath.value;
        const bookImgOgn = e.target.bookImgOgn.value;

        console.log(bookSeq, bookTitle, bookWriter, bookPub, bookStory, bookStatus, bookImgName, bookImgPath, bookImgOgn);
        fetch(`${Ip.url}/admin/booklist/update/detail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({bookSeq, bookTitle, bookWriter, bookPub, bookStory, bookStatus, bookImgName, bookImgPath, bookImgOgn}),
        })
        .then(res => res.text())
        .then((data) => {
            console.log(data);
            alert("수정완료");
            const a = [bookTitle,bookWriter,bookPub]
            navigate(`/admin/booklist/update`, {
                state: a
            })
        })
        .catch((error) => console.error(error))
    }
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
                        <h2>이미지명</h2><input type="text" name="bookImgName"  defaultValue={bookData.bookImgName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>이미지경로</h2><input type="text" name="bookImgPath"  defaultValue={bookData.bookImgPath}/>
                    </div>
                </div>
                <div className="row">
                    <div className="row-in">          
                        <h2>이미지원본명</h2><input type="text" name="bookImgOgn"  defaultValue={bookData.bookImgOgn}/>
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