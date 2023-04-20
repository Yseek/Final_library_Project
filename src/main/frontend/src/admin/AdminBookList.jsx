import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";


export default function AdminBookList(){
    const [bookList, setBookList] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
		fetch(`${Ip.url}/admin/booklist`,{
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