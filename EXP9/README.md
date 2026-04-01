# EXP 9: JWT Authentication with Spring Boot

## 📌 Project Overview
This experiment demonstrates how to implement a **Stateless Authentication System** using **JWT (JSON Web Tokens)** and **Spring Security**. The application allows a user to authenticate with credentials and receive a secure token, which can then be used for subsequent API calls.

---

## 🚀 Key Features
*   **JWT Token Generation**: Secure token creation using HS256 algorithm.
*   **Stateless Security**: No session data is stored on the server.
*   **Spring Security Integration**: Configured for basic API access control.
*   **Mock Authentication**: Hardcoded `admin/admin` credentials for easy testing (extensible to DB).

---

## 🛠️ Tech Stack
*   **Language**: Java 17
*   **Framework**: Spring Boot 3.3.5
*   **Security**: Spring Security & JJWT (io.jsonwebtoken)
*   **Build Tool**: Maven

---
<img width="1594" height="991" alt="Screenshot 2026-04-01 100659" src="https://github.com/user-attachments/assets/03604af3-48af-4f99-badd-3a748234e552" />
<img width="1288" height="747" alt="Screenshot 2026-04-01 100712" src="https://github.com/user-attachments/assets/743020b3-ae78-4510-912d-ca8cca485ebc" />

## 📂 Quick Start
1.  **Navigate**: `cd EXP9`
2.  **Run Application**: `.\mvnw.cmd spring-boot:run`
3.  **Test API**: Use Postman/Thunder Client on `http://localhost:8080/api/login`.

---

## 📚 Detailed Documentation
For a deep dive into the code structure, working flow, and internal logic, please refer to the [DOCUMENTATION.md](./DOCUMENTATION.md) file.
