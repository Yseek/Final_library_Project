import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminBookList(){
    const params = useParams();
    const [bookList, setBookList] = useState([]);
    const history = useNavigate();

    useEffect(()=>{
		fetch(`http://127.0.0.1:8080/admin/booklist`)
		.then(res => res.json())
		.then(data => setBookList(data))
        .catch(error => console.error(error));
	}, []);

    /*function del(bookHopeSeq, bookHopeStatus) {
        if (bookHopeStatus > 1){
            alert("처리중인경우 취소할 수 없습니다")
        }
		else if (window.confirm("취소하시겠습니까?")) {
			fetch(`http://127.0.0.1:8080/admin/booklist/delete/${bookHopeSeq}`, {
				method: "POST"
			})
			.then(res => {
				if (res.ok) {
					alert("취소완료");
					setParam({param});
                    window.location.reload()
				}
			});
		}
	}*/

    function update(booktitle, bookwriter, bookpub){
        if (window.confirm("수정하시겠습니까?")){
            fetch(`http://127.0.0.1:8080/admin/booklist/update/title=${booktitle}&writer=${bookwriter}&pub=${bookpub}`,{
                method: "GET"
            })
            .then(res => {
                if (res.ok){
                    alert("수정 페이지로 이동합니다");
                    history(`/admin/booklist/update/title=${booktitle}&writer=${bookwriter}&pub=${bookpub}`)
                }
            })
        }
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
                                <button onClick={() => update(book.booktitle, book.bookwriter, book.bookpub)}>수정</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}