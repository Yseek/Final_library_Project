import { useNavigate } from "react-router-dom";
import Ip from "../Ip";

export default function Logout() {
	localStorage.removeItem("token");
	const navi = useNavigate();

	fetch(`${Ip.url}/logout.do`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
	})
		.then(res => res.json())
		.then(res => {
			localStorage.removeItem("token");
			navi('/', { state: "logout" });
		});
}