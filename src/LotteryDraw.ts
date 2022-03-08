import { FixedLengthArray } from "types";

export class LotteryDraw {

    numbers: FixedLengthArray<[number,number,number,number,number,number]>;
    bonus: number;

    constructor(numbers: FixedLengthArray<[number,number,number,number,number,number]>, bonus: number) {
        this.numbers = numbers;
        this.bonus = bonus;
    }
}