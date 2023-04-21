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
	const [stomp, setStomp] = useState(null);
	const [msg, setMsg] = useState([]);
	const [text, setText] = useState('');
	const [memberSeq, setMemberSeq] = useState(0);
	const messageListRef = useRef(null);
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
					setMemberSeq(res.memberSeq);
				})
		}
	}, [state]);

	useEffect(() => {
		// 새로운 메시지가 추가될 때마다 스크롤이 맨 아래로 내려감
		messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
	}, [msg]);


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
				disMount(e);
			}
		}
	}

	const chatviewStyle = {
		display: chatview ? `block` : `none`,
	};


	const onChange = (e) => {
		setText(e.target.value);
	};

	const onReset = () => {
		setText('');
	};

	function didMount(e) {
		e.preventDefault();
		const socket = new SockJS(`${Ip.url}/ws`);
		const stompClient = Stomp.over(socket);
		setMsg([]);
		stompClient.connect({}, () => {
			setStomp(stompClient);
			stompClient.subscribe(`/sub/chat/${memberSeq}`, (data) => {
				const newMessage = JSON.parse(data.body);
				setMsg((msg) => [...msg, newMessage]);
			}, name);
			const inUser = {
				channelId: memberSeq,
				writerId: name,
				chat: "접속 했습니다"
			}
			stompClient.send("/pub/chat/pub", "", JSON.stringify(inUser));
			stompClient.send("/pub/chat", "", JSON.stringify(inUser));
			
		});
	}

	function disMount(e) {
		e.preventDefault();
		const outUser = {
			channelId: memberSeq,
			writerId: name,
			chat: "접속을 종료했습니다"
		}
		stomp.send("/pub/chat", "", JSON.stringify(outUser));
		stomp.send("/pub/chat/pub", "", JSON.stringify(outUser));
		stomp.disconnect(() => {
			stomp.unsubscribe(memberSeq);
		}, memberSeq);

	}

	function sendMsg(e) {
		e.preventDefault();
		stomp.debug = null;
		if (text.length == 0) {
			return;
		} else {
			const data = {
				channelId: memberSeq,
				writerId: name,
				chat: text
			};
			//예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
			onReset();
			stomp.send("/pub/chat", "", JSON.stringify(data));
		}
	}
	let i = 0;
	return (
		<div className="header">
			<div className="header__inner">
				<div className="chatBox">
					<div className="chatBtn">
						<button type="button" onClick={openChat}>채팅</button>
					</div>
					<div className="chatRoom" style={chatviewStyle}>
						<div className="chatRoomView">
							<div className="chatContentView" ref={messageListRef}>
								<ul className="chatUl">
									{msg.map((message) => (
										<li key={`${name}${i++}`}>{message.writerId}이 보낸 메세지 : {message.chat}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="chatRoomType">
							<form onSubmit={sendMsg}>
								<input type="text" onChange={onChange} value={text}></input>
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
						<li><Link to={`/adminChat`} className="link">관리자채팅방</Link></li>
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