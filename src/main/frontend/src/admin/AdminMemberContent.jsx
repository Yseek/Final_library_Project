/* eslint-disable */ // useEffect의 디펜던시에 사용하지 않는 데이터 warning 무시하는 코드
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./css/AdminMemberList.css";
import Ip from "../Ip";

export default function AdminMemberContent() {

    const bookStatusString = {
        1: "대출가능",
        2: "예약중",
        3: "대출중",
        4: "분실됨",
        5: "분실신고중"
    }

    const location = useLocation();
    const navigate = useNavigate();
    const searchCategoryRef = useRef();
    const searchKeywordRef = useRef();
    const params = useParams();

    const [member, setMember] = useState([]);
    const [page, setPage] = useState([]);
    const [isSearchList, setIsSearchList] = useState(false);

    const [bookRentList, setBookRentList] = useState([]);
    const [memberSeq, setMemberSeq] = useState();

    useEffect(() => {
        if (location.state!==null) {
            setMemberSeq(location.state.user);
        }
    }, [])

    // 선택한 회원 정보 가져오기
    useEffect(() => {
        if (memberSeq !== undefined) {
            fetch(`${Ip.url}/admin/memberList/member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({ "memberSeq": memberSeq }),
            })
                .then(res => res.json())
                .then(member => setMember(member))
                .catch(error => console.log(`선택한 회원 정보 찾기 에러: ${error}`))
        }
    }, [memberSeq])

    // 대출 현황 목록 가져오기
    useEffect(() => {
        if (memberSeq !== undefined) {
            fetch(`${Ip.url}/admin/memberList/bookRentList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({ "memberSeq": memberSeq }),
            })
                .then(res => res.json())
                .then(page => setBookRentList(page))
        }
    }, [memberSeq])

    useEffect(() => {
        if (!isSearchList) {
            getBookRentHistory();
        } else {
            searchBookRent();
        }
    }, [params, memberSeq]);

    // 대출 기록 가져오기
    function getBookRentHistory() {
        if (memberSeq !== undefined) {
            fetch(`${Ip.url}/admin/memberList/bookRentHistory?page=${params.page}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({ "memberSeq": memberSeq }),
            })
                .then(res => res.json())
                .then(page => setPage(page))
        }
    }

    // 검색을 누를 경우
    function SearchInput(e) {
        e.preventDefault();
        setIsSearchList(true);
        navigate('/admin/memberList/content/1');
    }

    // 검색을 누를 때, 검색 목록에서 페이지 이동 시
    function searchBookRent() {
        const category = searchCategoryRef.current.value;
        const keyword = searchKeywordRef.current.value;

        if (memberSeq !== undefined) {
            fetch(`${Ip.url}/admin/searchBookRent?page=${params.page}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
                body: JSON.stringify({ category, keyword, "memberSeq": memberSeq }),
            })
                .then(res => res.json())
                .then(page => setPage(page))
        }
    }

    const onClickBack = () => {
		navigate('/admin/memberList');
	};

    // 한 화면에 보여줄 페이지 수 계산
    var pageWidth = 10;
    var pageWidthNumber = Math.floor(page.number / pageWidth); // 현재 페이지목록 index
    var startPage = 1 + pageWidthNumber * pageWidth;
    var endPage = pageWidthNumber * pageWidth + pageWidth;
    if (endPage > page.totalPages) endPage = page.totalPages;

    const pageList = Array.from({ length: (endPage - startPage + 1) }, (_, index) => startPage + index);

    return (
        <center>
            <h2>회원 상세 정보 페이지</h2><br/>
            <h3>회원 정보</h3>
            <table className="board-list">
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{member.memberSeq}</td>
                        <td>{member.memberName}</td>
                        <td>{member.memberEmail}</td>
                    </tr>
                </tbody>
            </table><br/>

            <h3>대출 현황</h3>
            <table className="board-list">
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
                            <td>{bookStatusString[book.bookStatus]}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br/>

            <h3>대출 기록</h3>
            <table className="board-list">
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
                    {Array.isArray(page.content) && page.content.map(book => (
                        <tr key={book.bookSeq}>
                            <td>{book.bookSeq}</td>
                            <td>{book.bookTitle}</td>
                            <td>{book.bookWriter}</td>
                            <td>{book.bookPub}</td>
                            <td>{bookStatusString[book.bookStatus]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {pageList.length === 0 && isSearchList && <span>검색 결과가 없습니다</span>}
            {pageList.length !== 0 && <div className="paging">
                <span><Link to={`/admin/memberList/content/1`} className="btn-paging first">&laquo;</Link>&nbsp;</span>
                <span><Link to={`/admin/memberList/content/${Math.max(1, page.number + 1 - pageWidth)}`} className="btn-paging prev">&lt;</Link>&nbsp;</span>
                {pageList.map(res => (
                    <span key={res}>
                        <Link to={`/admin/memberList/content/${res}`}>
                            {page.number + 1 === res ? <span className="tp">{res}</span> : res}
                        </Link>
                        {" "}
                    </span>
                ))}
                <span><Link to={`/admin/memberList/content/${Math.min(page.totalPages, page.number + 1 + pageWidth)}`} className="btn-paging next">&gt;</Link>&nbsp;</span>
                <span><Link to={`/admin/memberList/content/${page.totalPages}`} className="btn-paging last">&raquo;</Link></span>
            </div>}<br/>
            <div>
                <form onSubmit={SearchInput}>
                    <select ref={searchCategoryRef}>
                        <option>책번호</option>
                    </select>
                    <input type="text" size={30} ref={searchKeywordRef}></input>
                    <button className="adminMemberButton">검색</button>
                </form>
            </div>
            <div>
                <button className="adminMemberButton" onClick={onClickBack}>목록</button>
            </div>
        </center>
    );
}