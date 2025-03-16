const axios = require('axios');
const mysql = require('mysql2/promise');

const ipAddress = '111.111.1.1';

async function connectDatabase() {
    try {
        console.log("Attempting to connect to the database...");
        return mysql.createConnection({
            host: '35.246.16.25', // IP address of Google Cloud database
            user: 'root',
            password: '40429391',
            database: 'Monitoring' // Name of the database
        });
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        return null;
    }
}

// Measure the response time (time to first byte) for the IP checker
async function measureResponseTime(endpoint, scenario) {
    try {
        const start = Date.now();
        const response = await axios.get(endpoint);
        const responseTime = Date.now() - start;

        console.log(`Response time for ${scenario}: ${responseTime} ms`);
        return responseTime;
    } catch (error) {
        console.error(`Error during API call for ${scenario}:`, error.message);
        return null;
    }
}

// Send the results to the Google Cloud database and insert into the results table
async function sendResponseTimeToDatabase(connection, ipAddress, scenario, responseTime) {
    try {
        await connection.query(
            'INSERT INTO results (ip_address, scenario, response_time) VALUES (?, ?, ?)',
            [ipAddress, scenario, responseTime]
        );
        console.log(`Sent response time for ${scenario} to database`);
    } catch (error) {
        console.error(`Error inserting data into the database for ${scenario}:`, error.message);
    }
}

// main function to test the response times of the ip checker functions
async function run() {
    let connection;
    try {
        connection = await connectDatabase();
        if (!connection) {
            console.error('Failed to connect to the database.');
            return;
        }

        // Measure response time and send to database for each scenario
        let responseTime;

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/totalips?items=${ipAddress}`, 'total_ips');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'total_ips', responseTime);

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/totalemptyips?items=${ipAddress}`, 'total_empty_ips');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'total_empty_ips', responseTime);

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/totalvalidips?items=${ipAddress}`, 'total_valid_ips');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'total_valid_ips', responseTime);

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/classifyips?items=${ipAddress}`, 'classify_ips');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'classify_ips', responseTime);

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/findcountry?items=${ipAddress}`, 'find_country');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'find_country', responseTime);

        responseTime = await measureResponseTime(`http://ipcheckerproxy.40429391.qpc.qubcloud.uk/findbadips?items=${ipAddress}`, 'find_bad_ips');
        if (responseTime !== null) await sendResponseTimeToDatabase(connection, ipAddress, 'find_bad_ips', responseTime);


    } catch (error) {
        console.error('Error in monitoring service:', error.message);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed.');
        }
    }
}

// test every minute
setInterval(run, 60000);