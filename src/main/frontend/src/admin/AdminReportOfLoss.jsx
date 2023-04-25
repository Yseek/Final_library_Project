import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Ip from "../Ip";
import './css/AdminBookHope.css';

export default function AdminReportOfLoss() {

    const params = useParams();


    const [param, setParam] = useState(useParams()); // 삭제 새로고침용 
    const [page, setPage] = useState([]);
    const history = useNavigate();

    useEffect(() => {  // 페이지 이동용 
        setParam({ params })
    }, [params]);

    useEffect(() => {
        fetch(`${Ip.url}/admin/reportOfLoss?page=${params.page}&size=10`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		    })
            .then(res => res.json())
            .then(page => setPage(page))
    }, [param]);
    console.log("뾰롱"+JSON.stringify(page))

    const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

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
                        <th>대여자</th>
                        <th>분실</th>
                        <th>반환</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(page.content) && page.content.map(res => (
                        <tr key={res.bookSeq}>
                            <td>{res.bookTitle}</td>
                            <td>{res.bookWriter}</td>
                            <td>{res.bookPub}</td>
                            <td>
                                {res.bookStatus === 4 && '분실됨'}
                                {res.bookStatus === 5 && '분실신고됨'}
                            </td>
                            <td></td>
                            <td><button className="bookHopeButton" disabled={res.bookStatus !== 5} >분실</button></td>
                            <td><button className="bookHopeButton bookHopeBtCc">반환</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="page">
                <span><Link to={`/admin/reportOfLoss/1`}>&lt;</Link>&nbsp;</span>
                {pageList.map(res => (
                    <span key={res}>
                        <Link to={`/admin/reportOfLoss/${res}`}>{res}</Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/admin/reportOfLoss/${page.totalPages}`}>&gt;</Link></span>
            </div>
        </div>
    );
}