import { useNavigate } from "react-router-dom";

export default function Logout() {
	localStorage.removeItem("token");
	const navi = useNavigate();

	fetch(`http://127.0.0.1:8080/logout.do`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
	})
		.then(res => res.json())
		.then(res => {
			localStorage.removeItem("token");
			navi('/');
		});
}