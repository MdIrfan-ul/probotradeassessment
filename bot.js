// bot.js
const axios = require('axios');
const cron = require('node-cron');

let balance = 1000; // Starting balance in USD
let position = null; // Stores the current stock position
let tradeHistory = []; // Stores trade history

const buyPricePercentage = -0.02; // Buy when price drops by 2%
const sellPricePercentage = 0.03;  // Sell when price rises by 3%
let lastPrice = null; // To track last known price

// Function to check market and decide buy/sell
async function checkMarket() {
    try {
        const response = await axios.get('http://localhost:3001/api/stock-price');
        const currentPrice = parseFloat(response.data.price);

        if (lastPrice === null) {
            lastPrice = currentPrice;  // Set last price on first run
            console.log(`First run. Last Price set to: $${lastPrice}`);
            return;  // Skip first run as we need a reference point
        }

        console.log(`Current Price: $${currentPrice}`);
        console.log(`Last Price: $${lastPrice}`);

        // Calculate percentage change
        const percentageChange = ((currentPrice - lastPrice) / lastPrice) * 100;
        console.log(`Percentage Change: ${percentageChange.toFixed(2)}%`);

        if (position === null && percentageChange <= buyPricePercentage) {
            // Buy condition
            const shares = Math.floor(balance / currentPrice);
            if (shares > 0) {
                position = {
                    shares,
                    buyPrice: currentPrice
                };
                balance -= shares * currentPrice;
                tradeHistory.push({ action: 'BUY', price: currentPrice, shares });
                console.log(`Bought ${shares} shares at $${currentPrice}`);
            } else {
                console.log("Not enough balance to buy shares.");
            }

        } else if (position !== null && percentageChange >= sellPricePercentage) {
            // Sell condition
            const profit = (currentPrice - position.buyPrice) * position.shares;
            balance += position.shares * currentPrice;
            tradeHistory.push({ action: 'SELL', price: currentPrice, shares: position.shares, profit });
            console.log(`Sold ${position.shares} shares at $${currentPrice} for a profit of $${profit.toFixed(2)}`);
            position = null;  // Reset the position after selling
        } else {
            console.log("No trade made. Conditions not met.");
        }

        lastPrice = currentPrice;  // Update last price after decisions

    } catch (error) {
        console.error("Error fetching stock price:", error.message);
    }
}

// Schedule bot to run every minute
cron.schedule('* * * * *', checkMarket);

// Run the bot manually every 5 seconds for demo purposes
setInterval(checkMarket, 5000);

// Function to generate a summary report
function generateReport() {
    console.log("\n--- Trade Summary ---");
    if (tradeHistory.length === 0) {
        console.log("No trades have been made.");
    } else {
        tradeHistory.forEach((trade, index) => {
            console.log(`${index + 1}: ${trade.action} ${trade.shares} shares at $${trade.price}`);
            if (trade.profit !== undefined) {
                console.log(`   Profit: $${trade.profit.toFixed(2)}`);
            }
        });
        console.log(`\nFinal Balance: $${balance.toFixed(2)}`);
    }
}

// Proper SIGINT handler
process.on('SIGINT', () => {
    console.log("\nGracefully shutting down...");
    generateReport(); // Generate the report before exiting
    process.exit();
});
