import React from 'react';
import './App.css';
import HeaderLayout from './security/HeaderLayout';
import FooterLayout from './security/FooterLayout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './security/LoginPage';
import JoinPage from './security/JoinPage';
import AdminMemberList from './admin/AdminMemberList';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<HeaderLayout />
				<Routes>
					<Route path='/joinPage' element={<JoinPage />}></Route>
					<Route path="/loginPage" element={<LoginPage />}></Route>
					<Route path="/admin/memberList" element={<AdminMemberList />}></Route>
					<Route path="/admin/memberList/:page" element={<AdminMemberList />}></Route>
				</Routes>
			</BrowserRouter>
			<FooterLayout />
		</div>
	);
}

export default App;
