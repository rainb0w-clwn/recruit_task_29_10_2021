# Порядок запуска (dev окружение)
Общее:

    1) Необходимо создать .env файл в корне проекта, выставив свои настройки, 
    за пример берется .env.example

    2) Убедиться в наличии созданной БД (default: recruit_task) на PosgtreSQL 
    и правильности настроек подключения в .env

    3) Для запуска из под Windows необходимо установить глобально пакеты nodemon и node-dev-env 
    (npm install -g nodemon node-dev-env)
FRONT:

    1. из папки front/ в терминале выполняем npm install
    2. для запуска в папке front/ выполняем npm run dev
    default-доступ к фронтенду через http://localhost:3000
BACK:

    1. из папки back/ в терминале выполняем npm install
    2. для запуска бэка в папке back/ выполняем npm run dev
       default-доступ к бэкенду через http://localhost:4200
    3. после успешного подключения к бд, необходимо раскатать миграции
    командой npm run db:migration
    4. тестовые данные для бд заполнять командой
    npm run db:seed 
Документация по API доступна по localhost:4200/api/v1/ (при запущенном бэкенде)
