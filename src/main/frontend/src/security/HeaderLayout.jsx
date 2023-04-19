import { Link, useLocation, useNavigate } from "react-router-dom";
import "./securityCss/HeaderLayout.css"
import { useEffect, useState } from "react";

export default function HeaderLayout() {

	const { state } = useLocation();
	const [name, setName] = useState("");
	const navi =  useNavigate();


	useEffect(() => {
		if (localStorage.getItem("token")) {
			fetch(`http://127.0.0.1:8080/memberInfo`, {
				method: "POST",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
				.then(res => res.json())
				.then(res => {
					if(res.status==500){
						alert("로그인 시간이 만료되었습니다.");
						navi(`/logout`);
					}
					setName(res.memberName);
				})
		}
	}, [state]);

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
						<li><Link to={`/myPage`} className="link">마이페이지</Link></li>
						{localStorage.getItem("token") ? <li className="link">{name}님 환영합니다</li> : ""}
						<li><Link to={localStorage.getItem("token") ? `/logout` : `/loginPage`} className="link">{localStorage.getItem("token") ? "로그아웃" : "로그인"}</Link></li>
						{localStorage.getItem("token") ? "" : <li><Link to={`/joinPage`} className="link">회원가입</Link></li>}
					</ul>
				</nav>
			</div>
		</div>
	);
}