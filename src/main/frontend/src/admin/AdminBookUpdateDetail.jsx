import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Ip from "../Ip";

export default function AdminBookUpdateDetail(){
    const navigate = useNavigate();
    const { state } = useLocation();

    const bookSeq = encodeURIComponent(state)
    const [bookData, setbookData] = useState([]);

    useEffect(() => {
        fetch(`${Ip.url}/admin/booklist/id=${bookSeq}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        )
        .then((res) => res.json())
        .then((data) => setbookData(data))
        .catch((error) => console.error(error));
    }, []);

    console.log(bookData);
    return(
        null
    )
}