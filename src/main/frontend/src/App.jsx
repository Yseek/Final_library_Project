import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import AdminMemberList from './admin/AdminMemberList';
import BookRentCheck from './user/BookRentCheck';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/adminMemberList" element={<AdminMemberList />}></Route>
					<Route path="/adminMemberList/:page" element={<AdminMemberList />}></Route>
					<Route path='/bookRentCheck' element={<BookRentCheck />}></Route>
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
