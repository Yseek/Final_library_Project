import "./css/Notice.css";

export default function Mybookreserve() {
	return (
		<div className="Notice">
			<div><h2>내 예약목록</h2></div>
			<table className="mypageTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
						<th>저자</th>
						<th>출판사</th>
                        <th>예약일</th>
						<th>예약 상태</th>
					</tr>
				</thead>
			</table>
		</div>
	);
}