
### Scoring logic
- Budget adherence:
  - It takes an array breakdown of items where each item has a budgetedAmount and an expenseAmount. 
  - For each item, it calculates how much was saved or overspent (moneySaved = budget - expenses). 
  - If money was saved or exactly met the budget, adherence is 100%. If overspent, it calculates the percentage adherence based on the overspend. 
  - The total adherence of all items is summed up and then divided by the number of items to get the average adherence percentage, which is then returned.

- Frequency of usage: (daysActiveThisMonth / totalDays) * 100
- total score: (Budget adherence * adherence_weight)/100 + (Frequency of usage * frequency_weight)/100

## 📌 Schemas

### 🔐 User

Stores registered users and authentication details.

| Field      | Type     | Description             |
|------------|----------|-------------------------|
| `_id`      | ObjectId | Primary key (auto-gen)  |
| `number`   | String   | User's phone number     |
| `name`     | String   | Full name of the user   |
| `password` | String   | Hashed password         |
| `isAdmin`  | Boolean  | Admin privileges flag   |

---

### 📲 OTP

Stores OTPs for phone-based authentication.

| Field         | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `_id`         | ObjectId | Primary key (auto-gen)               |
| `phoneNumber` | String   | Phone number the OTP was sent to     |
| `otp`         | String   | The one-time password                |
| `expiresAt`   | Date     | TTL index for automatic expiration   |

---

### 🧾 Expense

Tracks individual expense records for each user.

| Field      | Type               | Description              |
|------------|--------------------|--------------------------|
| `_id`      | ObjectId           | Primary key (auto-gen)   |
| `userId`   | ObjectId (ref User)| Linked user              |
| `amount`   | Number             | Expense amount           |
| `category` | String             | Expense category         |
| `date`     | Date               | When the expense occurred|
| `tags`     | [String]           | Associated tags          |
| `notes`    | String (Optional)  | Additional notes         |

---

### 💰 Budget

Stores budget settings per user per month/year.

| Field      | Type               | Description              |
|------------|--------------------|--------------------------|
| `_id`      | ObjectId           | Primary key (auto-gen)   |
| `userId`   | ObjectId (ref User)| User owning the budget   |
| `category` | String             | Budget category          |
| `price`    | Number             | Budgeted amount          |
| `month`    | Number (1–12)      | Month of the budget      |
| `year`     | Number             | Year of the budget       |

---

### 📚 Transaction Ledger

Logs all financial changes, including additions, edits, and deletions.

| Field      | Type               | Description                      |
|------------|--------------------|----------------------------------|
| `_id`      | ObjectId           | Primary key (auto-gen)           |
| `userId`   | ObjectId (ref User)| Who performed the operation      |
| `operation`| Enum               | CREATE / EDIT / DELETE           |
| `amount`   | Number             | Amount affected                  |
| `category` | String             | Associated category              |
| `date`     | Date               | Date of the operation            |
| `tags`     | [String]           | Contextual tags                  |
| `notes`    | String (Optional)  | Optional remarks                 |

---

### 🧠 HeuristicCategory

Used for intelligent categorization or tagging via keyword matching.

| Field      | Type     | Description                          |
|------------|----------|--------------------------------------|
| `_id`      | ObjectId | Primary key (auto-gen)               |
| `name`     | String   | Category name                        |
| `keywords` | [String] | Associated keyword triggers          |

---

### 🧾 AuditLog

Tracks important user actions for traceability.

| Field        | Type               | Description              |
|--------------|--------------------|--------------------------|
| `_id`        | ObjectId           | Primary key (auto-gen)   |
| `userId`     | ObjectId (ref User)| Who performed the action |
| `actionType` | Enum               | login / signup / logout  |
| `timestamp`  | Date               | When it occurred         |

---

## 🛠 Indexes & Optimizations

- ✅ **OTP**: TTL index for `expiresAt`