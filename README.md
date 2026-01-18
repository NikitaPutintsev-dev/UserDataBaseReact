# Users Database Frontend

Проект базы пользователей, разработанный с использованием React 16, TypeScript, Webpack и Feature-Sliced Design архитектуры.

## Технологический стек

- **TypeScript** - типизация
- **Webpack + Npm** - сборка проекта
- **React 16** - UI библиотека
- **Ant Design 5** - компоненты интерфейса
- **styled-components** - стилизация компонентов
- **React Router 6** - маршрутизация
- **TanStack Query 4** - управление состоянием сервера
- **axios** - HTTP клиент
- **dayjs** - работа с датами
- **Feature-Sliced Design** - архитектура проекта

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build
```

Проект будет доступен по адресу: http://localhost:3000

## Структура проекта

Проект организован по методологии Feature-Sliced Design:

```
src/
├── app/           # Инициализация приложения, роутинг, провайдеры
├── pages/         # Страницы приложения
├── widgets/       # Крупные самостоятельные блоки
├── features/      # Функциональные возможности
├── entities/      # Бизнес-сущности
└── shared/        # Переиспользуемые модули
```

## API

Проект использует [mockapi.io](https://mockapi.io) для работы с API пользователей.

### Настройка mockapi.io

1. Зарегистрируйтесь на [mockapi.io](https://mockapi.io)
2. Создайте новый проект
3. Создайте ресурс `users` со следующими полями:
   - `name` (String)
   - `email` (String)
   - `phone` (String)
   - `avatar` (String, опционально)
   - `createdAt` (String, автоматически)
4. Скопируйте URL вашего проекта (например: `https://YOUR_PROJECT_ID.mockapi.io/api/v1`)
5. Обновите `BASE_URL` в файле `src/shared/api/baseApi.ts` или создайте файл `.env` с переменной `MOCKAPI_URL`

Пример `.env`:
```
MOCKAPI_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1
```

## Основные страницы

- `/` - Страница авторизации
- `/users` - Страница пользователей
- `/404` - Страница 404

## Функциональность

- Авторизация пользователя
- Просмотр списка пользователей
- Создание нового пользователя (модальное окно)
- Редактирование пользователя (модальное окно)
- Обработка 404 ошибок