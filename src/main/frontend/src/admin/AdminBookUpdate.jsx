import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminBookUpdate() {
    const navigate = useNavigate();
    const { state } = useLocation();


    const [bookList, setBookList] = useState([]);

    const booktitleRef = useRef();
    const bookwriterRef = useRef();
    const bookpubRef = useRef();
    const bookstatusRef = useRef();

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/admin/booklist/update/title=${state[0]}&writer=${state[1]}&pub=${state[2]}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        .then((res) => res.json())
        .then((data) => setBookList(data))
        .then(console.log({ state }))
        .catch((error) => console.error(error));
    }, []);

    function onSubmit(e) {
        e.preventDefault();    
        const bookTitle = booktitleRef.current.value;
        const bookWriter = bookwriterRef.current.value;
        const bookPub = bookpubRef.current.value;
        const bookStatus = bookstatusRef.current.value;

        fetch(`http://127.0.0.1:8080/admin/booklist/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(bookTitle, bookWriter, bookPub, bookStatus),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            navigate("/admin/booklist");
        })
        .catch((error) => console.error(error));
    }

    return(
    <div>
        {bookList.map((book, index) => (
        <form method="post" name="e" onSubmit={onSubmit} key={index}>
            <div className="row">
                <div className="row-in">          
                    <h2>제목</h2><input type="text" name="bookTitle" ref={booktitleRef} defaultValue={book.bookTitle}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>저자</h2><input type="text" name="bookWriter" ref={bookwriterRef} defaultValue={book.bookWriter}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>출판사</h2><input type="text" name="bookPub" ref={bookpubRef} defaultValue={book.bookPub}/>
                </div>
            </div>
            <div className="row">
                <div className="row-in">          
                    <h2>상태</h2><input type="text" name="bookStatus" ref={bookstatusRef} defaultValue={book.bookStatus}/>
                </div>
            </div>
            <div className="row">
                <button>저장</button>
            </div>
        </form>))}
    </div>)
}   