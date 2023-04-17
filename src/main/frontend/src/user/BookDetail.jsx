import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div className='bookDetailDiv'>
      <button onClick={onClickBack}>목록으로</button>
      <table className="table">
        <thead>
          <tr>
            <th>구분</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='font-bold'>책 표지</td>
            <td>{book.bookImgPath}</td>
          </tr>
          <tr>
            <td className='font-bold'>제목</td>
            <td>{book.bookTitle}</td>
          </tr>
          <tr>
            <td className='font-bold'>저자</td>
            <td>{book.bookWriter}</td>
          </tr>
          <tr>
            <td className='font-bold'>내용</td>
            <td>{book.bookStory}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};
export default BookDetail;