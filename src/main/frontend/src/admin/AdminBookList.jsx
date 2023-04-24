import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";
import Pagination from "./Pagination";

export default function AdminBookList(){
    const [bookList, setBookList] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
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
        const a = [bookTitle,bookWriter,bookPub]
        history(`/admin/booklist/update`,{
            state: a
        });
    }

    return (
    <>
        <label>
            페이지 당 표시할 게시물 수:&nbsp;
            <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
            >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </label>
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
                {bookList.slice(offset, offset + limit).map((book, index) => (
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
            <span>
                <Pagination
                    total={bookList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </span>
        </div>
    </>
    )
}