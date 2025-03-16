FROM ubuntu:18.04

RUN apt-get update -y  && apt-get install -y python3 python3-pip

COPY ./requirement.txt /app/requirement.txt

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN apt-get install -y python3-markupsafe
RUN pip3 install -r requirement.txt

COPY ./src /app

# Make port available to the world outside this container
EXPOSE 8080

ENTRYPOINT [ "python3" ]

# Run index.py when the container launches
CMD ["index.py"]