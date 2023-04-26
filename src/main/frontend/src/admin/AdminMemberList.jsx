/* eslint-disable */ // useEffect의 디펜던시에 사용하지 않는 데이터 warning 무시하는 코드
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./css/AdminMemberList.css";
import Ip from "../Ip";

export default function AdminMemberList() {

    const navigate = useNavigate();
    const searchCategoryRef = useRef();
    const searchKeywordRef = useRef();
    const params = useParams();

    const [page, setPage] = useState([]);
    const [isBookSeq, setIsBookSeq] = useState(false);
    const [isSearchList, setIsSearchList] = useState(false);

    useEffect(() => {
        if (!isSearchList) {
            getMemberList();
        } else {
            searchMember();
        }
    }, [params]);

    // 모든 회원 목록 가져오기
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

    // 검색을 누를 경우
    function SearchInput(e) {
        e.preventDefault();
        setIsSearchList(true);
        navigate('/admin/memberList/1');
    }

    // 검색을 누를 때, 검색 목록에서 페이지 이동 시
    function searchMember() {
        const category = searchCategoryRef.current.value;
        const keyword = searchKeywordRef.current.value;

        fetch(`${Ip.url}/admin/searchMember?page=${params.page}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ category, keyword }),
        })
            .then(res => res.json())
            .then(page => setPage(page))
    }

    function checkSearchCategory() {
        const category = searchCategoryRef.current.value;

        switch (category) {
            case "회원번호": setIsBookSeq(false); break;
            case "이메일": setIsBookSeq(false); break
            case "책번호": setIsBookSeq(true); break
            default: setIsBookSeq(false);
        }
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
            <h3>회원 목록 페이지</h3>
            <table class="board-list">
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(page.content) && page.content.map(member => (
                        <tr key={member.memberSeq}>
                            <td><Link to={`/admin/memberList/content`}  state={{ user: member.memberSeq }}>{member.memberSeq}</Link></td>
                            <td>{member.memberName}</td>
                            <td>{member.memberEmail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {pageList.length === 0 && <span>검색 결과가 없습니다</span>}
            {pageList.length !== 0 && <div className="paging">
                <span><Link to={`/admin/memberList/1`}  className="btn-paging first">&laquo;</Link></span>&nbsp;
                <span><Link to={`/admin/memberList/${Math.max(1, page.number + 1 - pageWidth)}`} className="btn-paging prev">&lt;</Link></span>&nbsp;
                {pageList.map(res => (
                    <span key={res}>
                        <Link to={`/admin/memberList/${res}`}>
                            {page.number + 1 === res ? <span className="tp">{res}</span> : res}
                        </Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/admin/memberList/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`} className="btn-paging next">&gt;</Link></span>&nbsp;&nbsp;
                <span><Link to={`/admin/memberList/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
            </div>}
            <div>
                <form onSubmit={SearchInput}>
                    <select onChange={checkSearchCategory} ref={searchCategoryRef}>
                        <option>회원번호</option>
                        <option>이메일</option>
                        <option>책번호</option>
                    </select>
                    <input type="text" placeholder={isBookSeq ? "최근에 이 책을 빌린 회원 목록 검색" : ""} size={30} ref={searchKeywordRef}></input>
                    <button className="adminMemberButton">검색</button>
                </form>
            </div>
        </center>
    );
}