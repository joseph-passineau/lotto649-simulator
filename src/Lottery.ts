import { Ticket } from "Ticket";
import uniq from "lodash/uniq";
import intersection from "lodash/intersection";
import { LotteryDraw } from "LotteryDraw";

export class Lottery {

    readonly categories = ["2/6", "2/6+B", "3/6", "4/6", "5/6", "5/6+B" , "6/6"];
    readonly payouts = [3, 5, 10, 78, 2199, 110841, 8811827];
    readonly odds = [8.3, 81.2, 56.7, 1033, 55492, 2330636, 13983816];
    readonly ticketPrice = 3;

    totalWinnings: number;
    result: LotteryDraw | null;
    wins: number[];

    constructor() {
        this.wins = [0, 0, 0, 0, 0, 0, 0];
        this.result = null;
        this.totalWinnings = 0;
    }

    draw() {
        const numbers = Lottery.getRandomNumbers(7);
        this.result = new LotteryDraw([numbers[0], numbers[1], numbers[2], numbers[3],numbers[4],numbers[5]], numbers[6]);
    }

    validateTicket(ticket: Ticket) : number {
        let prize = 0;

        if(this.result) {
            const hasBonus = ticket.numbers.includes(this.result.bonus);
            const result = intersection(ticket.numbers, this.result.numbers);
            
            let prizePool = -1;
            switch(result.length) {
                case 2: 
                    prizePool = hasBonus ? 1 : 0;
                    break;
                case 3:
                    prizePool = 2;
                    break;
                case 4:
                    prizePool = 3;
                    break;
                case 5:
                    prizePool = hasBonus ? 5 : 4; 
                    break;
                case 6:
                    prizePool = 6;   
                    break;         
            }

            if(prizePool >= 0) {
                prize = this.payouts[prizePool];
                this.wins[prizePool]++;
                this.totalWinnings += prize;
            }

        }

        return prize;
    }

    static isValidNumber(number: number) {
        return number > 0 && number < 50;
    }

    static validateTicket(ticket: Ticket) {

        if(uniq(ticket.numbers).length !== 6) {
            throw new Error("Invalid numbers. Number must be unique");
        }

        ticket.numbers.forEach((value)=> {
            if(!Lottery.isValidNumber(value)) {
                throw new Error(`Invalid number. Number ${value} is not valid`);
            }
        });
    }

    static getRandomNumbers(lenght: number) {
        var numbers: number[] = [];
        while(numbers.length < lenght){
            var number = Math.floor(Math.random() * 49) + 1;
            if(numbers.indexOf(number) === -1) {
                numbers.push(number);
            }
        }

        return numbers;
    }
}