# livewire-project

A test project using Laravel with Livewire framework.

---

## Install

Clone the project from Git and cd into the project directory.
```bash
git clone https://github.com/Jarkkohei/livewire-project.git
cd livewire-project
```

Install backend dependencies
```bash
composer install
```

Install frontend dependencies
```bash
npm install
```

Create a database and set the environment variables in .env -file.


Migrate the database
```bash
php artisan migrate 
```

Generate JWT-secret
```
php artisan jwt:secret
```

---

## Run

Run the server
```bash
php artisan serve
```

Run and watch the frontend assets
```bash
npm run watch
```

Navigate to http://localhost:8000 to see the Welcome -page