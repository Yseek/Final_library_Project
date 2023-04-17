import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminMemberList.css";

export default function AdminMemberList(){

    const memberStatusString = {
        1 : "일반 회원",
        2 : "블랙리스트"
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

    const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

    var pageWidth = 10;
    // var pageWidthNumber = (page.pageNumber)
    console.log(page.number);
    // console.log(page.pageable.pageNumber);

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
                <span><Link to={`/adminMemberList/1`}>&lt;</Link>&nbsp;</span>
                {pageList.map(res => (
                    <span key={res}>
                        <Link to={`/adminMemberList/${res}`}>{res}</Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/adminMemberList/${page.totalPages}`}>&gt;</Link></span>
            </div>
        </center>
    );
}