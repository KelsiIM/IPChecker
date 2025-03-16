# IPChecker - Microservices Based IP Address Checker
## CSC7071 Cloud Computing Project - MSc Software Development 23/24

### Overview
IPChecker is a microservices-based application designed to process and analyse IP addresses. It consists
of independent services that handle IP classification, validation, bad IP detection, country lookups, 
and counting valid/empty IPs. This project was deploying using Docker and Kubernetes (Rancher), with GitLab
CI/CD pipelines for automated testing and deployment.

**Note:** as per the project brief, all IP validation rules, bad IP lists, and country mappings were hardcoded
into the respective services.

### Features
- Classify IPs - Determines if an IP is IPv4, IPv6, or invalid
- Validate IPs - Checks if an IP follows correct formatting
- Find "Bad" IPs - Matches against a predefined list of bad IPs
- Find Country - Returns country info for an IP address
- Count Total IPs - Determines the total number of submitted IPs
- Count Empty IPs - Checks how many IP fields were left empty
- Reverse Proxy - Routes requests efficiently between services
- Monitoring Service - Planned to track response times, but was not fully implemented due to time constraints

### Technologies Used
- Backend: Node.js, Python, PHP
- Frontend: HTML, JavaScript
- Infrastructure: Docker, Kubernetes (Rancher), GitLab CI/CD Pipeline
- Testing: Jest (Node.js), PHPUnit (PHP), Unittest (Python)

### Setup & Running the Project
### Prerequisites
Ensure you have the following installed:
- Docker
- Docker Compose
- Node.js & npm
- Python & pip
- PHP & Composer

### Running the Entire Project (Docker)
To start all microservices locally:
- docker-compose up --build
- Frontend will be available at http://localhost:80

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
