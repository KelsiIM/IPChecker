FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the proxy will run on
EXPOSE 8001

# Set environment variables for Flask
ENV FLASK_ENV=production
ENV FLASK_APP=src/proxy.py
ENV FLASK_RUN_HOST=0.0.0.0

# Start the Flask application
CMD ["python", "src/proxy.py"]
