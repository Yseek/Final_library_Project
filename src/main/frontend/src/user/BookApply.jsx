import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./css/BookApply.css";

function BookApply() {
  const [bookHopeTitle, setBookHopeTitle] = useState('');
  const [bookHopeWriter, setBookHopeWriter] = useState('');
  const [bookHopePub, setBookHopePub] = useState('');
  const [bookHopeWantDay, setBookHopeWantDay] = useState('');
  const [bookHopeStatus, setBookHopeStatus] = useState('');
  const [memberSeq, setMemberSeq] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      bookHopeTitle,
      bookHopeWriter,
      bookHopePub,
      bookHopeWantDay,
      bookHopeStatus,
    };

    await axios.post('/user/bookApply', newPost, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });
    setBookHopeTitle('');
    setBookHopeWriter('');
    setBookHopePub('');
    setBookHopeWantDay('');
    setBookHopeStatus('');
  };

  return (
    <div className='BookApplyDiv'>
      <Link to={`/user/bookHope`} className='BookListA'>신청목록</Link>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
              <td className='BookApplyTd'><input className='BookApplyInput' type="text" id="bookHopeTitle" value={bookHopeTitle} onChange={e => setBookHopeTitle(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold BookApplyTd'>저자</td>
              <td className='BookApplyTd'><input className='BookApplyInput' type="text" id="bookHopeWriter" value={bookHopeWriter} onChange={e => setBookHopeWriter(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold BookApplyTd'>출판사</td>
              <td className='BookApplyTd'><input className='BookApplyInput' type="text" id="bookHopePub" value={bookHopePub} onChange={e => setBookHopePub(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold BookApplyTd'>신청일</td>
              <td className='BookApplyTd'><input className='BookApplyInput' type="date" id="bookHopeWantDay" value={bookHopeWantDay} onChange={e => setBookHopeWantDay(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">신청</button>
      </form>
    </div>
  );

}

export default BookApply;