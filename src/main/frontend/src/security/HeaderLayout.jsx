import { Link, useLocation } from "react-router-dom";
import "./securityCss/HeaderLayout.css"
import { useEffect, useState } from "react";

export default function HeaderLayout() {

	const { path } = useLocation();
	const [token, setToken] = useState("");
	const [name, setName] = useState("");


	useEffect(() => {
		if (localStorage.getItem("token")) {
			setToken(path);
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
	}, [token]);

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
						<li className="link"><Link to={`/auth`}>보안페이지</Link></li>
						{localStorage.getItem("token") ?  <li className="link">{name}님 환영합니다</li>:""}
						<li><Link to={localStorage.getItem("token") ? `/logout` : `/loginPage`} className="link">{localStorage.getItem("token") ? "로그아웃" : "로그인"}</Link></li>
						{localStorage.getItem("token") ? "" : <li><Link to={`/joinPage`} className="link">회원가입</Link></li>}
					</ul>
				</nav>
			</div>
		</div>
	);
}