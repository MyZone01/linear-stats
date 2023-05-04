const fs = require('fs');
const readline = require('readline');

if (process.argv.slice(2).length !== 1) {
    console.error('🚩 Error: please provide a filepath as an argument');
    process.exit(1);
}

const filePath = process.argv.slice(2)[0];

const rl = readline.createInterface({
    input: fs.createReadStream(filePath)
});

let numbers = [];

rl.on('line', (line) => {
    numbers.push(Number(line));
});

rl.on('close', () => {
    const nb = numbers.length;
    if (nb > 0) {
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;
        let sumY2 = 0;
        for (let i = 0; i < nb; i++) {
            sumX += i;
            sumY += numbers[i];
            sumXY += i * numbers[i];
            sumX2 += i * i;
            sumY2 += numbers[i] * numbers[i];
        }
        const a = (nb * sumXY - sumX * sumY) / (nb * sumX2 - sumX * sumX);
        const b = (sumY - a * sumX) / nb;
        const r = (nb * sumXY - sumX * sumY) / Math.sqrt((nb * sumX2 - sumX * sumX) * (nb * sumY2 - sumY * sumY));
        console.log(`Linear regression line: y = ${a.toFixed(6)}x + ${b.toFixed(6)}`);
        console.log(`Pearson correlation coefficient: r = ${r.toFixed(10)}`);
    }
});
