import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() => {
        let login = localStorage.getItem("login");
        if (!login) {
            localStorage.setItem("loginStatus", "Please login to view dashboard!");
            navigate("/", {replace: true});
        }
    });

    return (
        <Component />
    );
}

export default Protected;