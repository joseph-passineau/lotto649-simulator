import { Lottery } from "Lottery";
import { FixedLengthArray } from "types";

export class Ticket {
    numbers: FixedLengthArray<[number,number,number,number,number,number]>;

    constructor(numbers: FixedLengthArray<[number,number,number,number,number,number]>) {

        this.numbers = numbers.sort((a,b) => { return a - b });
        Lottery.validateTicket(this);
    }

    static generateRandomTicket() : Ticket
    {
        const numbers = Lottery.getRandomNumbers(6);
        return new Ticket([numbers[0], numbers[1], numbers[2], numbers[3],numbers[4],numbers[5]]);
    }
}