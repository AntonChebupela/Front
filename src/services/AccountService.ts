import api from "@/lib/http";
import { IAccount } from "@/models/IAccount";
import { AxiosResponse } from "axios";

export default class AccountService {
    static async fetchAccounts(userId: number):Promise<AxiosResponse<IAccount[]>> {
        return api.get<IAccount[]>(`/v1/account/user/${userId}`)
    }
    static async createAccount(account:IAccount):Promise<AxiosResponse<IAccount>> {
        return api.post<IAccount>('/v1/account', account)
    }
    static async withdrawMoney(amount:number, id: number):Promise<AxiosResponse<IAccount>> {
        const data =  {
            amount: amount
        }
        return api.patch<IAccount>(`/v1/account/withdraw/${id}`, {...data})
    }
}
