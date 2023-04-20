import "./css/Notice.css";

export default function Mybookhope() {

	return (
		<div className="Notice">
			<div><h2>나의 희망도서</h2></div>
			<table className="noticeTable">
				<thead className="noticeTableHead">
					<tr>
                        <th>책 제목</th>
                        <th>커버 이미지</th>
						<th>저자</th>
						<th>출판사</th>
                        <th>신청일</th>
                        <th>신청상태</th>
					</tr>
				</thead>
				<tbody>
					<tr>
                        <th>시간의 역사</th>
                        <th>(커버 이미지)</th>
						<th>스티븐 호킹</th>
						<th>까치출판사</th>
                        <th>2023-04-20</th>
                        <th>?</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
}