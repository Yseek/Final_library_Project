import { Link, useLocation } from "react-router-dom";
import "./securityCss/HeaderLayout.css"
import { useEffect, useState } from "react";

export default function HeaderLayout() {

<<<<<<< HEAD
	const { path } = useLocation();
	const [token, setToken] = useState("");
=======
	const { state } = useLocation();
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
	const [name, setName] = useState("");


	useEffect(() => {
		if (localStorage.getItem("token")) {
<<<<<<< HEAD
			setToken(path);
=======
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
			fetch(`http://127.0.0.1:8080/memberInfo`, {
				method: "POST",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
				.then(res => res.json())
				.then(res => {
					setName(res.memberName);
				})
		}
<<<<<<< HEAD
	}, [token]);
=======
	}, [state]);
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327

	return (
		<div className="header">
			<div className="header__inner">
				<h1>
					<a className="logoImg" href="/">
						로고
					</a>
				</h1>
				<nav>
					<ul>
<<<<<<< HEAD
						<li><Link to={`/auth`} className="link">보안페이지</Link></li>
						{localStorage.getItem("token") ?  <li className="link">{name}님 환영합니다</li>:""}
=======
						<li><Link to={`/myPage`} className="link">마이페이지</Link></li>
						{localStorage.getItem("token") ? <li className="link">{name}님 환영합니다</li> : ""}
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
						<li><Link to={localStorage.getItem("token") ? `/logout` : `/loginPage`} className="link">{localStorage.getItem("token") ? "로그아웃" : "로그인"}</Link></li>
						{localStorage.getItem("token") ? "" : <li><Link to={`/joinPage`} className="link">회원가입</Link></li>}
					</ul>
				</nav>
			</div>
		</div>
	);
}