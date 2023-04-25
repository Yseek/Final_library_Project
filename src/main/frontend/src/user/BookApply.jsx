import axios from 'axios';
import React, { useState } from 'react';

function BookApply() {
  const [bookHopeTitle, setBookHopeTitle] = useState('');
  const [bookHopeWriter, setBookHopeWriter] = useState('');
  const [bookHopePub, setBookHopePub] = useState('');
  const [bookHopeWantDay, setBookHopeWantDay] = useState('');
  const [memberSeq, setMemberSeq] = useState('');
  const [bookHope, setBookHope] = useState([]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { bookHopeTitle, bookHopeTitle, bookHopeWriter, bookHopePub, bookHopeWantDay,memberSeq };
    axios.post('/user/bookApply', data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        setBookHope([...bookHope, response.data]);
        setBookHopeTitle('');
        setBookHopeWriter('');
        setBookHopePub('');
        setBookHopeWantDay('');
        setMemberSeq('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='BookApplyDiv'>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="seq" value={memberSeq} onChange={(e) => setMemberSeq(e.target.value)} />
        <input type="text" placeholder="제목" value={bookHopeTitle} onChange={(e) => setBookHopeTitle(e.target.value)} />
        <input type="text" placeholder="저자" value={bookHopeWriter} onChange={(e) => setBookHopeWriter(e.target.value)} />
        <input type="text" placeholder="출판사" value={bookHopePub} onChange={(e) => setBookHopePub(e.target.value)} />
        <input type="date" value={bookHopeWantDay} onChange={(e) => setBookHopeWantDay(e.target.value)} />
        <button type="submit">신청</button>
      </form>
    </div>
  );
}

export default BookApply;