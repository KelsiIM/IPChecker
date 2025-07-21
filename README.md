# IPChecker - Microservices Based IP Address Checker
## CSC7071 Cloud Computing Project - MSc Software Development 23/24

### Overview
IPChecker is a microservices-based application designed to process and analyse IP addresses. It consists
of independent services that handle IP classification, validation, bad IP detection, country lookups, 
and counting valid/empty IPs. This project was deploying using Docker and Kubernetes (via Rancher), with GitLab
CI/CD pipelines for automated testing.

**Note:** as per the project brief, all IP validation rules, bad IP lists, and country mappings were hardcoded
into the respective services.
Each service was originally in its own GitLab repo, but they’ve been brought together here to make the project easier to run locally.

### Features
- Classify IPs - Determines if an IP is IPv4, IPv6, or invalid
- Validate IPs - Checks if an IP follows correct formatting
- Find "Bad" IPs - Matches against a predefined list of bad IPs
- Find Country - Returns country info for an IP address
- Count Total IPs - Determines the total number of submitted IPs
- Count Empty IPs - Checks how many IP fields were left empty
- Reverse Proxy - Routes requests efficiently between services
- Monitoring Service - To track response times

### Technologies Used
- Backend: Node.js, Python, PHP
- Frontend: HTML, JavaScript
- Infrastructure: Docker, Kubernetes (via Rancher), GitLab CI/CD Pipeline
- Testing: Jest (Node.js), PHPUnit (PHP), Unittest (Python)

### Setup & Running the Project
### Prerequisites
Ensure you have the following installed:
- Docker (inc Docker Compose)

- Optional, for manual runs: 
- Node.js & npm
- Python3 & pip
- PHP & Composer

### Running the Entire Project (Docker)
To start all microservices locally via the terminal:
- docker-compose up --build
- Once everything is running, the frontend will be available at: http://localhost:80
- To stop the application, press Ctrl + C, then run docker-compose down

### Running Individual Services
Each service can be run separately if needed.

**Example** - Run ipchecker-classifyips (Node.js):
- cd services/ipchecker-classifyips
- npm install
- npm start

**Example** - Run ipchecker-totalvalidips (Python):
- cd services/ipchecker-totalvalidips
- pip install -r requirements.txt
- python index.py

**Example** - Run ipchecker-findbadips (PHP):
- cd services/ipchecker-findbadips
- php -S localhost:3002 -t .
