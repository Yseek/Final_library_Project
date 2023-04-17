import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import Notice from "./user/dongwon/Notice"
import NoticeContent from "./user/dongwon/NoticeContent"
import NoticeAdmin from "./user/dongwon/NoticeAdmin"
import NoticeWrite from "./user/dongwon/NoticeWrite"
import NoticeUpdate from "./user/dongwon/NoticeAdminUpdate"
import NoticeAdminContent from "./user/dongwon/NoticeAdminContent"
import Logout from './security/Logout';
import Auth from './security/Auth';
import TestMain from './security/TestMain';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import AdminMemberList from './admin/AdminMemberList';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/notice" element={<Notice/>}></Route>
					<Route path="/notice/:page" element={<Notice/>}></Route>
					<Route path="/notice/content/:noticeSeq" element={<NoticeContent/>}></Route>
					<Route path="/noticeAdmin" element={<NoticeAdmin/>}></Route>
					<Route path="/noticeAdmin/:page" element={<NoticeAdmin/>}></Route>
					<Route path="/noticeAdmin/write" element={<NoticeWrite/>}></Route>
					<Route path="/noticeAdmin/update/:noticeSeq" element={<NoticeUpdate/>}></Route>
					<Route path="/noticeAdmin/content/:noticeSeq" element={<NoticeAdminContent/>}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="/auth" element={<Auth />}></Route>
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<TestMain />}></Route>
					<Route path="/adminMemberList" element={<AdminMemberList />}></Route>
					<Route path="/adminMemberList/:page" element={<AdminMemberList />}></Route>
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
