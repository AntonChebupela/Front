export interface IAccount {
    id?: number,
    balance: number,
    overdraftAllowed: boolean,
    type: string,
    userId: number
}