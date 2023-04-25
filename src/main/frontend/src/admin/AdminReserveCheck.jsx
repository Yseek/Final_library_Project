import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";
import Pagination from "./Pagination";

export default function AdminReserveCheck(){
    const [reservelist, setReservelist] = useState([])
    const [isListAll, setisListAll] = useState(true)
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const navigate = useNavigate();

    useEffect(() => {
        if(isListAll){
            listAll();
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
        .then(data => setReservelist(data))
        .catch(error => console.error(error));
    };

    return(
    <>
        <label>
            표시할 예약도서 수:&nbsp;
            <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
            >
            <option value="5">5</option>
            <option value="5">10</option>
            <option value="5">50</option>
            <option value="5">100</option>
            </select>
        </label>
        <div>
            <table>
                <thead>
                    <tr>
                        <td>예약번호</td>
                        <td>예약자</td>
                        <td>책번호</td>
                        <td>제목</td>
                        <td>예약일</td>
                    </tr>
                </thead>
                <tbody>
                {reservelist.slice(offset, offset + limit).map((reserv, index) => (
                        <tr key={index}>
                        <td>{reserv.bookReserveSeq}</td>
                        <td>{reserv.bookWriter}</td>
                        <td>{reserv.bookPub}</td>
                        <td>{reserv.bookCount}</td>
                        <td>{reserv.rentCount}</td>
                    </tr>
                ))}
                </tbody> 
            </table>
        </div>
    </>
    )
}