import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './css/BookApply.css';
import Ip from '../Ip';

function BookApply() {

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

  const [bookHopeStatus, setBookHopeStatus] = useState('1');
  const [bookHopeTitle, setBookHopeTitle] = useState('');
  const [bookHopeWriter, setBookHopeWriter] = useState('');
  const [bookHopePub, setBookHopePub] = useState('');
  const [bookHopeWantDay, setBookHopeWantDay] = useState(today);
  const [memberSeqq, setMemberSeqq] = useState('');
  const [bookHope, setBookHope] = useState([]);
  const memberSeqRef = useRef(null);

  useEffect(() => {
    fetch(`${Ip.url}/memberInfo`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(res => setMemberSeqq(res.memberSeq));
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const memberSeq = memberSeqRef.current.value;
    const data = {
      bookHopeStatus,
      bookHopeTitle,
      bookHopeTitle,
      bookHopeWriter,
      bookHopePub,
      bookHopeWantDay,
      memberSeq
    };
    axios.post('/user/bookApply', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        setBookHope([...bookHope, response.data]);
        setBookHopeStatus('');
        setBookHopeTitle('');
        setBookHopeWriter('');
        setBookHopePub('');
        setBookHopeWantDay('');
        setMemberSeqq('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='BookApplyDiv'>
      <form onSubmit={handleSubmit}>
        <table className='BookApplyTable'>
          <thead>
            <tr>
              <th className='BookApplyTh'>구분</th>
              <th className='BookApplyTh'>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='font-bold BookApplyTd'>제목</td>
              <td className='BookApplyTd'><input type="text" placeholder="제목" value={bookHopeTitle} onChange={(e) => setBookHopeTitle(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold BookApplylTd'>저자</td>
              <td className='BookApplyTd'><input type="text" placeholder="저자" value={bookHopeWriter} onChange={(e) => setBookHopeWriter(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold BookDetailTd'>출판사</td>
              <td className='BookApplyTd'><input type="text" placeholder="출판사" value={bookHopePub} onChange={(e) => setBookHopePub(e.target.value)} /></td>
            </tr>
            <input type="hidden" value={memberSeqq} ref={memberSeqRef} />
          </tbody>
        </table>
        {/* 오늘날짜로 신청 */}
        <input className='hidden-col' id="date" type="date" value={bookHopeWantDay} onChange={(e) => setBookHopeWantDay(e.target.value)} />
        <button type="submit">신청</button>
      </form>
    </div>
  );
}

export default BookApply;