import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./AdminMemberList.css";
import Ip from "../Ip";

export default function AdminMemberList() {

    const memberStatusString = {
        1: "일반 회원",
        2: "블랙리스트"
    }

    const searchCategoryRef = useRef();
    const searchKeywordRef = useRef();
    const params = useParams();

    const [param, setParam] = useState(useParams()); // 삭제 새로고침용 
    const [page, setPage] = useState([]);
    const [isSearchList, setIsSearchList] = useState(false);
    // const [category, setCategory] = useState(searchCategoryRef);

	// useEffect(()=>{
	// 	setParam({params})
	// },[params]);

    useEffect(() => {  // 페이지 이동용 
        // isSearchList 에 따라 바꿔준다
        if(!isSearchList){
            getMemberList();
        }else{
            searchMember();
        }
        // setParam({ params })
    }, [params]);

    function getMemberList() {
        fetch(`${Ip.url}/admin/memberList?page=${params.page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(res => res.json())
            .then(page => setPage(page))
    }

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:8080/admin/memberList?page=${params.page}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("token"),
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(page => setPage(page))
    // }, [param]);

    function checkSearchList(){
        // page를 1로 만든다. param = 1;
        setParam(1);
        searchMember();
    }

    function searchMember() {
        const category = searchCategoryRef.current.value;
        const keyword = searchKeywordRef.current.value;

        fetch(`${Ip.url}/admin/searchMember?page=${params.page}`, { // params.page -> param
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ category, keyword }),
        })
            .then(res => res.json())
            .then(page => setPage(page))

            setIsSearchList(true);
    }

    // 한 화면에 보여줄 페이지 수 계산
    var pageWidth = 10;
    var pageWidthNumber = Math.floor(page.number / pageWidth); // 현재 페이지목록 index
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
                            {page.number + 1 === res ? <strong>{res}</strong> : res}
                        </Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/admin/memberList/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`}>&gt;</Link></span>
                <span><Link to={`/admin/memberList/${page.totalPages}`}>&raquo;</Link></span>
            </div>
            <div>
                <select ref={searchCategoryRef}>
                    <option>회원번호</option>
                    <option>이메일</option>
                    <option>책번호</option>
                </select>
                <input type="text" ref={searchKeywordRef}></input>
                <button onClick={searchMember}>검색</button>
            </div>
        </center>
    );
}