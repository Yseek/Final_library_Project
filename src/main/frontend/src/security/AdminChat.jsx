import { useEffect, useRef, useState } from "react"
import "./securityCss/AdminChat.css"
import Ip from "../Ip"
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function AdminChat() {


	const [chatList, setChatList] = useState({});
	const [stomp, setStomp] = useState(null);
	const [msg, setMsg] = useState([]);
	const [name, setName] = useState("");
	const [text, setText] = useState('');
	const messageListRef = useRef(null);
	const [chatSelectNum, setChatSelectNum] = useState(null);
	const [chatRoomCheck, setChatRoomCheck] = useState(null);

	useEffect(() => {
		fetch(`${Ip.url}/admin/findChatList`, {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("token")
			}
		})
			.then(res => res.json())
			.then(res => {
				setChatList(res);
			});
	}, [chatRoomCheck])

	const socketPub = new SockJS(`${Ip.url}/ws`);
	const stompPub = Stomp.over(socketPub);
	stompPub.connect({}, () => {
		console.log("접속완료")
		stompPub.subscribe(`/sub/chat/pub`, (data) => {
			const newMessage = JSON.parse(data.body);
			setChatRoomCheck(newMessage);
		}, "");
	});

	function didMount(e) {
		e.preventDefault();
		const mountNum = e.target.value;
		if (chatSelectNum != null) {
			if (mountNum != chatSelectNum) {
				setMsg([]);
				const outUser = {
					channelId: chatSelectNum,
					writerId: "관리자",
					chat: "접속을 종료했습니다"
				}
				stomp.send("/pub/chat", "", JSON.stringify(outUser));
				stomp.disconnect(() => {
					stomp.unsubscribe(chatSelectNum);
				}, chatSelectNum);
				setChatSelectNum(mountNum);
				const socket = new SockJS(`${Ip.url}/ws`);
				const stompClient = Stomp.over(socket);
				stompClient.connect({}, () => {
					setStomp(stompClient);
					stompClient.subscribe(`/sub/chat/${mountNum}`, (data) => {
						const newMessage = JSON.parse(data.body);
						setMsg((msg) => [...msg, newMessage]);
						setName(mountNum + newMessage.writerId);
					}, mountNum);
					const inUser = {
						channelId: mountNum,
						writerId: "관리자님",
						chat: "상담을 시작할 수 있습니다."
					}
					stompClient.send("/pub/chat", "", JSON.stringify(inUser));
				});
			}
		} else {
			setChatSelectNum(mountNum);
			const socket = new SockJS(`${Ip.url}/ws`);
			const stompClient = Stomp.over(socket);
			stompClient.connect({}, () => {
				setStomp(stompClient);
				stompClient.subscribe(`/sub/chat/${mountNum}`, (data) => {
					const newMessage = JSON.parse(data.body);
					setMsg((msg) => [...msg, newMessage]);
					setName(mountNum + newMessage.writerId);
				}, mountNum);
				const inUser = {
					channelId: mountNum,
					writerId: "관리자님",
					chat: "상담을 시작할 수 있습니다."
				}
				stompClient.send("/pub/chat", "", JSON.stringify(inUser));
			});
		}
	}

	function disMount(e) {
		e.preventDefault();
		setMsg([]);
		setChatSelectNum(null);
		const outUser = {
			channelId: chatSelectNum,
			writerId: "관리자",
			chat: "접속을 종료했습니다"
		}
		stomp.send("/pub/chat", "", JSON.stringify(outUser));
		stomp.disconnect(() => {
			stomp.unsubscribe(chatSelectNum);
		}, chatSelectNum);

	}

	function sendMsg(e) {
		e.preventDefault();
		stomp.debug = null;
		if (text.length == 0) {
			return;
		} else {
			const data = {
				channelId: chatSelectNum,
				writerId: "관리자",
				chat: text
			};
			//예시 - 데이터 보낼때 json형식을 맞추어 보낸다.
			onReset();
			stomp.send("/pub/chat", "", JSON.stringify(data));
		}
	}

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onReset = () => {
		setText('');
	};
	let i = 0;
	return (
		<div className="adminChatBox">
			<div className="adminChatRoom">
				<div className="adminChatRoomInner">
					<div className="adminChatRoomList">
						<ul>
							{Object.values(chatList).map((res) => (
								<li key={res.channelId}>{res.channelId == chatSelectNum ? <button type="button" value={res.channelId} onClick={disMount}>나가기</button> : <button type="button" value={res.channelId} onClick={didMount}>{res.writerId}</button>}</li>
							))}
						</ul>
					</div>
					{chatSelectNum == null ? "이미지로고?" : <div className="adminChatRoomView">
						<div className="adminChatContentView">
							{chatList.length == 0 ? "채팅요청이 없습니다." : <ul className="chatUl" ref={messageListRef}>
								{msg.map((message) => (
									<li key={`${name}${i++}`}>{message.writerId}이 보낸 메세지 : {message.chat}</li>
								))}
							</ul>}
						</div>
					</div>}
					{chatSelectNum == null ? "" : <div className="adminChatRoomType">
						<form onSubmit={sendMsg}>
							<input type="text" onChange={onChange} value={text}></input>
							<button type="button" onClick={sendMsg}>전송</button>
						</form>
					</div>}
				</div>
			</div>
		</div>
	)
}