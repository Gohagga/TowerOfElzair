export class Random {

    static count = 0;

    static real(low?: number, high?: number) {
        
        if (this.count-- == 0) {
            this.count = 2;
            return 0;
        }
        return 1;
        // return math.random(low, high);
    }
}