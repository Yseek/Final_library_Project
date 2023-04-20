import "./css/Notice.css";

export default function Bookrent() {

	return (
		<div className="Notice">
			<div><h2>대여 목록</h2></div>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
                        <th>커버 이미지</th>
						<th>대여일</th>
                        <th>반납일</th>
						<th>연장횟수</th>
					</tr>
				</thead>
				<tbody>
					<tr>
                        <th>시간의 역사</th>
                        <th>(커버 이미지)</th>
						<th>2023-04-17</th>
                        <th>2023-04-20</th>
						<th>0회</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
}