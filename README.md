# Probo Assessment
___
## Task
To Create a backend application using Node.js, Rust (or any other) that simulates a basic
trading bot for a hypothetical stock market. The purpose of this bot is to execute trades
based on predefined rules and conditions, while tracking its profit/loss and performance
metrics.

___
## Requirements:
1. Backend Application:
- Build a backend service that continuously monitors stock price changes using
mock data.
- Define a basic trading strategy that decides when to "buy" or "sell" based on
market movements.
2. Data Handling:
- Use a mock API endpoint to get real-time stock prices.
- Parse and handle API responses effectively.
3. Trading Logic:
- Implement simple trading strategies (e.g., moving average crossover,
momentum trading) based on the stock prices.
- For example, buy when the stock price drops by 2% and sell when it rises by
3%.
4. Profit/Loss Tracking:
- Track the bot’s positions, balance, and overall profit/loss.
- Provide a summary report showing the trades made and the final profit/loss
statement.
5. Documentation:
- Include brief documentation explaining the trading logic, API usage, and how
to run the application.

___
## Installation

1. Install packages
```bash
npm install
```

2. Run The Server
```bash
npm run mockApi
```
3. Run the bot
```bash
npm run bot
```
## Explanation

- Used Express.js as a backend server for stocks and updated them every minute to make them live.
- Used cron jobs to check every second for the update of the stocks
- used env for port number

___
**Thanking You**
