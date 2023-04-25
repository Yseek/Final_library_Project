import { useEffect, useState } from "react";
import Ip from "../Ip";
import './css/AdminBookHope.css';
import Pagination from "./Pagination";
import { useNavigate } from "react-router";

export default function AdminBookLost() {

    const [bookList, setBookList] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const history = useNavigate();

    useEffect(() => {
        fetch(`${Ip.url}/admin/bookLost`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		    })
            .then(res => res.json())
            .then(data => setBookList(data))
            .then(setLimit(5)) //한페이지당 갯수
            .catch(error => console.error(error));
    }, [page]);

    function lost(bookSeq){  
        if(window.confirm(JSON.stringify({bookSeq})+" 책 분실을 확인하였습니까?")){
            const updatedBookList = bookList.map(book => {
                if (book.bookSeq === bookSeq) {
                    book.bookStatus = 4; // 분실됨
                }
                return book;
            });
            setBookList(updatedBookList);
            fetch(`${Ip.url}/admin/bookLost/lost/${bookSeq}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
              })
                .then(res => {
					if (res.ok) {
						alert("분실처리 되었습니다.");
					}
				});
        }
    }
    function returnBook(bookSeq){  
        if(window.confirm(JSON.stringify({bookSeq})+"책 반환을 확인하였습니까?")){
            const updatedBookList = bookList.map(book => {
                if (book.bookSeq === bookSeq) {
                    book.bookStatus = 1; // 대출가능
                }
                return book;
            });
            setBookList(updatedBookList);
            fetch(`${Ip.url}/admin/bookLost/return/${bookSeq}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
              })
                .then(res => {
					if (res.ok) {
						alert("반환처리 되었습니다.");
					}
				});
        }
    }

    return (
        <div className="AdminBookHope">
            <h2>도서 분실신고 처리 페이지</h2>
            <table className="AdminBookHopeTable">
                <thead className="AdminBookHopeTableHead">
                    <tr>
                        <th>책제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>분실상태</th>
                        <th>회원번호</th>
                        <th>대여자</th>
                        <th>분실</th>
                        <th>반환</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.slice(offset, offset + limit).map((book, index) => (
                        <tr key={index}>
                            <td>{book.bookTitle}</td>
                            <td>{book.bookWriter}</td>
                            <td>{book.bookPub}</td>
                            <td>
                                {book.bookStatus === 4 && '분실됨'}
                                {book.bookStatus === 5 && '분실신고됨'}
                            </td>
                            <td>{book.member.memberSeq}</td>
                            <td>{book.member.memberName}</td>
                            <td><button className="bookHopeButton bookHopeBtCc" disabled={book.bookStatus !== 5} onClick={() => lost(book.bookSeq)} >분실</button></td>
                            <td><button className="bookHopeButton"  onClick={() => returnBook(book.bookSeq)}>반환</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span>
                <Pagination
                    total={bookList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </span>
        </div>
    );
}