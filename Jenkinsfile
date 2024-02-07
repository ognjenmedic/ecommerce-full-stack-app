pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                script {
                    sh '''
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" \
                    docker/compose:1.29.2 -f docker-compose.prod.yml up --build -d
                    '''
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
