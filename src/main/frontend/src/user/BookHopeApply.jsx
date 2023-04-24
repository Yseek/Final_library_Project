import axios from 'axios';
import React, { useState } from 'react';
import "./css/BookHopeApply.css";

function BookHopeApply() {
  const [bookHopeTitle, setBookHopeTitle] = useState('');
  const [bookHopeWriter, setBookHopeWriter] = useState('');
  const [bookHopePub, setBookHopePub] = useState('');
  const [bookHopeWantDay, setBookHopeWantDay] = useState(null);
  const [bookHopeStatus, setBookHopeStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      bookHopeTitle,
      bookHopeWriter,
      bookHopePub,
      bookHopeWantDay,
      bookHopeStatus,
    };
    await axios.post('/user/bookHopeApply', newPost, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });
    setBookHopeTitle('');
    setBookHopeWriter('');
    setBookHopePub('');
    setBookHopeWantDay(null);
    setBookHopeStatus('');
  };

  return (
    <div className='BookApplyDiv'>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='font-bold'>제목</td>
              <td><input type="text" id="bookHopeTitle" value={bookHopeTitle} onChange={e => setBookHopeTitle(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold'>저자</td>
              <td><input type="text" id="bookHopeWriter" value={bookHopeWriter} onChange={e => setBookHopeWriter(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold'>출판사</td>
              <td><input type="text" id="bookHopePub" value={bookHopePub} onChange={e => setBookHopePub(e.target.value)} /></td>
            </tr>
            <tr>
              <td className='font-bold'>신청일</td>
              <td><input type="date" id="bookHopeWantDay" value={bookHopeWantDay} onChange={e => setBookHopeWantDay(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">신청</button>
      </form>
    </div>
  );
}

export default BookHopeApply;
