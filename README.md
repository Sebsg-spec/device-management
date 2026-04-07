#  DeviceLog - Enterprise Asset Management System

DeviceLog is a full-stack enterprise web application designed to manage corporate IT assets. It allows organizations to track devices, manage user assignments, and leverage AI to automatically generate technical descriptions based on hardware specifications.

##  Key Features

- **Role-Based Access Control (RBAC):** Secure routes using JWT Authentication. System Administrators can add/edit devices, while standard users have view-only or assignment-claiming access.
- **AI Integration:** Uses the Google Gemini 2.5 Flash LLM to automatically generate concise, human-readable device descriptions based on hardware specs (using few-shot prompting).
- **Smart Search Engine:** Custom-built, in-memory free-text search engine featuring query normalization, tokenization, and weighted relevance ranking (without relying on external search APIs).
- **Modern UI:** Built with Angular and Tailwind CSS, featuring responsive cards, dynamic dropdowns, and route guards.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17+ (Standalone Components), Tailwind CSS |
| Backend | ASP.NET Core API, Entity Framework Core |
| Database | Microsoft SQL Server |
| AI Provider | Google Gemini API |

---

##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js and npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) — install with `npm install -g @angular/cli`
- SQL Server (LocalDB or SSMS)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sebsg-spec/device-management.git
cd device-management
```

---

### 2. Backend Setup & Security Configuration

>  For security purposes, sensitive API keys and database connection strings are **not** committed to GitHub. You must configure them locally using the .NET Secret Manager.

Navigate to the API project directory:

```bash
cd src/DeviceManagement.API
```

Initialize User Secrets for this project:

```bash
dotnet user-secrets init
```

Set your **Database Connection String** (update the server name to match your local SQL instance):

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=YOUR_SERVER_NAME;Database=DeviceManagement;Integrated Security=True;TrustServerCertificate=True;"
```

Set a secure key for **JWT Authentication** (must be a long, random string):

```bash
dotnet user-secrets set "Jwt:Key" "GenerateAVeryLongRandomSecretKeyHereForJWTValidation"
```

Set your **Google Gemini API Key** (get a free key from [Google AI Studio](https://aistudio.google.com/)):

```bash
dotnet user-secrets set "Gemini:ApiKey" "YOUR_GEMINI_API_KEY"
```

---

### 3. Database Setup

This project includes two pre-configured SQL files to build the schema and populate seed data.

1. Open **SQL Server Management Studio (SSMS)** or **Azure Data Studio** and connect to your local SQL Server instance.

2. Create a new, empty database:

```sql
CREATE DATABASE DeviceManagement;
```

3. Open the two `.sql` files provided in the repository source code.

4. Make sure the **DeviceManagement** database is selected in the dropdown.

5. Execute the **device_management_schema** to build the schema (tables and relationships).

6. Execute the **device_management_dummy_data** to insert the starting seed data (locations, manufacturers, operating systems, and admin accounts).

---

### 4. Run the Backend API

```bash
dotnet run
```

The API will start running (typically on `https://localhost:7198`). Keep this terminal open.

---

### 5. Frontend Setup

Open a new terminal and navigate to the Angular project:

```bash
cd src/DeviceManagement.UI
```

Install the required npm packages:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

---

### 6. View the Application

Open your browser and navigate to:

```
http://localhost:4200
```

---

##  Security Notes for Reviewers

- **API Keys:** This project utilizes the .NET `IHttpClientFactory` and the Service/Repository pattern to decouple third-party AI calls from the controllers. API keys are safely managed outside the Git tree via User Secrets.

- **Transactions:** Database operations spanning multiple tables (such as creating a device and assigning a user simultaneously) are wrapped in asynchronous Database Transactions (`BeginTransactionAsync`) to ensure absolute data integrity.
