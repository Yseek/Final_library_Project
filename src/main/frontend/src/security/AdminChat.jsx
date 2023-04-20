import "./securityCss/AdminChat.css"

export default function AdminChat() {
	return (
		<div className="adminChatBox">
			<div className="adminChatRoom">
				<div className="adminChatRoomList">
					<ul>
						<li>사용자1</li>
						<li>사용자2</li>
						<li>사용자3</li>
					</ul>
				</div>
				<div className="adminChatRoomView">
					<div className="adminChatContentView">
						내용
					</div>
				</div>
				<div className="adminChatRoomType">
					<form >
						<input type="text" ></input>
						<button type="button" >전송</button>
					</form>
				</div>
			</div>
		</div>
	)
}