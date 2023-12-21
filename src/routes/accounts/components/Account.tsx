import { IAccount } from "@/models/IAccount";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Account: FC<IAccount> = ({
    id,
    balance,
    type,
}) => {
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (type === "CREDIT") {
            setTitle("Кредитный счет")
        } else if (type === "DEBIT") {
            setTitle("Дебетовый счет")
        } else if (type === "SAVING") {
            setTitle("Накопительный счет")
        } else {
            setTitle("Брокерский счет")
        }

    }, [type, title]);
    return (
        <Link to={`/accounts/${id}`}>

            <div className="w-full sm:max-w-xl flex flex-col border border-gray-200  bg-white p-4 rounded-md gap-y-2 shadow-md cursor-pointer">
                <h1 className="text-xl font-bold tracking-tight">{balance} ₽</h1>
                <span className="text-gray-600 font-light">{title}</span>
            </div>
        </Link>
    );
}

export default Account;