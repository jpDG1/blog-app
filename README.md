# MEAN Stack Blog Application

Aplikacja blogowa z wykorzystaniem stosu MEAN (MongoDB, Express, Angular, Node.js) z systemem uwierzytelniania, kategoriami i trybem ciemnym.

## GitHub Repository
https://github.com/jpDG1/blog-app

## Szybki start

### Wymagania
- Node.js 18+
- MongoDB Atlas account (lub lokalna instancja)

### Backend
```bash
cd blog-backend
npm install
```

Utwórz plik `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog
PORT=3000
JWT_SECRET=your_secret_key
```

Uruchom:
```bash
node server.js
```

### Frontend
```bash
cd blog-app
npm install
ng serve
```

Aplikacja dostępna na: `http://localhost:4200`

## Główne funkcje

### Podstawowe
- **Autoryzacja JWT** - rejestracja i logowanie z bcrypt
- **CRUD** - tworzenie, edycja, usuwanie postów
- **Ulubione** - system ulubionych z licznikiem
- **Rating** - 5-gwiazdkowy system ocen
- **Wyszukiwanie** - filtrowanie po tytule/treści
- **Paginacja** - stronicowanie postów
- **Dark mode** - przełącznik motywu

### Dodatkowe (Project + Bonus)
- **Kategorie** - 5 kategorii z filtrowaniem (Technologia, Podróże, Jedzenie, Sport, Inne)
- **Profil** - strona użytkownika ze statystykami
- **Galeria** - alternatywny widok postów
- **Ochrona autora** - tylko autor edytuje swoje posty

## Technologie

**Frontend:** Angular 17, TypeScript, Bootstrap 5, SCSS, RxJS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Testowanie

**Przykładowe konto:**
```
Email: testt@g.com
Password: (twoje hasło)
```

**Funkcje do przetestowania:**
- Rejestracja i logowanie
- Tworzenie posta z kategorią
- Edycja/usuwanie własnych postów
- Dodawanie do ulubionych
- Ocenianie postów (rating)
- Wyszukiwanie i filtrowanie po kategoriach
- Przełączanie dark mode
- Paginacja

## Autor

**Bohdan Tsybulenko**  
Akademia Tarnowska - Inżynieria Oprogramowania (rok 3)
