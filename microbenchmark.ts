function createArray(count: number): number[] {
    return new Array(count).fill(0).map((_, i) => i);
}

function forLoop(arr: number[]): number {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

function reduce(arr: number[]): number {
    return arr.reduce((acc, x) => acc + x, 0);
} 

function time(count: number, arr: number[], fn: (arr: number[]) => number): number {
    const start = performance.now();

    for (let i = 0; i < count; i++) {
        fn(arr);
    }

    return performance.now() - start;
}

const small = createArray(10);
const medium = createArray(100);
const large = createArray(1000);
const huge = createArray(10000);
const whatYoureProbablyWorkingWith = createArray(1000000);

const runs = [1, 10, 100, 1000];

let results = {
    small: { reduce: [] as number[], forLoop: [] as number[] },
    medium: { reduce: [] as number[], forLoop: [] as number[] },
    large: { reduce: [] as number[], forLoop: [] as number[] },
    huge: { reduce: [] as number[], forLoop: [] as number[] },
    whatYoureProbablyWorkingWith: { reduce: [] as number[], forLoop: [] as number[] },
};

// warm up JIT
time(100, small, reduce);
time(100, small, forLoop);

for (let i = 0; i < runs.length; i++) {
    console.log("Starting", runs[i]);
    const run = runs[i];

    results.small.reduce.push(time(run, small, reduce));
    results.small.forLoop.push(time(run, small, forLoop));
    results.medium.reduce.push(time(run, medium, reduce));
    results.medium.forLoop.push(time(run, medium, forLoop));
    results.large.reduce.push(time(run, large, reduce));
    results.large.forLoop.push(time(run, large, forLoop));
    results.huge.reduce.push(time(run, huge, reduce));
    results.huge.forLoop.push(time(run, huge, forLoop));
    results.whatYoureProbablyWorkingWith.reduce.push(time(run, whatYoureProbablyWorkingWith, reduce));
    results.whatYoureProbablyWorkingWith.forLoop.push(time(run, whatYoureProbablyWorkingWith, forLoop));
}

console.log(results);
