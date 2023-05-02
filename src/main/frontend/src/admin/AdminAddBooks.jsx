import { useRef, useState } from "react"
import "./css/AdminAddBooks.css"
import Ip from "../Ip";

export default function AdminAddBooks() {

	const [imageSrc, setImageSrc] = useState(null);
	const [fileImg, setFileImg] = useState(null);
	const titleRef = useRef(null);
	const writerRef = useRef(null);
	const pubRef = useRef(null);
	const storyRef = useRef(null);
	const fileRef = useRef(null);
	const statusRef = useRef(null);

	const onUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		return new Promise(res => {
			reader.onload = () => {
				setImageSrc(reader.result || null);
				setFileImg(file);
				res();
			}
		})
	}

	const addBooks = (e) => {
		const data = {
			"bookTitle": titleRef.current.value,
			"bookWriter": writerRef.current.value,
			"bookPub": pubRef.current.value,
			"bookStory": storyRef.current.value,
			"bookStatus": statusRef.current.value
		};
		const formData = new FormData();
		formData.append(`file`, fileImg);
		formData.append(`data`, JSON.stringify(data));

		fetch(`${Ip.url}/admin/addBooks`, {
			method: "POST",
			headers: {
				"Authorization": "Bearer " + sessionStorage.getItem("token"),
			},
			body: formData
		}).then(res => res.text())
			.then(res => {
				alert(res);
			});
	}

	return (
		<div className="adminAddBooksDiv">
			<h2>도서 추가</h2>
			<form onSubmit={e => addBooks(e)}>
				<div className='adminAddBooksIpDiv'>
					<span>제목</span>
					<input className='adminAddBooksInput2' type="text" ref={titleRef} />
				</div>
				<div className='adminAddBooksIpDiv'>
					<span>저자</span>
					<input className='adminAddBooksInput2' type="text" ref={writerRef} />
				</div>
				<div className='adminAddBooksIpDiv'>
					<span>출판사</span>
					<input className='adminAddBooksInput3' type="text" ref={pubRef} />
				</div>
				<div className='adminAddBooksIpDiv'>
					<span>줄거리</span>
					<input className='adminAddBooksInput3' type="text" ref={storyRef} />
				</div>
				<div className='adminAddBooksIpDiv2'>
					<span>책표지</span>
					<label htmlFor="flie_upload" className='fileBtn'>파일선택</label>
					<input id="flie_upload" multiple type="file" accept="image/*" onChange={e => onUpload(e)} ref={fileRef} />
				</div>
				<div>
					<img src={imageSrc} width={`300px`} height={`300px`} />
				</div>
				<div>
					<input type="hidden" value={`1`} ref={statusRef} />
				</div>
				<div>
					<button type="button" onClick={e => addBooks(e)}>등록</button>
				</div>
			</form>
		</div>
	)
}