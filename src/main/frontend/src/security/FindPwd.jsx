export default function FindPwd() {
	return (
		<div className="findPwd">
			<div><h3>비밀번호 찾기</h3></div>
			<form>
				<div className="findPwd_Email">
					<label htmlFor="findPwd_Email_id">이메일</label>
					<input id="findPwd_Email_id" type="text" placeholder="가입시 등록한 이메일을 입력하세요."/>
				</div>
				<div className="findPwd_Name">
					<label htmlFor="findPwd_Name_id">이름</label>
					<input id="findPwd_Name_id" type="text" placeholder="가입시 등록한 이름을 입력하세요."/>
				</div>
				<button>비밀번호찾기</button>
			</form>
		</div>
	)
}