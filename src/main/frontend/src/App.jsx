import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import Logout from './security/Logout';
import TestMain from './security/TestMain';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import AdminMemberList from './admin/AdminMemberList';
import AdminMemberContent from './admin/AdminMemberContent';
import './App.css';
import AdminBookList from './admin/AdminBookList';
import Notice from "./user/dongwon/Notice"
import NoticeSearch from "./user/dongwon/NoticeSearch"
import NoticeContent from "./user/dongwon/NoticeContent"
import Mybook from "./user/dongwon/Mybook"
import Mybookrent from "./user/dongwon/MyBookrent"
import Mybookhope from "./user/dongwon/Mybookhope"
import MyPage from './security/MyPage';
import ChangePwd from './security/ChangePwd';
import AdminBookUpdate from './admin/AdminBookUpdate';
import AdminBookUpdateDetail from './admin/AdminBookUpdateDetail';
import AdminMemberList from './admin/AdminMemberList';
import NoticeAdmin from './admin/NoticeAdmin';
import NoticeAdminContent from './admin/NoticeAdminContent';
import NoticeAdminUpdate from './admin/NoticeAdminUpdate';
import NoticeWrite from './admin/NoticeWrite';
import AdminChat from './security/AdminChat';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import FooterLayout from './security/FooterLayout';
import HeaderLayout from './security/HeaderLayout';
import JoinPage from './security/JoinPage';
import LoginPage from './security/LoginPage';
import Logout from './security/Logout';
import Main from './security/Main';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<div className='mainContents'>
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/notice" element={<Notice />}></Route>
					<Route path="/notice/:page" element={<Notice />}></Route>
					<Route path="/notice/search/:userInput" element={<NoticeSearch />}></Route>
					<Route path="/notice/content/:noticeSeq" element={<NoticeContent />}></Route>
					<Route path="/notice/search/:userInput" element={<NoticeSearch/>}></Route>
					<Route path="/notice/content/:noticeSeq" element={<NoticeContent/>}></Route>
					<Route path="/myPage/mybook" element={<Mybook/>}></Route>
					<Route path="/myPage/mybookrent" element={<Mybookrent/>}></Route>
					<Route path="/myPage/mybookhope" element={<Mybookhope/>}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="/myPage" element={<MyPage />}></Route>
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<Main />}></Route>
					<Route path="/notice" element={<Notice />}></Route>
					<Route path="/notice/:page" element={<Notice />}></Route>
					<Route path="/noticeAdmin" element={<NoticeAdmin />}></Route>
					<Route path="/noticeAdmin/:page" element={<NoticeAdmin />}></Route>
					<Route path="/noticeAdmin/Content" element={<NoticeAdminContent />}></Route>
					<Route path="/noticeAdmin/Content/:noticeSeq" element={<NoticeAdminContent />}></Route>
					<Route path="/noticeAdmin/Update" element={<NoticeAdminUpdate />}></Route>
					<Route path="/noticeAdmin/Update/:noticeSeq" element={<NoticeAdminUpdate />}></Route>
					<Route path="/noticeAdmin/write" element={<NoticeWrite />}></Route>
					<Route path="/admin/memberList" element={<AdminMemberList />}></Route>
					<Route path="/admin/memberList/:page" element={<AdminMemberList />}></Route>
					<Route path="/admin/memberList/content" element={<AdminMemberContent />}></Route>
					<Route path="/admin/memberList/content/:page" element={<AdminMemberContent />}></Route>
					<Route path="/admin/booklist" element={<AdminBookList />}></Route>
					<Route path="/myPage/changePwd" element={<ChangePwd />}></Route>
					<Route path="/admin/booklist/update" element={<AdminBookUpdate />} />
					<Route path="/adminChat" element={<AdminChat />} />
					<Route path="/admin/booklist/update/detail" element={<AdminBookUpdateDetail />} />
				</Routes>
				</div>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
