import React, { useState } from 'react';
import axios from 'axios';

function BookApply() {
  const [bookHope, setBookHope] = useState({
    bookHopeTitle: '',
    bookHopeWriter: '',
    bookHopePub: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookHope(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/user/bookApply', bookHope, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }

  return (
    <div className='BookApplyDiv'>
      <form onSubmit={handleSubmit}>
        <table className="BookApplyTable">
          <thead>
            <tr>
              <th className='BookApplyTh'>구분</th>
              <th className='BookApplyTh'>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='BookApplyFontBold BookApplyTd'>제목</td>
              <input type="text" name="bookHopeTitle" value={bookHope.bookHopeTitle} onChange={handleChange} />
            </tr>
            <tr>
              <td className='BookApplyFontBold BookApplyTd'>저자</td>
              <input type="text" name="bookHopeWriter" value={bookHope.bookHopeWriter} onChange={handleChange} />
            </tr>
            <tr>
              <td className='BookApplyFontBold BookApplyTd'>출판사</td>
              <input type="text" name="bookHopePub" value={bookHope.bookHopePub} onChange={handleChange} />
            </tr>
          </tbody>
          <button type="submit">신청</button>
        </table>
      </form>
    </div>
  );
}

export default BookApply;