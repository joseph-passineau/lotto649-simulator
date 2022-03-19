export class BankAccount {
  balance: number;

  constructor () {
    this.balance = 0;
  }

  withdraw (amount: number) {
    this.balance -= amount;
  }

  deposit (amount: number) {
    this.balance += amount;
  }
}
