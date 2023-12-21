import { useContext, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Context } from "@/main";
import { observer } from "mobx-react-lite";

const defaultRoutes = [
    {
        path: "/",
        title: "Главная"
    },
]

const Header = () => {
    const { store } = useContext(Context)
    const [routes, setRoutes]  = useState(defaultRoutes);
    useEffect(() => {
        console.log(store.isAuth)
        if (!store.isAuth) {
            setRoutes([...defaultRoutes, {path: "/auth", title:'Войти'}])
        }else{
            setRoutes([...defaultRoutes, {path: "/profile", title:'Мой банк'}])
        }
    }, [store.isAuth]);

    return (
        <header className="absolute top-0 left-0 w-full flex flex-row justify-between items-center p-4 bg-white shadow-sm">
            <div className="flex flex-row gap-x-4 items-center">
                <img src={`../logo.svg`} alt="logo" />
                <h1 className="tracking-tight text-2xl font-bold">Golden Bank</h1>
            </div>
            <nav className="flex justify-end">
                {routes.map(route => <NavItem key={route.path} {...route} />)}
            </nav>
        </header>
    );
}

export default observer(Header);