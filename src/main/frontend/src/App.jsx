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
import BookList from './user/BookList';
import BookDetail from './user/BookDetail';
import MessageDetail from './user/MessageDetail';
import MessageCheck from './user/MessageCheck';
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
					<Route path="/notice" element={<Notice/>}></Route>
					<Route path="/notice/:page" element={<Notice/>}></Route>
					<Route path="/notice/search/:userInput" element={<NoticeSearch/>}></Route>
					<Route path="/notice/content/:noticeSeq" element={<NoticeContent/>}></Route>
					<Route path="/logout" element={<Logout />}></Route>
					<Route path="/myPage" element={<MyPage />}></Route>
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<TestMain />}></Route>
					<Route path="/adminMemberList" element={<AdminMemberList />}></Route>
					<Route path="/admin/booklist" element={<AdminBookList />}></Route>
					<Route path="/adminMemberList/:page" element={<AdminMemberList />}></Route>
					<Route path="/user/bookList" element={<BookList />}></Route>
					<Route path="/user/bookList/:page" element={<BookList />}></Route>
					<Route path="/user/bookDetail/:bookSeq" element={<BookDetail />}></Route>
					<Route path="/user/messageCheck" element={<MessageCheck />}></Route>
					<Route path="/user/messageCheck/:page" element={<MessageCheck />}></Route>
					<Route path="/user/messageDetail/:messageSeq" element={<MessageDetail />}></Route>
					<Route path="/myPage/changePwd" element={<ChangePwd />}></Route>
					<Route path="/admin/booklist/update" element={<AdminBookUpdate />} />
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;