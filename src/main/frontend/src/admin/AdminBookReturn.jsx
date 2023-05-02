import { useEffect, useState } from "react";
import Ip from "../Ip";
import Pagination from "./Pagination";
import moment from 'moment';
import styled from "styled-components";
import './css/AdminBookReturn.css';

export default function AdminBookReturn() {
    const [rentList, setrentList] = useState([])
    const [isListAll, setisListAll] = useState(true)
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(() => {
        if (isListAll) {
            listAll();
        } else if (!isListAll) {
            searchKeyword();
        }
    }, [])

    function listAll() {
        fetch(`${Ip.url}/admin/return`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
            },
        })
            .then(res => res.json())
            .then(data => setrentList(data))
            .catch(error => console.error(error));
    };

    function optionCheck(value) {
        switch (value) {
            case "bookReserveSeq": setisListAll(false); break;
            case "bookSeq": setisListAll(false); break;
            default: { setisListAll(true); setLimit(Number(10)); }
        }
    }

    function searchKeyword(e) {
        e.preventDefault();

        let option = e.target.option.value;
        if (option.length < 1) {
            alert("검색어를 입력해주세요")
            return;
        }
        let keyWord = e.target.keyWord.value;
        if (keyWord.length < 1) {
            alert("검색어를 입력해주세요")
            return;
        }
        let url = `${Ip.url}/admin/return/search/${option}=${keyWord}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token"),
            },
        })
            .then(res => res.json())
            .then(data => setrentList(data))
            .catch(error => console.log(error));
    }

    function returnBook(e, bookRentSeq, bookSeq) {
        e.preventDefault();

        if (window.confirm(`${bookSeq}번 도서를 반납처리합니다.`)) {
            fetch(`${Ip.url}/admin/return/${bookRentSeq}&${bookSeq}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            })
                .then(() => {
                    alert("처리가 완료되었습니다.");
                    window.location.reload();
                })
        }
    }

    return (
        <div className='adminBookReturnDiv'>
            <h2>도서반납 처리</h2>
            <table className='adminBookReturnTable'>
                <thead>
                    <tr>
                        <th className='adminBookReturnTableTh'>대출번호</th>
                        <th className='adminBookReturnTableTh'>대출자</th>
                        <th className='adminBookReturnTableTh'>책번호</th>
                        <th className='adminBookReturnTableTh'>책제목</th>
                        <th className='adminBookReturnTableTh'>대출일</th>
                        <th className='adminBookReturnTableTh'>반납기한</th>
                        <th className='adminBookReturnTableTh'>반납처리</th>
                    </tr>
                </thead>
                <tbody>
                    {rentList.slice(offset, offset + limit).map((rnt, index) => (
                        <tr key={index}>
                            <td className='adminBookReturnTableTd'>{rnt.bookRentSeq}</td>
                            <td className='adminBookReturnTableTd'>{rnt.memberName}</td>
                            <td className='adminBookReturnTableTd'>{rnt.bookSeq}</td>
                            <td className='adminBookReturnTableTd'>{rnt.bookTitle}</td>
                            <td className='adminBookReturnTableTd'>{moment(rnt.bookRentRDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td className='adminBookReturnTableTd'>{moment(rnt.bookRentDDay).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td className='adminBookReturnTableTd'>
                                <button className='adminBookReturnBtn' onClick={(e) => returnBook(e, rnt.bookRentSeq, rnt.bookSeq)}>반납</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='adminBookRentSearchDiv'>
                <form name="e" autoComplete="off" onSubmit={searchKeyword}>
                    <select className='adminBookRentSearchSelect' name="option" onChange={({ target: { value } }) => optionCheck(value)}>
                        <option value="bookRentSeq">대출번호</option>
                        <option value="bookSeq">책번호</option>
                    </select>
                    <input className='adminBookRentSearchInput' type="text" name="keyWord" placeholder="검색어를 입력해주세요"></input>
                    <button className='adminBookReturnSearchBtn'>검색</button>
                </form>
            </div>
            <span>
                <Pagination
                    total={rentList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </span>
        </div>
    )
}

const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: auto;
    `;