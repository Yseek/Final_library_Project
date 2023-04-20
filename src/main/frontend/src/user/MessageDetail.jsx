import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/MessageDetail.css';
import Ip from "../Ip";

const MessageDetail = () => {
  const { messageSeq } = useParams();

  const [message, setMessage] = useState({});

  useEffect(() => {
<<<<<<< HEAD
    fetch(`${Ip.url}/user/messageDetail/` + messageSeq, {
=======
    fetch(`http://127.0.0.1:8080/user/messageDetail/` + messageSeq, {
>>>>>>> 2fec51de05a3b1f0f335db0135877ff58ae15580
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(res => {
        setMessage(res);
      });
  }, [])

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className='MessageDetailDiv'>
      <button onClick={onClickBack}>목록으로</button>
      <table className="MessageDetailTable">
        <thead>
          <tr>
            <th className='MessageDetailTh'>내용</th>
            <th className='MessageDetailTh'>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='MessageDetailTd'>{message.messageContent}</td>
            <td className='MessageDetailTd'>{message.messageDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};
export default MessageDetail;