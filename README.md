# 🧑‍💻 Project Overview

This repository contains a **frontend** and **backend** setup designed for building hybrid web applications using **React islands** within an **Umbraco CMS** project.

---

## 💾 Repository Structure

```
.
🔗 frontend/   # React components (Vite project) — compiled as standalone scripts
🔗 backend/    # Umbraco CMS project — loads React islands into Razor views
```

---

## ⚙️ Frontend (`frontend/`)

The `frontend` folder houses a **Vite-based React project**. This project isn't a traditional SPA — it outputs individual components as JavaScript modules, ready to be loaded into the Umbraco backend and mounted as **React islands** within Razor views.

### 🔨 Development

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start it dev/watch mode:

   ```bash
   pnpm dev:watch
   ```

   OR

   ```bash
   pnpm dev:build
   ```

4. Build for production:

   ```bash
   pnpm build
   ```

The output will be placed in the backend's `wwwroot/assets/` folder, separated between Javascript and CSS files

---

## 🏡 Backend (`backend/`)

The `backend` folder contains an **Umbraco CMS** project that serves as the main application.

### 💡 How it works

- The backend loads the compiled React component scripts from the `frontend` build output.

### Example Razor Usage

#### Layout File

```cshtml
@if (Debugger.IsAttached) {
    <script type="module" src="~/assets/js/main.js"></script>
    <link rel="stylesheet" href="~/assets/css/main.css" />
} else {
    <script type="module" asp-src-include="~/assets/js/main.*.js"></script>
    <link rel="stylesheet" asp-href-include="~/assets/css/main.*.css" />
}
```

#### Component file

```cshtml
<div data-component="BlogListing"></div>
```

## 🧰 Integration Flow

1. **Build React components** in the `frontend` project.
2. **Reference** the output into the layout of the site.
3. **Mount React components** by using the `data-component="..."` annotation
