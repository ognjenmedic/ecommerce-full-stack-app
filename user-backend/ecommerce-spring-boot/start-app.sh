#!/bin/bash

# Check if WAIT_FOR_DB is set to true
if [ "$WAIT_FOR_DB" = "true" ]; then
    # Use Dockerize to wait for the MySQL container
    dockerize -wait tcp://mysql-container:3306 -timeout 30s
fi

# Proceed to start the Spring Boot application
java -jar /app.jar

