import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Profile.css";

export default function Profile(){
    
    const [param, setParam] = useState(useParams());
    const memberinfo = fetch('http://127.0.0.1:8080/read/1');
    
    useEffect(()=>{
		fetch(`http://127.0.0.1:8080/read/1`)
		.then(res => res.json())
		.then(data => setData(data.content))
	}, [param]);

    console.log("memberinfo : "+memberinfo);
    const phoneRef = useRef();
    const addrRef = useRef();
    
    const onSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("memberSeq", memberinfo.memberSeq);
        formData.append("memberPhone", phoneRef.current.value);
        formData.append("memberAddr", addrRef.current.value);

        fetch('http://127.0.0.1:8080/update', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });        
    };
    
    const history = useNavigate();
    const onCancel = () => {
        history(-1);
    };


    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <input type="hidden" name="memberSeq" value={memberinfo.memberSeq}></input>
            </div>

            <div className="input_area">
                <label className="prifileL">전화번호:</label>
                <input type="text" name="memberPhone" className="profileI" ref={phoneRef} defaultValue={memberinfo.memberPhone}></input>
            </div>

            <div className="input_area">
                <label className="profileL">주소:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" name="memberAddr" className="profileI" ref={addrRef} defaultValue={memberinfo.memberAddr}></input>
            </div>

            <button type="submit" className="profileB">등록</button>&nbsp;&nbsp;&nbsp;
            <button type="button" className="profileB" onClick={onCancel}>취소</button>
        </form>
    )
}