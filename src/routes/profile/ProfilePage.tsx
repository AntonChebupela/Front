import Header from "@/components/header/Header";
import AccountList from "../accounts/components/AccountList";
import CreateAccountForm from "../accounts/components/CreateAccoutForm";
import { useContext, useEffect, useState } from "react";
import AccountService from "@/services/AccountService";
import { IAccount } from "@/models/IAccount";
import { Context } from "@/main";
import { observer } from 'mobx-react-lite'
import { IUser } from "@/models/IUser";
import UserProfile from "./components/UserProfile";

const ProfilePage = () => {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const { store } = useContext(Context)
    const [user, setUser] = useState<IUser>(store.user);
    useEffect(() => {
        setIsloading(true)
        const fetchUsers = async () => {
            await AccountService.fetchAccounts(user.id)
                .then((response) => setAccounts(response.data))
                .finally(() => setIsloading(false));

        }
        if (user.id) {
            fetchUsers();
        }
        if (store.user) {
            setUser(store.user)
        }
    }, [store.user, user.id]);
    return (
        <>
            <Header />
            <div className="mt-16 mx-auto w-full sm:max-w-xl lg:max-w-2xl gap-x-4 flex justify-between p-4">
                <div className="flex flex-col gap-y-4 w-full">
                    {isLoading
                        ? <div className="text-2xl font-bold ">Loading...</div>
                        :
                        <div className="flex flex-col gap-y-4 w-full">
                            {accounts.length > 0 && <h1 className="text-2xl font-bold tracking-tight">Мои счета</h1>}
                            <AccountList accounts={accounts} />
                            <CreateAccountForm id={user.id} />
                        </div>
                    }
                </div>
                    <UserProfile user={user}/>
            </div>


        </>
    );
}

export default observer(ProfilePage);