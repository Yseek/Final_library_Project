import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";


export default function AdminBookList(){
    const params = useParams();
    const [bookList, setBookList] = useState([]);
    const history = useNavigate();

    const location = useLocation();
    const queryString = location.search;

    const query = new URLSearchParams(queryString);
    const bookTitle = query.get('bookTitle');
    const bookWriter = query.get('bookWriter');
    const bookPub = query.get('bookPub');

    useEffect(()=>{
		fetch(`http://127.0.0.1:8080/admin/booklist`,{
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
            },
         })
		.then(res => res.json())
		.then(data => setBookList(data))
        .catch(error => console.error(error));
	}, []);

    function update(bookTitle, bookWriter, bookPub){  
        alert("수정 페이지로 이동합니다");
        const a=[bookTitle,bookWriter,bookPub]
        history(`/admin/booklist/update`,{
            state: a
        });
    }

    return (
        <div className="BookWishDiv">
            <table className="BookWishTable">
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>저자</td>
                        <td>출판사</td>
                        <td>소장권수</td>
                        <td>대출중</td>
                    </tr>
                </thead>
                <tbody>
                {bookList.map((book, index) => (
                          <tr key={index}>
                            <td>{book.bookTitle}</td>
                            <td>{book.bookWriter}</td>
                            <td>{book.bookPub}</td>
                            <td>{book.bookCount}</td>
                            <td>{book.rentCount}</td>
                            <td>
                                <button onClick={() => update(book.bookTitle, book.bookWriter, book.bookPub)}>수정</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}