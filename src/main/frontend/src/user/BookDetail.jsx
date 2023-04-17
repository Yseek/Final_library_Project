import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/BookDetail.css';

const BookDetail = () => {
  const { bookSeq } = useParams();

  const [book, setBook] = useState({
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/user/bookDetail/` + bookSeq)
      .then(res => res.json())
      .then(res => {
        setBook(res);
      });
  }, [])

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='BookDetailDiv'>
      <button onClick={onClickBack}>목록으로</button>
      <table className="BookDetailTable">
        <thead>
          <tr>
            <th className='BookDetailTh'>구분</th>
            <th className='BookDetailTh'>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='font-bold BookDetailTd'>책 표지</td>
            <td className='BookDetailTd'>{book.bookImgPath}</td>
          </tr>
          <tr>
            <td className='font-bold BookDetailTd'>제목</td>
            <td className='BookDetailTd'>{book.bookTitle}</td>
          </tr>
          <tr>
            <td className='font-bold BookDetailTd'>저자</td>
            <td className='BookDetailTd'>{book.bookWriter}</td>
          </tr>
          <tr>
            <td className='font-bold BookDetailTd'>출판사</td>
            <td className='BookDetailTd'>{book.bookPub}</td>
          </tr>
          <tr>
            <td className='font-bold BookDetailTd'>내용</td>
            <td className='BookDetailTd'>{book.bookStory}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};
export default BookDetail;