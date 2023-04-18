import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import Logout from './security/Logout';
<<<<<<< HEAD
import Auth from './security/Auth';
=======
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
import TestMain from './security/TestMain';
import FindEmail from './security/FindEmail';
import FindPwd from './security/FindPwd';
import AdminMemberList from './admin/AdminMemberList';
<<<<<<< HEAD
import BookList from './user/BookList';
import BookDetail from './user/BookDetail';
import MessageCheck from './user/MessageCheck';
=======
import MyPage from './security/MyPage';
import ChangePwd from './security/ChangePwd';
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/logout" element={<Logout />}></Route>
<<<<<<< HEAD
					<Route path="/auth" element={<Auth />}></Route>
=======
					<Route path="/myPage" element={<MyPage />}></Route>
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
					<Route path="/findEmail" element={<FindEmail />}></Route>
					<Route path="/findPwd" element={<FindPwd />}></Route>
					<Route path="/" element={<TestMain />}></Route>
					<Route path="/adminMemberList" element={<AdminMemberList />}></Route>
					<Route path="/adminMemberList/:page" element={<AdminMemberList />}></Route>
<<<<<<< HEAD
					<Route path="/user/bookList" element={<BookList />}></Route>
					<Route path="/user/bookList/:page" element={<BookList />}></Route>
					<Route path="/user/bookDetail/:bookSeq" element={<BookDetail />}></Route>
					<Route path="/user/messageCheck" element={<MessageCheck />}></Route>
					<Route path="/user/messageCheck/:page" element={<MessageCheck />}></Route>
=======
					<Route path="/myPage/changePwd" element={<ChangePwd />}></Route>
>>>>>>> 1cf60aaa5a5e71b0fe2525eac10d7da10d4ef327
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;