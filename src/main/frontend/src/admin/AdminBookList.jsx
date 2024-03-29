import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Ip";
import Pagination from "./Pagination";
import styled from "styled-components";
import './css/AdminBookList.css';

export default function AdminBookList(){
    const [bookList, setBookList] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [isListAll, setIsListAll] = useState(true);
    const [isSearchDetail, setIsSearchDetail] = useState(false);
    const offset = (page - 1) * limit;
    const bookTitleRef = useRef();
    const bookWriterRef = useRef();
    const bookPubRef = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isListAll){
            listAll(); 
        }else if(isSearchDetail){
            searchDetail();
        }else if(!isListAll && !isSearchDetail){
            searchKeyword();
        }
    }, [])

	function listAll(){    
        fetch(`${Ip.url}/admin/booklist`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            })
        .then(res => res.json())
        .then(data => setBookList(data))
        .catch(error => console.error(error));
    };  

    function update(bookTitle, bookWriter, bookPub){  
        alert("수정 페이지로 이동합니다");
        const a = [bookTitle,bookWriter,bookPub]
        navigate(`/admin/booklist/update`,{
            state: a
        });
    }

    function optionCheck(value){
        switch(value){
            case "bookAll" : {setIsListAll(true); setIsSearchDetail(false);} break;
            case "bookSeq": {setIsListAll(false); setIsSearchDetail(false);} break
            case "bookWriter": {setIsListAll(false); setIsSearchDetail(false);} break
            case "bookTitle": {setIsListAll(false); setIsSearchDetail(false);} break
            case "optionSearchDetail": {setIsListAll(false); setIsSearchDetail(true);} break
            default: {setIsListAll(true); setIsSearchDetail(false);}
        }
    }

    let url = `${Ip.url}/admin/booklist`;

    function searchKeyword(e){
        e.preventDefault();
        
        let option = e.target.option.value;
        let keyWord = e.target.keyWord.value;

        console.log(option);
        console.log(keyWord);
        
        if(option === "bookAll"){
            url += `/search/` + keyWord;
        } else {
            url += `/${option}=${keyWord}`;
        }

        if(keyWord === ""){
            alert("검색어를 입력해주세요");
            url = `${Ip.url}/admin/booklist`;
            return;
        }
        console.log(url)

        fetch(url,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then(res => res.json())
        .then(data => setBookList(data))
        .catch(error => console.error(error)); 
    }

    function searchDetail(e){
        e.preventDefault();

        let nullCount = 0;
        let bookTitle = bookTitleRef.current.value || "none";
        let bookWriter = bookWriterRef.current.value || "none";
        let bookPub = bookPubRef.current.value || "none";

        if(bookTitle === "none"){
            nullCount++;
        }
        if(bookWriter === "none"){
            nullCount++;
        }
        if(bookPub === "none"){
            nullCount++;
        }

        if(nullCount>=2){
            alert("통합검색은 두개 이상의 조합으로 검색가능합니다 ex) 제목+저자");
            return;
        }

        url += `/search/detail/title=${bookTitle}&writer=${bookWriter}&pub=${bookPub}`;

        console.log(bookTitle)
        console.log(bookWriter)
        console.log(bookPub)

         fetch(url,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            },
        })
        .then(res => res.json())
        .then(data => setBookList(data))
        .catch(error => console.error(error));  
    }

    return (
    <div className='adminBookListDiv'>
        <h2>도서 목록</h2>
        <label>
            페이지 당 표시할 게시물 수:&nbsp;
            <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
            >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </label>
        <div>
            <table className='adminBookListTable'>
                <thead>
                    <tr>
                        <th className='adminBookListTableTh'>제목</th>
                        <th className='adminBookListTableTh'>저자</th>
                        <th className='adminBookListTableTh'>출판사</th>
                        <th className='adminBookListTableTh'>소장권수</th>
                        <th className='adminBookListTableTh'>대출가능</th>
                        <th className='adminBookListTableTh'>내용가능</th>
                    </tr>
                </thead>
                <tbody>
                {bookList.slice(offset, offset + limit).map((book, index) => (
                        <tr key={index}>
                        <td className='adminBookListTableTd'>{book.bookTitle}</td>
                        <td className='adminBookListTableTd'>{book.bookWriter}</td>
                        <td className='adminBookListTableTd'>{book.bookPub}</td>
                        <td className='adminBookListTableTd'>{book.bookCount}</td>
                        <td className='adminBookListTableTd'>{book.rentCount}</td>
                        <td className='adminBookListTableTd'>
                            <button className='adminBookListUptBtn' onClick={() => update(book.bookTitle, book.bookWriter, book.bookPub)}>수정</button>
                        </td>
                    </tr>
                ))}
                </tbody>         
            </table>
            {isSearchDetail === false && <>
            <div>
                <form name="e" autoComplete="off" onSubmit={searchKeyword}>
                    <select className='adminBookListSelect' name="option" onChange={({ target: { value } }) => optionCheck(value)}>
                        <option value="bookAll">전체</option>
                        <option value="bookSeq">책번호</option>
                        <option value="bookTitle">책제목</option>
                        <option value="bookWriter">저자</option>
                        <option value="optionSearchDetail">상세검색</option>
                    </select>
                    <input  className='adminBookListSearchInput' type="text" name="keyWord" placeholder="검색어를 입력해주세요"></input>
                    <button className='adminBookListSearchBtn'>검색</button>
                </form>
            </div></>}
            {isSearchDetail === true && <>
            <div>
                <form name="e" autoComplete="off" onSubmit={searchDetail}>
                    <span>
                        <input type="text" name="bookTitle" placeholder="제목" ref={bookTitleRef}/>
                    </span>
                    <span>
                        <input type="text" name="bookWriter" placeholder="저자" ref={bookWriterRef}/>
                    </span>
                    <span>
                        <input type="text" name="bookPub" placeholder="출판사" ref={bookPubRef}/>
                    </span>
                    <button>상세검색</button>                  
                </form>
            </div></>}
            <span>
                <Pagination
                    total={bookList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </span>
        </div>
    </div>
    )
}

const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: auto;
    `;