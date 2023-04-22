/* eslint-disable */ // useEffect의 디펜던시에 사용하지 않는 데이터 warning 무시하는 코드
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./css/AdminMemberList.css";
import Ip from "../Ip";

export default function AdminMemberContent() {

    const memberStatusString = {
        1: "일반 회원",
        2: "블랙리스트"
    }

    const location = useLocation();
    const navigate = useNavigate();
    const searchCategoryRef = useRef();
    const searchKeywordRef = useRef();
    const params = useParams();

    const [member, setMember] = useState([]);
    const [page, setPage] = useState([]);
    const [isBookSeq, setIsBookSeq] = useState(false);
    const [isSearchList, setIsSearchList] = useState(false);

    const [bookRentList, setBookRentList] = useState([]);

    /*     useEffect(() => {
            if (!isSearchList) {
                getMemberList();
            } else {
                searchMember();
            }
        }, [params]); */

    // 선택한 회원 정보 가져오기
    useEffect(() => {
        fetch(`${Ip.url}/admin/memberList/member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ "memberSeq": location.state.user }),
        })
            .then(res => res.json())
            .then(member => setMember(member))
            .catch(error => console.log(`선택한 회원 정보 찾기 에러: ${error}`))
    }, [])

    // 대출 현황 목록 가져오기
    useEffect(() => {
        async function getBookRentList() {
            const data = await fetch(`${Ip.url}/admin/memberList/bookRentList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ "memberSeq": location.state.user }),
            })
                .then(res => res.json())
                .then(page => setBookRentList(page))
        }
        getBookRentList();
    }, [])
    console.log("토큰: " + localStorage.getItem("token"));
    console.log(`대출 현황: ${JSON.stringify(bookRentList)}`);

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
            <h3>회원 상세 정보 페이지</h3>
            <table className="adminMemberTable">
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>블랙리스트 여부</th>
                        <td>추가 버튼</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{member.memberSeq}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberEmail}</td>
                        <td>{memberStatusString[member.memberStatus]}</td>
                        <th><button className="adminMemberButton" disabled={member.memberStatus === 2}>추가</button></th>
                    </tr>
                </tbody>
            </table><br />

            <h3>대출 현황</h3>
            <table className="adminMemberTable">
                <thead>
                    <tr>
                        <th>책 번호</th>
                        <th>제목</th>
                        <th>저자</th>
                        <th>출판사</th>
                        <th>책 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(bookRentList.content) && bookRentList.content.map(book => (
                        <tr key={book.bookSeq}>
                            <td>{book.bookSeq}</td>
                            <td>{book.bookTitle}</td>
                            <td>{book.bookWriter}</td>
                            <td>{book.bookPub}</td>
                            <td>{book.bookStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>대출 기록</h3>
            <table className="adminMemberTable">
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
            {pageList.length === 0 && <span>검색 결과가 없습니다</span>}
            {pageList.length !== 0 && <div className="page">
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
                <span><Link to={`/admin/memberList/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`}>&gt;</Link>&nbsp;</span>
                <span><Link to={`/admin/memberList/${page.totalPages}`}>&raquo;</Link></span>
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