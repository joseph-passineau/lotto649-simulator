import { Lottery } from "Lottery";
import { Ticket } from "Ticket";
import difference from "lodash/difference";


test('2 matching numbers should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }
    
    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], loosingNumber[0], loosingNumber[1], loosingNumber[2], loosingNumber[3]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[0]);
    expect(lottery.wins[0]).toBe(1);
});

test('2 matching numbers + bonus should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];
    let bonusNumber = 0

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
        bonusNumber = lottery.result.bonus;
    }
    
    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], bonusNumber, loosingNumber[1], loosingNumber[2], loosingNumber[3]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[1]);
    expect(lottery.wins[1]).toBe(1);
});

test('3 matching numbers should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }
    
    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], winningNumbers[2], loosingNumber[1], loosingNumber[2], loosingNumber[3]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[2]);
    expect(lottery.wins[2]).toBe(1);
});

test('4 matching numbers should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }
    
    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], winningNumbers[2], winningNumbers[3], loosingNumber[2], loosingNumber[3]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[3]);
    expect(lottery.wins[3]).toBe(1);
});

test('5 matching numbers should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }
    
    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], winningNumbers[2], winningNumbers[3], winningNumbers[4], loosingNumber[3]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[4]);
    expect(lottery.wins[4]).toBe(1);
});

test('5 matching numbers + bonus should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];
    let bonusNumber = 0

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
        bonusNumber = lottery.result.bonus;
    }

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], winningNumbers[2], winningNumbers[3], winningNumbers[4], bonusNumber]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[5]);
    expect(lottery.wins[5]).toBe(1);
});

test('6 matching numbers should win', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }

    var ticket = new Ticket([winningNumbers[0], winningNumbers[1], winningNumbers[2], winningNumbers[3], winningNumbers[4], winningNumbers[5]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(lottery.payouts[6]);
    expect(lottery.wins[6]).toBe(1);
});

test('0 matching numbers should lose', () => {
    var lottery = new Lottery();
    lottery.draw();
    let winningNumbers: number[] = [];

    if(lottery.result) {
        winningNumbers = lottery.result.numbers.map((n: number)=> n, []);
        winningNumbers.push(lottery.result.bonus);
    }

    const allPossibleNumbers = Array.from({length: 49}, (_, i) => i + 1)
    const loosingNumber = difference(allPossibleNumbers, winningNumbers); 

    var ticket = new Ticket([loosingNumber[0], loosingNumber[1], loosingNumber[2], loosingNumber[3], loosingNumber[4], loosingNumber[5]]);
    var winnings = lottery.validateTicket(ticket);

    expect(winnings).toBe(0);
    expect(lottery.wins.reduce((a, b) => a + b, 0)).toBe(0);
});