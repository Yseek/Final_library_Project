import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './css/AdminBookHope.css';

export default function AdminBookHope() {
    const params = useParams();

    const [param, setParam] = useState(useParams()); // 삭제 새로고침용 
    const [page, setPage] = useState([]);

    useEffect(() => {  // 페이지 이동용 
        setParam({ params })
    }, [params]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/admin/bookHope?page=${params.page}1&size=10`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer " + localStorage.getItem("token"),
      		},
		    })
            .then(res => res.json())
            .then(page => setPage(page))
    }, [param]);

    return (
        <div className="AdminBookHope">
            <h2>희망 책 신청 승인페이지</h2>
            <table className="AdminBookHopeTable">
                <thead className="AdminBookHopeTableHead">
                    <tr>
                        <th>책제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>신청날짜</th>
                        <th>신청상태</th>
                        <th>신청자</th>
                        <th>승인</th>
                        <th>거절</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(page.content) && page.content.map(res => (
                        <tr key={res.bookHopeSeq}>
                            <td>{res.bookHopeTitle}</td>
                            <td>{res.bookHopeWriter}</td>
                            <td>{res.bookHopePub}</td>
                            <td>{res.bookHopeWantDay}</td>
                            <td>
                                {res.bookHopeStatus === 1 && '신청중'}
                                {res.bookHopeStatus === 2 && '처리중'}
                                {res.bookHopeStatus === 3 && '소장중'}
                                {res.bookHopeStatus === 4 && '취소됨'}
                            </td>
                            <td>{res.member.memberName}</td>
                            <td>승인</td>
                            <td>거절</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}