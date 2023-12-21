import { IAccount } from "@/models/IAccount";
import Account from "./Account";
import { FC } from "react";

interface AccountListProps {
    accounts: IAccount[]
}

const AccountList: FC<AccountListProps> = ({ accounts }) => {
    return (
        <div className="w-full sm:max-w-lg mx-auto flex flex-col gap-y-4">

            {accounts.length
                ? accounts.map((account) => <Account key={account.id} {...account} />)
                : <h1 className="text-2xl font-bold tracking-tight text-center">Счета не найдены</h1>
            }
        </div>
    );
}

export default AccountList;