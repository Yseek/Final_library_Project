import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminBookUpdate(){

    const { bookTitle } = useParams();
    const { bookWriter } = useParams();
    const { bookPub } = useParams();
    console.log(bookTitle);
    console.log(bookWriter);
    console.log(bookPub);

    const [bookList, setBookList] = useState([]);
    const history = useNavigate();

    const booktitleRef = useRef();
    const bookwriterRef = useRef();
    const bookpubRef = useRef();
    const bookstatusRef = useRef();

    useEffect(()=>{
        fetch(`http://127.0.0.1:8080/admin/booklist/update/title=${encodeURIComponent(bookTitle)}&writer=${encodeURIComponent(bookWriter)}&pub=${encodeURIComponent(bookPub)}`)
        .then(res => res.json())
        .then(data => setBookList(data))
        .then(data => console.log(data))
        .catch(error => console.error(error));
	}, []);
    console.log(bookList);
    function onSubmit(e){
        /*e.preventDefault();          
        const bookHopeTitle = titleRef.current.value;
        const bookHopeWriter = writerRef.current.value;
        const bookHopePub = pubRef.current.value;
        const bookHopeSeq = bookHopeSeqRef.current.value;

        const formdata = new FormData();
        formdata.append('bookHopeTitle', bookHopeTitle);
        formdata.append('bookHopeWriter', bookHopeWriter);
        formdata.append('bookHopePub', bookHopePub);
        formdata.append('bookHopeSeq', bookHopeSeq);

        fetch(`http://127.0.0.1:8080/bookWish/update`, {
            method: 'POST',
            body: formdata
        })
        .then(res => {
            if(res.ok){
                alert("입력 완료");
                history(`/bookWishCheck`)
            }
        });*/
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
                    <input type="hidden" name="bookstatus" ref={bookstatusRef} defaultValue={book.bookstatus}/>
                </div>
            </div>
            <div className="row">
                <button>저장</button>
            </div>
        </form>))}
    </div>
)
}