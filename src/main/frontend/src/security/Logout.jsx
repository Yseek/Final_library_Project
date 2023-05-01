import { useNavigate } from "react-router-dom";
import Ip from "../Ip";

export default function Logout() {
	sessionStorage.removeItem("token");
	const navi = useNavigate();

	fetch(`${Ip.url}/logout.do`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + sessionStorage.getItem("token")
		},
	})
		.then(res => res.json())
		.then(res => {
			sessionStorage.removeItem("token");
			navi('/', { state: "logout" });
		});
}