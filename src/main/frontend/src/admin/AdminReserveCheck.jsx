import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";
import Pagination from "./Pagination";

export default function AdminReserveCheck(){
    const [reserveList, setreserveList] = useState([])
    const [isListAll, setisListAll] = useState(true)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const navigate = useNavigate();

    let searchFlag = true;
    
    useEffect(() => {
        if(isListAll){
            listAll();
        }else if(!isListAll){
            searchKeyword();
        }
    }, [])

    function listAll(){
        fetch(`${Ip.url}/admin/reserved`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => res.json())
        .then(data => setreserveList(data))
        .catch(error => console.error(error));
    };

    function optionCheck(value){
        switch(value){
            case "bookReserveSeq": setisListAll(false); break;
            case "bookSeq": setisListAll(false); break;
        }
    }

    function searchKeyword(e){
        e.preventDefault();

        let option = e.target.option.value;
        if(option.length<1){
            alert("검색어를 입력해주세요")
            return;
        }
        let keyWord = e.target.keyWord.value;
        if(keyWord.length<1){
            alert("검색어를 입력해주세요")
            return;
        }
        let url = `${Ip.url}/admin/reserved/search/${option}=${keyWord}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => res.json())
        .then(data => setreserveList(data))
        .catch(error => console.log(error));
    }

    function reserveBook(e, bookReserveSeq, bookSeq, memberSeq){
        e.preventDefault();
        if(window.confirm(`${bookSeq}번 도서를 대출처리합니다.`)){
            fetch(`${Ip.url}/admin/reserved/${bookReserveSeq}&${bookSeq}&${memberSeq}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then(() => {
                alert("처리가 완료되었습니다.");
                window.location.reload();
            })
        }
    }

    function reserveCancel(e, bookReserveSeq, bookSeq){
        e.preventDefault();
        if(window.confirm(`${bookSeq}번 도서 예약을 취소처리합니다.`)){
            fetch(`${Ip.url}/admin/reserved/cancel=${bookReserveSeq}&${bookSeq}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }, 
            })
            .then(() => {
                alert("처리가 완료되었습니다.");
                window.location.reload();
            })
        }
    }

    return(
    <>
        <div>
            <table>
                <thead>
                    <tr>
                        <td>예약번호</td>
                        <td>예약자</td>
                        <td>책번호</td>
                        <td>제목</td>
                        <td>예약일</td>
                        <td>예약상태</td>
                    </tr>
                </thead>
                <tbody>
                {reserveList.slice(offset, offset + limit).map((rsv, index) => (
                        <tr key={index}>
                        <td>{rsv.bookReserveSeq}</td>
                        <td>{rsv.memberName}</td>
                        <td>{rsv.bookSeq}</td>
                        <td>{rsv.bookTitle}</td>
                        <td>{rsv.bookReservedDay}</td>
                        <td>
                            {rsv.bookReserveStatus === 1 && '예약완료'}
                            {rsv.bookReserveStatus === 2 && '대출완료'}
                            {rsv.bookReserveStatus === 3 && '예약취소(사용자취소)'}
                            {rsv.bookReserveStatus === 4 && '예약취소(관리자취소)'}
                        </td>
                        <td>
                            <button onClick={(e) => reserveBook(e, rsv.bookReserveSeq, rsv.bookSeq, rsv.memberSeq)}>대출처리</button>
                        </td>
                        <td>
                            <button onClick={(e) => reserveCancel(e, rsv.bookReserveSeq, rsv.bookSeq)}>예약취소</button>
                        </td>
                    </tr>
                ))}
                </tbody>      
            </table>
            <div>
                <form name="e" autoComplete="off" onSubmit={searchKeyword}>
                    <select name="option" onChange={({ target: { value } }) => optionCheck(value)}>
                        <option value="bookReserveSeq">예약번호</option>
                        <option value="bookSeq">책번호</option>
                    </select>
                    <input type="text" name="keyWord" placeholder=""></input>
                    <button>검색</button>
                </form>
            </div>
            <span>
                <Pagination
                    total={reserveList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </span>
        </div>
    </>
    )
}