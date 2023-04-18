import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/BookList.css';

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

	const pageList = Array.from({ length: page.totalPages }, (_, index) => index + 1);

	return (
		<div className='BookListDiv'>
			<button><Link to={`/`}>메인메인!!!!</Link></button>
			<table className='BookListTable'>
				<thead>
					<tr>
						<th className='BookListTh'>번호</th>
						<th className='BookListTh'>날짜</th>
						<th className='BookListTh'>내용</th>
            <th className='BookListTh'>삭제</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(data) && data.map(res => (
						<tr key={res.messageSeq}>
							<td className='BookListTd'>{res.messageSeq}</td>
							<td className='BookListTd'>{res.messageDate}</td>
							<td className='BookListTd'>{res.messageContent}</td>
              <td className='BookListTd'><button onClick={() => deleteMessage(res.messageSeq)}>삭제</button></td>
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