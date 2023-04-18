import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminMemberList.css";

export default function AdminMemberList() {

    const memberStatusString = {
        1: "일반 회원",
        2: "블랙리스트"
    }

    const params = useParams();

    const [param, setParam] = useState(useParams()); // 삭제 새로고침용 
    const [page, setPage] = useState([]);

    useEffect(() => {  // 페이지 이동용 
        setParam({ params })
    }, [params]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/admin/memberList?page=${params.page}`)
            .then(res => res.json())
            .then(page => setPage(page))
    }, [param]);

    // 한 화면에 보여줄 페이지 수 계산
    var pageWidth = 10;
    var pageWidthNumber = Math.floor(page.number / pageWidth); // 현재 pageWidth index
    var startPage = 1 + pageWidthNumber * pageWidth;
    var endPage = pageWidthNumber * pageWidth + pageWidth;
    if (endPage > page.totalPages) endPage = page.totalPages;

    const pageList = Array.from({ length: (endPage - startPage + 1) }, (_, index) => startPage + index);

    return (
        <center>
            <table>
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>블랙리스트 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(page.content) && page.content.map(member => (
                        <tr key={member.memberSeq}>
                            <td>{member.memberSeq}</td>
                            <td>{member.memberName}</td>
                            <td>{member.memberEmail}</td>
                            <td>{memberStatusString[member.memberStatus]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="page">
                <span><Link to={`/admin/memberList/1`}>&laquo;</Link>&nbsp;</span>
                <span><Link to={`/admin/memberList/${Math.max(1, page.number + 1 - pageWidth)}`}>&lt;</Link>&nbsp;</span>
                {pageList.map(res => (
                    <span key={res}>
                        <Link to={`/admin/memberList/${res}`}>
                            {page.number+1 === res ? <strong>{res}</strong> : res}
                        </Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/admin/memberList/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`}>&gt;</Link></span>
                <span><Link to={`/admin/memberList/${page.totalPages}`}>&raquo;</Link></span>
            </div>
        </center>
    );
}