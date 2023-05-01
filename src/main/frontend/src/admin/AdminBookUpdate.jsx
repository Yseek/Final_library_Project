import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Ip from "../Ip";

export default function AdminBookUpdate() {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const { state } = useLocation();

    let link = "/admin/booklist";

    console.log(state.length);
    
    useEffect(() => {
        const encodedTitle = encodeURIComponent(state[0]);
        const encodedWriter = encodeURIComponent(state[1]);
        const encodedPub = encodeURIComponent(state[2]);

        fetch(`${Ip.url}/admin/booklist/update/title=${encodedTitle}&writer=${encodedWriter}&pub=${encodedPub}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        )
        .then((res) => res.json())
        .then((data) => setBookList(data))
        .catch((error) => console.error(error));
    }, [state]);

    function onSubmit(e) {
        e.preventDefault();    
        const bookSeq = document.getElementById("bookSeq").value;
        const bookTitle = document.getElementById("bookTitle").value;
        const bookWriter = document.getElementById("bookWriter").value;
        const bookPub = document.getElementById("bookPub").value;
        const bookStatus = document.getElementById("bookStatus").value;

        console.log(bookSeq, bookTitle, bookWriter, bookPub, bookStatus);
        fetch(`${Ip.url}/admin/booklist/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({bookSeq, bookTitle, bookWriter, bookPub, bookStatus}),
        })
        .then(res => res.text())
        .then((data) => {
            console.log(data);
            alert("수정완료");
            navigate(link);
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

    function deleteBook(e, bookSeq, bookTitle, bookWriter, bookPub){
        e.preventDefault();
        if (window.confirm("삭제하시겠습니까?")) {
			fetch(`${Ip.url}/admin/booklist/delete/${bookSeq}`, {
				method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            })
			.then(() => {
                console.log(bookTitle, bookWriter, bookPub);
                alert("삭제완료");
                window.location.reload();
			})
		}
    }

    return(
    <div>
        ※대출가능한 도서만 삭제가 가능합니다※
        {bookList.map((book, bookSeq) => (
        <form method="post" name="e" key={bookSeq} autoComplete="off">
            <div className="row">
                <div className="row-in">          
                    <h2>책번호</h2><input readOnly type="text" id="bookSeq" name="bookSeq" defaultValue={book.bookSeq}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>제목</h2><input type="text" id="bookTitle" name="bookTitle" defaultValue={book.bookTitle}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>저자</h2><input type="text" id="bookWriter" name="bookWriter" defaultValue={book.bookWriter}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>출판사</h2><input type="text" id="bookPub" name="bookPub" defaultValue={book.bookPub}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>상태</h2><input type="text" id="bookStatus" name="bookStatus" defaultValue={book.bookStatus}/>
                </div>
            </div>
            <div className="row">
                <button onClick={(e) => onSubmit(e)}>저장</button>
                {book.bookStatus === 1 && <button onClick={(e) => deleteBook(e, book.bookSeq, book.bookTitle, book.bookWriter, book.bookPub)}>삭제</button>}
                <button onClick={() => detail(book.bookSeq)}>상세정보수정</button>
            </div>
        </form>))}
        <button onClick={() => navigate(link)}>목록으로</button>
    </div>)
}   