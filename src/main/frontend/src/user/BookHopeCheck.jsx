import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Ip from "../Ip";
import './css/BookHopeCheck.css';

export default function BookHopeCheck() {

  const params = useParams();

  const [param, setParam] = useState(useParams());
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);

  useEffect(() => {
    setParam({ params })
  }, [params]);

  useEffect(() => {
    fetch(`${Ip.url}/user/bookHope?page=${params.page}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(data => setData(data.content))
  }, [param]);

  useEffect(() => {
    fetch(`${Ip.url}/user/bookHope?page=${params.page}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(page => setPage(page))
  }, [param]);

  const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

  function del(bookHopeSeq) {
    if (window.confirm("취소하시겠습니까?")) {
      fetch(`${Ip.url}/user/bookHope/delete/${bookHopeSeq}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(res => {
          if (res.ok) {
            alert("삭제완료");
            setParam({ param });
          }
        });
    }
  }

  const bookHopeStat = {
		1: "신청중",
		2: "입고완료",
		3: "취소됨",
    4: "거부됨"
	}

  return (
    <div className="BookHopeDiv">
      <table className="BookHopeTable">
        <thead>
          <tr>
            <th className='BookHopeTh'>책제목</th>
            <th className='BookHopeTh'>저자</th>
            <th className='BookHopeTh'>출판사</th>
            <th className='BookHopeTh'>신청날짜</th>
            <th className='BookHopeTh'>신청상태</th>
            <th className='BookHopeTh'>신청취소</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map(res => (
            <tr key={res.bookHopeSeq}>
              <td className='BookHopeTd'>{res.bookHopeTitle}</td>
              <td className='BookHopeTd'>{res.bookHopeWriter}</td>
              <td className='BookHopeTd'>{res.bookHopePub}</td>
              <td className='BookHopeTd'>{res.bookHopeWantDay}</td>
              <td className='BookHopeTd'>{bookHopeStat[res.bookHopeStatus]}</td>
              <td className='BookHopeTd'><button onClick={() => del(res.bookHopeSeq)}>신청취소</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page">
        {pageList.map(res => (
          <span key={res}>
            <Link to={`user/bookHope/${res}`}>{res}</Link>
            {" "}
          </span>
        ))}
      </div>
    </div>
  );
}