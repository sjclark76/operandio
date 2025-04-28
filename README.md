# operandio

## Overview
This project is a TypeScript-based web application built using the Koa framework. It provides RESTful APIs for managing widgets and doodats, with features like pagination, validation, and error handling.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- npm (v8 or later)

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sjclark76/operandio.git
   cd operandio

### Install dependencies:


`npm install`


### Running the Project Locally
Start the development server:


`npm run dev`


### Building the Project
To build the project for production:

npm run build

The compiled files will be available in the dist directory.


## Architectural Overview
The project follows a modular architecture with the following key components:
Routes: Define API endpoints and map them to controllers.
Controllers: Handle business logic and interact with the database.
Schemas: Define data validation and logicaltypes.
Database: Simulates a database using in-memory collections.
Directory Structure
```
src/
├── controllers/   # Business logic for API endpoints
├── db/            # Database setup and collections
├── routes/        # API route definitions
├── schemas/       # Data validation schemas
├── index.ts       # Application entry point
```

