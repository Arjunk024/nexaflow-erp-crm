NexaFlow -- Mini ERP + CRM Operations Portal

NexaFlow is a full-stack ERP/CRM operations portal for awholesale/distribution company. It demonstrates a React frontend,Node.js/Express backend, PostgreSQL database, Prisma ORM, REST APIs,validation, security middleware, authentication scaffolding, and aninventory dashboard.

Overview

The case study asks for a small ERP/CRM system covering customers,products, stock, sales challans, invoices and CRM follow-ups, with cleanREST APIs, database design, responsive UI, environment variables, errorhandling, GitHub version control and deployment documentation.fileciteturn3file3L179-L223

This implementation focuses on the working product and inventorymanagement flow and provides the backend/frontend foundation for thewider ERP/CRM portal.

Tech Stack

Frontend - React - TypeScript - Vite - HTML/CSS - Responsive admindashboard

Backend - Node.js - TypeScript - Express.js - REST APIs - Helmet -CORS - Validation and error handling

Database - PostgreSQL - Prisma ORM - Prisma migrations

These technologies align with the case study's required stack.fileciteturn3file3L190-L207

Features

Inventory Dashboard

Total products

Total stock

Low-stock count

Product inventory table

SKU, description, price and stock

Product availability status

Refresh functionality

API connection indicator

Product Management API

Base endpoint:

/api/products

Example product:

{
  "name": "Dell Laptop",
  "sku": "LAP-002",
  "description": "Business laptop",
  "price": 55000,
  "stockQty": 10,
  "minimumStock": 2
}

Database

Product data is persisted in PostgreSQL using Prisma. Schema changes aretracked with Prisma migrations.

Project Structure

Nexaflow/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   └── src/
│       ├── generated/
│       ├── routes/
│       ├── config/
│       ├── middleware/
│       ├── services/
│       ├── utils/
│       ├── validators/
│       ├── app.ts
│       ├── auth.controller.ts
│       ├── product.controller.ts
│       └── prisma.ts
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── public/
│   └── package.json
└── README.md

Prerequisites

Node.js 18+

npm

PostgreSQL

Git

Environment Variables

Create backend/.env:

DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/mydb?schema=public"
PORT=5000
JWT_SECRET="your-development-secret"

Do not commit real credentials or .env files to GitHub.

Backend Setup

cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx tsc --noEmit
npm run dev

Backend:

http://localhost:5000

Health check:

GET /api/health

Expected response:

{
  "success": true,
  "message": "NexaFlow API is running"
}

Frontend Setup

In a second terminal:

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

Production build:

npm run build

API Examples

Get Products

GET /api/products

Create Product

POST /api/products
Content-Type: application/json

Example body:

{
  "name": "Dell Laptop",
  "sku": "LAP-002",
  "description": "Business laptop",
  "price": 55000,
  "stockQty": 10,
  "minimumStock": 2
}

Validation and Error Handling

The backend follows a REST API structure with validation and errorresponses. The case study expects input validation, appropriate HTTPstatus codes, meaningful errors, pagination where needed, andsearch/filter support where needed. fileciteturn3file3L338-L348

Security

The backend includes: - Helmet - CORS - Environment-basedconfiguration - JWT authentication scaffolding - Password-hashingdependencies - Server-side validation

The case study allows simple JWT-based authentication for role-basedaccess. fileciteturn3file3L224-L232

Architecture

React Dashboard
       |
       v
Express REST API
       |
       v
Validation / Controllers
       |
       v
Prisma ORM
       |
       v
PostgreSQL

Verification

The following checks have been completed successfully:

cd frontend
npm run build

cd backend
npx tsc --noEmit

The local API health endpoint has been verified, and the dashboardsuccessfully retrieves and displays inventory products from the backend.

GitHub

Repository:

https://github.com/arjunkubade/nexaflow-erp-crm

Case Study Alignment

The case study identifies authentication/roles, customer CRM,product/inventory, sales challans, REST APIs, responsive UI, deployment,environment variables, GitHub commits and a README with setupinstructions as key requirements. fileciteturn3file3L224-L352

The current implementation demonstrates the working full-stackinventory/product flow, PostgreSQL/Prisma integration, REST APIcommunication, dashboard UI, validation/security foundations and projectdocumentation.

Author

Arjun Kubade

NexaFlow -- Full Stack Developer Case Study
