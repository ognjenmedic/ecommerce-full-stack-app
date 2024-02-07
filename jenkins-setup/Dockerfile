# Use the official Jenkins LTS image as a base
FROM jenkins/jenkins:lts

# Switch to root to install additional packages
USER root

# Install Java 17, AWS CLI, and other necessary tools
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk software-properties-common apt-transport-https ca-certificates curl gnupg-agent unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    # Cleanup to reduce image size
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* awscliv2.zip

# Switch back to the Jenkins user
USER jenkins
