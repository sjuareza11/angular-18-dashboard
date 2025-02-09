# Video Game Dashboard

## 📌 Project Description

This project consists of a **video game dashboard** that allows users to visualize data on game sales and ratings throughout the year 2024. It is an **Angular** application with a dummy API based on `json-server` for data retrieval.

## 📺 Features

The project has **two main screens**:

### 🔹 Main Dashboard
- Displays **two charts** summarizing:
  - Number of video game sales during the year 2024.
  - Revenue generated from sales.
- Filters available to select different **gaming platforms**.
- Two paginated data sections:
  - **Best-selling video games**.
  - **Top-rated video games**.
- Each section includes a **search bar** to find games by name.

### 🔹 Game Detail Page
- Displays detailed information about a specific game.
- Allows **navigation back** to the main dashboard.

## 🚀 Installation & Setup

### 🔧 Prerequisites
- **Node.js** version **20.11.0**.
- It is recommended to use `nvm` to manage the Node version. The project includes a `.nvmrc` file.

### 📥 Installation
1. Clone the project repository:
   ```sh
   git clone <REPOSITORY_URL>
   cd project-name
   ```
2. If you have `nvm` installed, run:
   ```sh
   nvm install
   ```
   This will install the version specified in `.nvmrc`.
3. Install project dependencies:
   ```sh
   npm install
   ```

### ▶️ Running the Project
To start both the dashboard and the dummy API, run the following command:
```sh
npm run dev
```
This will launch:
- The Angular server with the dashboard.
- `json-server` with test data.

## 🛠 Technologies Used
- **Angular** for frontend development.
- **Angular Material** for UI design.
- **Chart.js** or `ng2-charts` for data visualization.
- **json-server** for the mock API.

## 📄 License
This project is licensed under the MIT License. For more information, see the `LICENSE` file.

