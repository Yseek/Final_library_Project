import { useEffect, useState } from "react";
import Ip from "../Ip";
import './css/AdminBookHope.css';
import Pagination from "./Pagination";

export default function AdminBookLost() {

    const [bookList, setBookList] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(() => {
        fetch(`${Ip.url}/admin/bookLost`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + sessionStorage.getItem("token"),
      		},
		    })
            .then(res => res.json())
            .then(data => {
                setBookList(data);
                setLimit(5); //한페이지당 갯수
            })
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
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
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
            fetch(`${Ip.url}/admin/bookLost/return/${bookSeq}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
              })
                .then(res => {
					if (res.ok) {
						alert("반환처리 되었습니다.");
                        window.location.reload();
					}
				});
        }
    }

    return (
        <div className="AdminBookHope">
            <h2>도서 분실신고 처리 페이지</h2>
            <table className="AdminBookHopeTable">
                <thead>
                    <tr>
                        <th className="AdminBookHopeTableTh">책제목</th>
                        <th className="AdminBookHopeTableTh">저자</th>
                        <th className="AdminBookHopeTableTh">출판사</th>
                        <th className="AdminBookHopeTableTh">분실상태</th>
                        <th className="AdminBookHopeTableTh">회원번호</th>
                        <th className="AdminBookHopeTableTh">대여자</th>
                        <th className="AdminBookHopeTableTh">분실</th>
                        <th className="AdminBookHopeTableTh">반환</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.slice(offset, offset + limit).map((book, index) => (
                        <tr key={index}>
                            <td className="AdminBookHopeTableTd">{book.bookTitle}</td>
                            <td className="AdminBookHopeTableTd">{book.bookWriter}</td>
                            <td className="AdminBookHopeTableTd">{book.bookPub}</td>
                            <td className="AdminBookHopeTableTd">
                                {book.bookStatus === 4 && '분실됨'}
                                {book.bookStatus === 5 && '분실신고됨'}
                            </td>
                            <td className="AdminBookHopeTableTd">{book.member.memberSeq}</td>
                            <td className="AdminBookHopeTableTd">{book.member.memberName}</td>
                            <td className="AdminBookHopeTableTd"><button className="bookHopeButton bookHopeBtCc" disabled={book.bookStatus !== 5} onClick={() => lost(book.bookSeq)} >분실</button></td>
                            <td className="AdminBookHopeTableTd"><button className="bookHopeButton"  onClick={() => returnBook(book.bookSeq)}>반환</button></td>
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