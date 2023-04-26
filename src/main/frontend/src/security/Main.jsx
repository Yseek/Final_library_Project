import { useState } from "react";
import { Link } from "react-router-dom";
import Ip from "../Ip";
import "./securityCss/Main.css";

export default function Main() {

	const [searchedBooks, setSearchedBooks] = useState([]);

	const search = (e) => {
		const bookTitle = e.target.value;
		if (bookTitle.length == 0) {
			setSearchedBooks([]);
		} else {
			fetch(`${Ip.url}/searchBook`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ bookTitle }),
			})
				.then(res => res.json())
				.then(res => {
					setSearchedBooks(res)
				});
		}
	}

	return (
		<div className="mainPage">
			<div className="mainTop">
				<div className="searchBookBox">
					<div className="searchBookBoxInput">
						<input type="text" onChange={e => search(e)} />검색
					</div>
					<table className='searchedBookList'>
						<tbody>
							{searchedBooks.map(res => (
								<tr key={res.bookSeq} className="searchedBookListTr">
									<Link to={`/user/bookDetail/${res.bookSeq}`}>
										<td><img src={res.bookImgPath} width={`50px`} height={`70px`} /></td>
										<td>{res.bookTitle}</td>
										<td>{res.bookWriter}</td>
										<td>{res.bookPub}</td>
									</Link>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mainBottom">
				<div className="mainLeftBottom">
					뭐가 있긴 하겠지
				</div>
				<div className="mainRightBottom">
					뭐가 있긴 하겠지
				</div>
			</div>
		</div>
	)
}