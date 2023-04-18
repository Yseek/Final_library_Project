import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './css/MessageCheck.css';

export default function MessageCheck() {

  const params = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/user/messageCheck?page=${params.page}`)
      .then(res => res.json())
      .then(data => { setData(data.content) })
  }, [params]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/user/messageCheck?page=${params.page}`)
      .then(res => res.json())
      .then(page => { setPage(page) })
  }, [params]);

  function deleteMessage(messageSeq) {
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`http://127.0.0.1:8080/user/messageCheck/${messageSeq}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) {
            window.location.replace("/user/messageCheck");
          }
        });
    }
  }
  //const [visible, setVisible] = useState(false); // 내용접기, 펼치기

  const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

  const { messageSeq } = useParams();
  const navi = useNavigate();
	const [info, setInfo] = useState({});

  function toChangPwd(e){
		e.preventDefault();
		navi(`/user/messageCheck`+messageSeq, {state : info.messageContet})
	}

  return (
    <div className='MsgDiv'>
      <table className='MsgTable'>
        <thead>
          <tr>
            <th className='MsgTh'>번호</th>
            <th className='MsgTh'>날짜</th>
            <th className='MsgTh'>내용</th>
            <th className='MsgTh'>상세 보기</th>
            <th className='MsgTh'>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map(res => (
            <tr key={res.messageSeq}>
              <td className='MsgTd'>{res.messageSeq}</td>
              <td className='MsgTd'>{res.messageDate}</td>
              {/* <td className='MsgTd'><button className='MsgBtn' onClick={() => { setVisible(!visible);}}>{visible ? "접기" : "내용보기"}</button></td> */}
              <td className='MsgTd'>{res.messageContent}</td>
              <td className='BookListTd'><Link to={`/user/messageDetail/${res.messageSeq}`} className='BookListA'>보기</Link></td>
              <td className='MsgTd'><button className='MsgBtn' onClick={() => deleteMessage(res.messageSeq)}>삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="page">
        {pageList.map(res => (
          <span key={res}>
            <Link to={`/user/MessageCheck/${res}`}>{res}</Link>
          </span>
        ))}
      </div>
    </div>
  );
}