FROM openjdk:17-jdk-slim

# Install wget and Dockerize
RUN apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/* \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Use Dockerize to wait for MySQL
ENTRYPOINT ["dockerize", "-wait", "tcp://mysql-container:3306", "-timeout", "30s", "java", "-jar", "/app.jar"]
