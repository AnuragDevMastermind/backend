## 📁 Folder Structure

```
backend
│   .env
│   .gitignore
│   design_notes.md
│   folder_structure.md
│   package-lock.json
│   package.json
│   readme.md
│   tsconfig.json
│
└───src
    │   index.ts
    │
    ├───controller
    │       auditLog.controller.ts
    │       auth.controller.ts
    │       budget.controller.ts
    │       cronJob.controller.ts
    │       expense.controller.ts
    │       heuristicCategory.controller.ts
    │       otp.controller.ts
    │
    ├───db
    │   │   db.ts
    │   │
    │   └───repositories
    │           auditLog.repository.ts
    │           budget.repository.ts
    │           expense.repository.ts
    │           heuristicCategory.repository.ts
    │           list.respository.ts
    │           otp.repository.ts
    │           user.respository.ts
    │
    ├───helpers
    │       auth.helper.ts
    │       otp.helper.ts
    │
    ├───jobs
    │   │   agenda.ts
    │   │   scheduler.ts
    │   │
    │   └───definitions
    │           sendEmailJob.ts
    │
    ├───middlewares
    │       auth.middleware.ts
    │
    ├───models
    │       auditLog.model.ts
    │       budget.model.ts
    │       expense.model.ts
    │       heuristicCategory.model.ts
    │       ledger.model.ts
    │       otp.model.ts
    │       user.model.ts
    │
    ├───router
    │   │   createRouter.ts
    │   │
    │   └───routes
    │           auditLog.routes.ts
    │           auth.routes.ts
    │           budget.routes.ts
    │           cronjob.routes.ts
    │           expense.routes.ts
    │           heuristicCategory.routes.ts
    │           otp.routes.ts
    │
    └───types
            response.types.ts
            types.ts
```
