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

## Routes

The application provides the following RESTful API routes for managing widgets:

### Widget Routes

- **GET api/widgets**  
  Retrieves a paginated list of widgets.  
  Query Parameters:
   - `page` (optional): The page number (default is 1).
   - `size` (optional): The number of items per page (default is 10).

- **GET api/widgets/:id**  
  Retrieves a specific widget by its ID.  
  Path Parameters:
   - `id`: The unique identifier of the widget.

- **POST api/widgets**  
  Creates a new widget.  
  Request Body:
   - `id` (string): The unique identifier for the widget.
   - `name` (string): The name of the widget.
   - `description` (string): A description of the widget.
   - `image` (string): A URL to an image of the widget.

- **PUT api/widgets/:id**  
  Updates an existing widget by its ID.  
  Path Parameters:
   - `id`: The unique identifier of the widget.  
     Request Body:
   - `name` (string, optional): The updated name of the widget.
   - `description` (string, optional): The updated description of the widget.
   - `image` (string, optional): The updated image URL of the widget.

### Doodat Routes

- **GET api/doodats**
  Retrieves a paginated list of doodats.
  Query Parameters:
   - `page` (optional): The page number (default is 1).
   - `size` (optional): The number of items per page (default is 10).

- **GET api/doodats/:id**
  Retrieves a specific doodat by its ID.
  Path Parameters:
   - `id`: The unique identifier of the doodat.

- **POST api/doodats**
  Creates a new doodat.
  Request Body:
   - `id` (string): The unique identifier for the doodat.
   - `name` (string): The name of the doodat.
   - `description` (string): A description of the doodat.
   - `image` (string): A URL to an image of the doodat.
   - `price` (monetaryAmount): the price  & currency of the doodat

- **PUT api/doodats/:id**
  Updates an existing doodat by its ID.
  Path Parameters:
   - `id`: The unique identifier of the doodat.
     Request Body:
   - `name` (string, optional): The updated name of the doodat.
   - `description` (string, optional): The updated description of the doodat.
   - `image` (string, optional): The updated image URL of the doodat.
   - `price` (monetaryAmount): the price  & currency of the doodat

  
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

