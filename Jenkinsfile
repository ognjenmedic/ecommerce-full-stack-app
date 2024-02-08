pipeline {
    agent any

    tools {
        maven 'M3'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Maven Build') {
            steps {
                dir('user-backend/ecommerce-spring-boot') {
                    sh 'mvn clean package -Pprod'
                }
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                script {
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
        }
    }
}
