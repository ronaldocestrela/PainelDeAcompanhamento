pipeline {
    agent any  // Qualquer agente disponível

    environment {
        COMPOSE_FILE = 'docker-compose.yaml' // Nome do arquivo Docker Compose
        // URLs da aplicação
        VITE_API_URL = "${env.VITE_API_URL}"
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
