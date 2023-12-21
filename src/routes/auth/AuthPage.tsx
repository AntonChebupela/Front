import Header from "@/components/header/Header";
import { FC } from "react";
import AuthForm from "./components/AuthForm";

const AuthPage: FC = () => {
    return (
        <>
            <Header />
            <AuthForm/>
        </>
    );
}

export default AuthPage;