import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./securityCss/HeaderLayout.css";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Ip from "../Ip";


export default function HeaderLayout() {

	const { pathname } = useLocation();
	const { state } = useLocation();
	const [name, setName] = useState("");
	const [chatview, setChatview] = useState(false);
	const navi = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			fetch(`${Ip.url}/memberInfo`, {
				method: "POST",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem("token")
				}
			})
				.then(res => res.json())
				.then(res => {
					if (res.status == 500) {
						alert("로그인 시간이 만료되었습니다.");
						navi(`/logout`);
					}
					setName(res.memberName);
				})
		}
	}, [state]);

	function openChat(e) {
		e.preventDefault();
		if (!localStorage.getItem("token")) {
			navi("/loginPage", { state: pathname });
		} else {
			if (chatview == false) {
				setChatview(true);
				didMount(e);
			} else {
				setChatview(false);
			}
		}
	}

	const chatviewStyle = {
		display: chatview ? `block` : `none`,
	};


	const [stomp, setStomp] = useState(null);
	const [msg, setMsg] = useState([]);
	const testRef = useRef(null);

	function didMount(e) {
		e.preventDefault();
		const socket = new SockJS(`${Ip.url}/ws`);
		const stompClient = Stomp.over(socket);
		stompClient.connect({}, () => {
			setStomp(stompClient);
			stompClient.subscribe("/sub/chat/1", (data) => {
				const newMessage = JSON.parse(data.body);
				console.log(newMessage);
				setMsg((msg) => [...msg, newMessage]);
			}, "");
			console.log('Connected!');
		});
	}

	function sendMsg(e) {
		e.preventDefault();
		stomp.debug = null;
		const data = {
			channelId: 1,
			writerId: name,
			chat: testRef.current.value
		};
		//예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
		stomp.send("/pub/chat", "", JSON.stringify(data));
	}
	let i=0;
	return (
		<div className="header">
			<div className="header__inner">
				<div className="chatBox">
					<div className="chatBtn">
						<button type="button" onClick={openChat}>채팅</button>
					</div>
					<div className="chatRoom" style={chatviewStyle}>
						<div className="chatRoomView">
							<div>
								<ul className="chatUl">
									{msg.map((message) => (
										<li key={`${name}${i++}`}>{message.writerId}이 보낸 메세지 : {message.chat}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="chatRoomType">
							<form onSubmit={sendMsg}>
								<input type="text" ref={testRef}></input>
								<button type="button" onClick={sendMsg}>전송</button>
							</form>
						</div>
					</div>
				</div>
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