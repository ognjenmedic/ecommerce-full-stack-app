FROM openjdk:17-jdk-slim

# Install wget and Dockerize
RUN apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/* \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copy the jar file
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Copy the start script into the image and make it executable
COPY start-app.sh start-app.sh
RUN chmod +x start-app.sh

# Set the script as the entrypoint
ENTRYPOINT ["./start-app.sh"]
