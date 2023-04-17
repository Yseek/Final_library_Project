import { BrowserRouter, Link, Routes } from "react-router-dom";

export default function HeaderLayout() {
	return (
		<div className="header">

				<Link to={`/`}>메인으로 돌아가기</Link>
				<Link to={`/loginPage`}>로그인</Link>
				<Link to={`/joinPage`}>회원가입</Link>
				<div>
					<Link to={`/user/bookList`}>도서 목록(유저)</Link>
				</div>
		</div>
	);
}