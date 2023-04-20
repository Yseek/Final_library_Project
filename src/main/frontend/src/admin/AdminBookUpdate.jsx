import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminBookUpdate() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const encodedTitle = encodeURIComponent(state[0]);
    const encodedWriter = encodeURIComponent(state[1]);
    const encodedPub = encodeURIComponent(state[2]);

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/admin/booklist/update/title=${encodedTitle}&writer=${encodedWriter}&pub=${encodedPub}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        .then((res) => res.json())
        .then((data) => setBookList(data))
        .catch((error) => console.error(error));
    }, []);

    function onSubmit(e) {
        e.preventDefault();    
        const bookSeq = e.target.bookSeq.value;
        const bookTitle = e.target.bookTitle.value;
        const bookWriter = e.target.bookWriter.value;
        const bookPub = e.target.bookPub.value;
        const bookStatus = e.target.bookStatus.value;

        console.log(bookSeq, bookTitle, bookWriter, bookPub, bookStatus);
        fetch(`http://127.0.0.1:8080/admin/booklist/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({bookSeq, bookTitle, bookWriter, bookPub, bookStatus}),
        })
        .then(res => res.text())
        .then((data) => {
            console.log(data);
            alert("수정완료");
            navigate("/admin/booklist");
        })
        .catch((error) => console.error(error));
    }

    function detail(bookSeq){  
        alert("상세 페이지로 이동합니다");
        //const a = [bookSeq]
        navigate(`/admin/booklist/update/detail`,{
            state: bookSeq
        });
    }

    return(
    <div>
        {bookList.map((book, bookSeq) => (
        <form method="post" name="e" onSubmit={onSubmit} key={bookSeq}>
            <div className="row">
                <div className="row-in">          
                    <h2>책번호</h2><input readOnly type="text" name="bookSeq" defaultValue={book.bookSeq}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>제목</h2><input type="text" name="bookTitle" defaultValue={book.bookTitle}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>저자</h2><input type="text" name="bookWriter" defaultValue={book.bookWriter}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>출판사</h2><input type="text" name="bookPub"  defaultValue={book.bookPub}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>상태</h2><input type="text" name="bookStatus"  defaultValue={book.bookStatus}/>
                </div>
            </div>
            <div className="row">
                <button>저장</button>
                <button onClick={() => detail(book.bookSeq)}>상세정보수정</button>
            </div>
        </form>))}
    </div>)
}   