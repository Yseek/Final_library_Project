import "./css/Notice.css";

export default function Mybook() {

	return (
		<div className="Notice">
			<div><h2>내 서재</h2></div>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
                        <th>커버 이미지</th>
						<th>저자</th>
						<th>출판사</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	);
}