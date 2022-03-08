export class BankAccount {
    balance: number;

    constructor() {
        this.balance = 0;
    }

    Withdraw(amount: number) {
        this.balance -= amount;
    }

    Deposit(amount: number) {
        this.balance += amount;
    }
}