import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import Logout from './security/Logout';
import Auth from './security/Auth';
import TestMain from './security/TestMain';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import AdminMemberList from './admin/AdminMemberList';
import Notice from './admin/Notice';
import NoticeAdmin from './admin/NoticeAdmin';
import NoticeAdminContent from './admin/NoticeAdminContent';
import NoticeAdminUpdate from './admin/NoticeAdminUpdate';
import NoticeContent from './admin/NoticeContent';
import NoticeWrite from './admin/NoticeWrite';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="/auth" element={<Auth />}></Route>
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<TestMain />}></Route>
					<Route path="/notice" element={<Notice />}></Route>
					<Route path="/noticeAdmin" element={<NoticeAdmin />}></Route>
					<Route path="/noticeAdminContent" element={<NoticeAdminContent />}></Route>
					<Route path="/noticeAdminUpdate" element={<NoticeAdminUpdate />}></Route>
					<Route path="/noticeContent" element={<NoticeContent />}></Route>
					<Route path="/noticeWrite" element={<NoticeWrite />}></Route>
					<Route path="/adminMemberList" element={<AdminMemberList />}></Route>
					<Route path="/adminMemberList/:page" element={<AdminMemberList />}></Route>
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
