import { BASE_URL } from "@/lib/http";
import { IAccount } from "@/models/IAccount";
import { IUser } from "@/models/IUser";
import { AuthResponse } from "@/models/response/AuthResponse";
import AccountService from "@/services/AccountService";
import AuthService from "@/services/AuthService";
import axios, { AxiosError } from "axios";
import { makeAutoObservable } from 'mobx';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    error: number | undefined = undefined;


    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setError(error: number | undefined) {
        this.error = error
    }
    async login(email: string, password: string) {
        this.setIsLoading(true);
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false);
        }

    }
    async registration(email: string, password: string) {
        this.setIsLoading(true);
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false);
        }
    }
    async logout() {
        this.setIsLoading(true);
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false);
        }
    }
    async checkAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${BASE_URL}/v1/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    }
    async createAccount(account: IAccount) {
        this.setIsLoading(true)
        try {
            const res = await AccountService.createAccount(account);
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                this.setError(error.response?.status)
            }
        } finally {
            this.setIsLoading(false)
        }
    }
    async withdrawMoney(amount: number, id: number) {
        this.setIsLoading(true)
        try {
            const res = await AccountService.withdrawMoney(amount, id);
            return res.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                this.setError(error.response?.status)
            }
        } finally {
            this.setIsLoading(false)
        }
    }
}