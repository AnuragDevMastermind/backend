# 💰 Personal Finance Tracker API


## 🚀 Features

- **User Authentication & Onboarding**
    - OTP-based signup/login (mocked)
    - JWT for secure sessions
    - Role-based access (Admin/User): cron-job api will be only accessed by admin and other apis are both user or admin accessable.
    - Login/signup audit logging

- **Expense & Budget Management**
    - CRUD for expenses (amount, category, date, tags, notes)
    - Monthly and category-level budgets
    - Auto-categorization using simple heuristics
    - Budget vs actual summaries
    - Protected By JWT token middleware

- **Behavior-Based User Score**
    - Budget adherence (30%)
    - Frequency of usage (30%)
    - Protected By JWT token middleware

- **Notification Engine**
    - Protected by Admin middleware
    - Scheduled notifications (overspending, inactivity)
    - Protected by Admin middleware

- **Transaction Ledger & Reversal**
    - Ledger logging for all expense operations
    - Reversal endpoint to undo last operation
    - Protected By JWT token middleware

- **API Docs**
    - Postman Collection

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT + OTP (mocked)
- **Scheduler:** agenda
- **Documentation:** [Download Postman Collection](./Files/Neosurge.postman_collection.json)

- **Config Management:** dotenv



## ⚙️ How to run project

---

### Server setup prerequisite
- Docker must be installed to run MongoDB as a container. Once Docker is installed, execute the following command to start the MongoDB container:
```
docker run -d -p 27018:27017 --name mongodb mongo
```

- .env content in root directory
```
PORT=8080
MONGO_URI=mongodb://localhost:27018/expenseTracker
OTP_EXPIRY_IN_MINUTES=1
```

### 1. Clone the Repository

```
    git clone https://github.com/yourusername/finance-tracker-api.git
    cd backend
```

### 2. install dependencies

```
npm i

```

### 3. run the project

```
npm run dev
```

## Folder structure & design notes
- [folder_structure.md](folder_structure.md)
- [design_notes.md](design_notes.md)
