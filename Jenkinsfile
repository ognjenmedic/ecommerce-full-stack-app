pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                script {
                    sh "curl -L \"https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
                    sh "chmod +x /usr/local/bin/docker-compose"
                    
                    // Diagnostic steps (Optional)
                    // sh "ls -al" // List everything in the current directory
                    // sh "docker ps -a" // List all Docker containers
                    
                    sh 'docker-compose -f docker-compose.prod.yml up --build -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution is complete.'
        }
        success {
            echo 'Deployment was successful. Your application should now be accessible.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for errors.'
            // sh "docker system prune -af"
        }
    }
}
