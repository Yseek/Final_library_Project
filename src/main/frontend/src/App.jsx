import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import Logout from './security/Logout';
import TestMain from './security/TestMain';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import AdminMemberList from './admin/AdminMemberList';
import AdminBookList from './admin/AdminBookList';
import Notice from "./user/dongwon/Notice"
import NoticeSearch from "./user/dongwon/NoticeSearch"
import NoticeContent from "./user/dongwon/NoticeContent"
import MyPage from './security/MyPage';
import ChangePwd from './security/ChangePwd';
import AdminBookUpdate from './admin/AdminBookUpdate';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="/myPage" element={<MyPage />}></Route>
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<TestMain />}></Route>
					<Route path="/notice" element={<Notice />}></Route>
					<Route path="/notice/:page" element={<Notice />}></Route>
					<Route path="/notice/search/:userInput" element={<NoticeSearch/>}></Route>
					<Route path="/notice/content/:noticeSeq" element={<NoticeContent/>}></Route>
					<Route path="/admin/notice" element={<NoticeAdmin />}></Route>
					<Route path="/admin/notice/:page" element={<NoticeAdmin />}></Route>
					<Route path="/admin/notice/content" element={<NoticeAdminContent />}></Route>
					<Route path="/admin/notice/content/:noticeSeq" element={<NoticeAdminContent />}></Route>
					<Route path="/admin/notice/update/:noticeSeq" element={<NoticeAdminUpdate />}></Route>
					<Route path="/admin/notice/write" element={<NoticeWrite />}></Route>
					<Route path="/admin/memberList" element={<AdminMemberList />}></Route>
					<Route path="/admin/memberList/:page" element={<AdminMemberList />}></Route>
					<Route path="/admin/booklist" element={<AdminBookList />}></Route>
					<Route path="/admin/booklist/update" element={<AdminBookUpdate />} />
					<Route path="/myPage/changePwd" element={<ChangePwd />}></Route>
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
