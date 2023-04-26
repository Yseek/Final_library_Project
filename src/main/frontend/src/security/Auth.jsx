import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function () {
	const navi = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		}
	}, []);

	return (
		<div>
			보안페이지
		</div>
	)
}