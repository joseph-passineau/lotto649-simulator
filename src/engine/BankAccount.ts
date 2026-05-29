export class BankAccount {
  balance: bigint;

  constructor () {
    this.balance = 0n;
  }

  withdraw (amount: bigint) {
    this.balance -= amount;
  }

  deposit (amount: bigint) {
    this.balance += amount;
  }
}
