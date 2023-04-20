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
					<tr>
                        <th>시간의 역사</th>
                        <th>(커버 이미지)</th>
						<th>스티븐 호킹</th>
						<th>까치출판사</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
}