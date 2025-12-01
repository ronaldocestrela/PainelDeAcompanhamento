pipeline {
    agent any  // Qualquer agente disponível

    environment {
        COMPOSE_FILE = 'docker-compose.yaml' // Nome do arquivo Docker Compose
    }

    stages {

        stage('Build e Subida dos Contêineres') {
            steps {
                script {
                    // sh 'docker-compose down'  // Para garantir que não há contêineres rodando
                    sh 'docker compose up -d --build'  // Sobe os serviços em segundo plano
                }
            }
        }
    }
}
