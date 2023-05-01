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
		<div className="adminAddBooks">
			<form onSubmit={e => addBooks(e)}>
				<div>
					제목: <input type="text" ref={titleRef} />
				</div>
				<div>
					저자: <input type="text" ref={writerRef} />
				</div>
				<div>
					출판사: <input type="text" ref={pubRef} />
				</div>
				<div>
					줄거리: <input type="text" ref={storyRef} />
				</div>
				<div className="imgDiv">
					<div>
						<input multiple type="file" accept="image/*" onChange={e => onUpload(e)} ref={fileRef} />
					</div>
					<div className="imgViewDiv">
						<img src={imageSrc} width={`300px`} height={`300px`} />
					</div>
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