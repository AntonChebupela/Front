import DeleteAccountDialog from "./components/delete/DeleteAccountDialog";
import DepositMoneyForm from "./components/deposit/DepositMoneyForm";
import WithdrawMoneyForm from "./components/withdraw/WithdrawMoneyForm";
import Header from "@/components/header/Header";
import api from "@/lib/http";
import { cn } from "@/lib/utils";
import { IAccount } from "@/models/IAccount";
import { ArrowLeft, } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AccountPage = () => {
    const { id } = useParams();
    const [account, setAccount] = useState<IAccount | null>(null);
    const [title, setTitle] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsloading(true)
        const getAccount = async () => {
            await api.get(`/v1/account/${id}`)
                .then((res) => setAccount(res.data))
                .then(() => setIsloading(false))
        }
        getAccount();
        if (account?.type === "CREDIT") {
            setTitle("Кредитный счет")
        } else if (account?.type === "DEBIT") {
            setTitle("Дебетовый счет")
        } else if (account?.type === "SAVING") {
            setTitle("Накопительный счет")
        } else {
            setTitle("Брокерский счет")
        }

    }, [id]);
    return (
        <>
            <Header />
            <div className="w-full flex justify-center items-center  h-screen">
                {isLoading ? <div>Loading...</div> : account
                    ?
                    <div className="w-full sm:max-w-sm lg:max-w-lg flex flex-col border border-gray-200  bg-white p-4 rounded-xl gap-y-4 shadow-md">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-xl font-bold tracking-tight">{account.balance} ₽</h1>
                            <ArrowLeft className="cursor-pointer" onClick={() => navigate("/profile")} />
                        </div>
                        <span className="font-light">{title}</span>
                        <span className={cn(account.overdraftAllowed ? "text-green-500" : "text-rose-500")}>{account.overdraftAllowed ? "Овердрафт включен" : "Овердрафт выключен"}</span>
                        <div className="w-full flex justify-between gap-x-4">
                            <DepositMoneyForm id={Number(id)} />
                            <WithdrawMoneyForm id={Number(id)} />
                        </div>
                        <DeleteAccountDialog id={Number(id)} name={title} />
                    </div>
                    : <h2 className="text-2xl tracking-tight font-bold">Счет не найден</h2>
                }
            </div>
        </>
    );
}

export default AccountPage;