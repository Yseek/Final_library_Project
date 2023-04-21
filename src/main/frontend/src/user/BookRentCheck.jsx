import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import Ip from "../Ip";

export default function BookRentCheck(){
    
    const params = useParams();

    const [param, setParam] = useState(useParams());
    const [page, setPage] = useState([]);

    useEffect(() => {
        setParam({ params })
    }, [params]);

    useEffect(() => {
        fetch(`${Ip.url}/bookrentcheck?page=${params.page}`)
        .then(res => res.json())
        .then(page => setPage(page))
    },);

    return(
        <div className="bookRentCheck">
            <table className="renttable">
                <thead>
            책 빌린 거 체크 하는 곳
                    <tr>
                        <th>책제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>대출일</th>
                        <th>반납예정일</th>
                        <th>반납일</th>
                        <th>연장가능여부</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(page.content) && page.content.map(member => (
                        <tr key={member.bookRentSeq}>
                            <td>{member.bookRentTitle}</td>
                            <td>{member.bookRentWriter}</td>
                            <td>{member.bookRentPub}</td>
                            <td>{member.bookRentRdate}</td>
                            <td>{member.bookRentDday}</td>
                            <td>{member.bookRentReturn}</td>
                            <td>{member.bookRentCoin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}