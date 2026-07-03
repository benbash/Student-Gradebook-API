# Student-Gradebook-API

## Project number — Project 4

A simple REST API for managing students, their grades, and calculating academic performance metric such as average score, highest score, lowest score and pass/fail status.

## What the API does

- Create new student records
- Retrieve all students
- Retrieve a student by ID
- Update student records
- Delete student records
- Automatic UUID generation
- Calculates average grade
- Calculates highest and lowest grade
- Computes Pass/Fail metric
- JSON file storage
- Input validation
- Proper HTTP status codes
- Error handling

## How to install

1. Clone the repository using

```bash
   git clone https://github.com/yourusername/student-gradebook.git
```

2. Navigate into the project's directory

```bash
   cd student-gradebook
```

3. Install dependencies

```bash
  npm install
```

4. Start the server

```bash
   npm run dev
```

5. The server runs on
   `http://localhost:3000`

## API Endpoints

| Method | Endpoint        | Description                             |
| ------ | --------------- | --------------------------------        |
| GET    | `/`             | Returns the API title                   |
| GET    | `/students`     | Retrieve all student records            |
| GET    | `/students/:id` | Retrieve a student by record ID         |
| POST   | `/students`     | Create a new student record             |
| PUT    | `/students/:id` | Update an existing student record by ID |
| DELETE | `/students/:id` | Delete a student record by ID           |

## Requests and responses

### 1. GET /

###### Request

```http
   GET /
```

###### Response

```JSON
   Student Gradebook API
```

### 2. GET /students

###### Request

```http
GET /students
```

###### Response

```JSON
[
{
"id": "1a298940-a056-426b-af4f-ec9fcc080b97",
"name": "Abdulwahab Lawal",
"grades": [92, 85, 78],
"average": 85,
"highest": 92,
"lowest": 78,
"status": "Pass",
"createdAt": "2026-07-02T16:18:07.964Z",
"updatedAt": "2026-07-02T16:18:07.965Z"
}
]
```

```status code
200 OK
```

### 3. GET /students/:id

###### Request

```http
GET /students/1a298940-a056-426b-af4f-ec9fcc080b97
```

##### Success Response

```JSON
{
  "id": "1a298940-a056-426b-af4f-ec9fcc080b97",
  "name": "Abdulwahab Lawal",
  "grades": [92, 85, 78],
  "average": 85,
  "highest": 92,
  "lowest": 78,
  "status": "Pass",
  "createdAt": "2026-07-02T16:18:07.964Z",
  "updatedAt": "2026-07-02T16:18:07.965Z"
}
```

##### Error Response

```JSON
{
  "error": "Student not found"
}
```

##### Status Codes

```
200 OK
404 Not Found
```

### 4. POST /students

##### Request

```http
POST /students
Content-Type: application/json
```

##### Body

```JSON
{
  "name": "Chuks James",
  "grades": [80, 75, 95]
}
```

##### Success Response

```JSON
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Chuks James",
  "grades": [80, 75, 95],
  "average": 83.33,
  "highest": 95,
  "lowest": 75,
  "status": "Pass",
  "createdAt": "2026-07-02T17:20:00.000Z",
  "updatedAt": "2026-07-02T17:20:00.000Z"
}
```

##### Validation Error

```JSON
{
  "error": "Validation error message"
}
```

##### Status Codes

```
201 Created
400 Bad Request
```

### 5. PUT /students/:id

##### Request

```http
PUT /students/1a298940-a056-426b-af4f-ec9fcc080b97
Content-Type: application/json
```

##### Body

```JSON
{
"name": "John Smith",
"grades": [90, 85, 80]
}
```

##### Success Response

```JSON
{
  "id": "1a298940-a056-426b-af4f-ec9fcc080b97",
  "name": "John Smith",
  "grades": [90, 85, 80],
  "average": 85,
  "highest": 90,
  "lowest": 80,
  "status": "Pass",
  "createdAt": "2026-07-02T16:18:07.964Z",
  "updatedAt": "2026-07-02T18:00:00.000Z"
}
```

##### Error Response

```JSON
{
  "error": "Student not found"
}
```

##### Status Codes

```
200 OK
400 Bad Request
404 Not Found
```

### 6. DELETE /students/:id

##### Request

```http
DELETE /students/1a298940-a056-426b-af4f-ec9fcc080b97
```

##### Success Response

```
No Content
```

##### Status Code for Successful Response

```
204 No Content
```

##### Error Response

{
"error": "Student not found"
}

##### Status Code for Error Response

```
404 Not Found
```

## Validation Rules

- Required fields are `name` and `grades`
- Student data must be provided as an object.
- `name` must be a non-empty string.
- `grades` must be provided as an array.
- The `grades` array must not be empty.
- Every value in the `grades` array must be a number.
- Student IDs are automatically generated using UUID.
- `createdAt` is automatically generated when a student record is created.
- `updatedAt` is automatically updated whenever a student record is modified.

If any validation rule is violated, the API throws a `ValidationError` and returns a **400 Bad Request** response.

## Project Architecture

1. Routes handles incoming HTTP requests, returns HTTP responses to the client, and manages error handling by sending the appropriate status codes and error messages.
2. Services is responsible for reading from and writing to the JSON data file, performing CRUD operations on student records, generating unique IDs and timestamps, and calculating average grade, highest grade, lowest grade, and pass/fail status.
3. Utils is responsible for input validation and throwing validation errors.
4. Data layer stores student records in `data/students.json`. It maintains student information, grades, grade analysis and timestamps.

## Team Contributions

| Team Member                | Responsibility                                                                                                                                                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Abdulwahab Lawal Abdullahi | Developed API endpoints for retrieving all students, retrieving a student by ID, and creating a student, and helper functions to read file, write file, calcuate analytics, getting all students,getting student by ID and creating student. |
| Adeyemi Ezekiel Dolapo     | Implemented input validation for required fields and data types; created endpoints for updating and deleting students by ID, and helper functions for updating and deleting student.                                                         |
| benbash                    | Set up the GitHub repository, conducted API testing, and verified endpoint functionality.                                                                                                                                                    |
| Babatunde Naheemot Atinuke and Balogun Faithful Onize | Prepared the project documentation (`README.md`).                                                                                                                                                                                            |

## Known Issues & Limitations

- Data storage is file-based (`data/students.json`) and is not safe for concurrent writes or high traffic.
- No authentication or authorization is implemented; all endpoints are publicly accessible.
- Input validation is basic and does not enforce grade ranges or complex rules (e.g., 0–100 bounds).
- Calculations (average) use simple floating-point arithmetic and may show minor rounding differences.
- API lacks pagination, filtering, and rate limiting which may limit usability with large datasets.

## Future Possible Improvements

- Replace the current json file storage system with a database solution such as MongoDB and PostgreSQL to improve scalability and ensure data reliability.
- Implement authentication and authorization mechanism to secure API endpoints and control access to student records.
- Enhance input validation by enforcing grade constraints, validating data formats more strictly, and providing more descriptive error messages.
- Improve grade calculations by implementing consistent rounding strategies and more robust numerical handling where necessary.
- Add support for pagination, filtering, and search functionality to improve performance and usability when handling large dataset.  
