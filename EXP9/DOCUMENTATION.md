# EXP 9: Detailed Project Documentation

This document covers the complete structure and operational details of the **EXP 9 (JWT Authentication System)**.

---

## 📂 1. Directory Structure

```text
EXP9/
├── .mvn/                  # Maven configuration
├── src/
│   ├── main/
│   │   ├── java/com/AML_3A/JWTAuth/
│   │   │   ├── config/          # Security Configuration
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/      # API Endpoints
│   │   │   │   └── AuthController.java
│   │   │   ├── security/        # JWT Logic & Token Utils
│   │   │   │   └── JwtUtil.java
│   │   │   ├── service/         # Business Logic for Login
│   │   │   │   └── AuthService.java
│   │   │   └── JwtAuthApplication.java # Main Application Runner
│   │   └── resources/
│   │       └── application.properties # Spring Configuration
├── EXP9_ThunderClient.json    # Pre-built API collection test file
├── mvnw.cmd                   # Maven Wrapper for Windows execution
└── pom.xml                    # Project Dependencies (Spring, JJWT, MySQL)
```

---

## 🧠 2. Component Explanation

### 🔐 1. Security Logic (`JwtUtil.java`)
The core token engine. It handles:
*   **Token Generation**: Uses **Keys.hmacShaKeyFor** and **HS256** algorithm to create a secure token signed with a secret key.
*   **Token Payload**: Includes the **Subject** (the username) and an **Expiration Time** (set to 1 hour).
*   **Token Parsing**: Extracts the username from an existing token for verification.

### ⚙️ 2. Configuration (`SecurityConfig.java`)
This class manages **Spring Security** settings:
*   **CORS & CSRF**: Disabled for standard API requests during development.
*   **Filter Chain**: Currently configured to **permit all** requests on `/api/**` to focus on token demonstration.
*   **BCrypt**: Provides a `PasswordEncoder` bean for hashing passwords if moved to a database model in the future.

### 💼 3. Business Service (`AuthService.java`)
*   Contains the simple logic: If `username` and `password` both match `"admin"`, trigger the **JwtUtil** to generate a token.
*   Otherwise, it returns an error message.

### 📡 4. Controller (`AuthController.java`)
*   **POST /api/login**: Receives `username` and `password` via form parameters.
*   **GET /api/hello**: A standard endpoint to show a successful response once authenticated.

---

## 🔄 3. Full Working Flow

1.  **Request Initiated**: A user sends a **POST** request to `/api/login` with their username and password.
2.  **Validation**: The `AuthController` passes the credentials to the `AuthService`.
3.  **Credential Check**: The service checks if the credentials match `"admin"`.
4.  **Token Creation**: If valid, the `JwtUtil` converts the username into a base64-encoded, three-part **JWT Token**.
    *   *Part 1: Header (Algorithm)*
    *   *Part 2: Payload (Username, Date)*
    *   *Part 3: Signature (Secret Key Hash)*
5.  **Response**: The token is returned to the user.
6.  **Authenticated Access**: In a full setup, the user would then send this token in the `Authorization: Bearer <TOKEN>` header to call secure APIs.

---

## 🚀 4. How to Run and Test

### Execution
1.  Navigate to the `EXP9` folder.
2.  Run the command: `.\mvnw.cmd spring-boot:run`
3.  Wait for the console to log: `Started JwtAuthApplication in ... seconds`.

### Testing in Thunder Client / Postman
1.  **Login**: Send a POST request to `http://localhost:8080/api/login`.
    *   Set Body type to `x-www-form-urlencoded`.
    *   Key: `username` | Value: `admin`
    *   Key: `password` | Value: `admin`
2.  **Get Token**: Copy the token string from the response.
3.  **Secure Call**: Send a GET request to `http://localhost:8080/api/hello`.
    *   Add a Header: `Authorization`.
    *   Value: `Bearer <YOUR_COPIED_TOKEN>`.

---

## 🎯 5. Conclusion
This project demonstrates the core mechanism of modern API authentication. By replacing the hardcoded `"admin"` check with a Database Repository (using JPA), this system can easily become a production-grade authentication backend.
