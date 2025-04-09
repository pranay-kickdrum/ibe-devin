# IBE Spring Boot Backend

This is the Spring Boot backend for the IBE application, replacing the previous FastAPI implementation.

## Requirements

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL database

## Running the Application

You can run the application using the Maven wrapper:

```bash
./mvnw spring-boot:run
```

Or using Maven directly:

```bash
mvn spring-boot:run
```

The application will start on port 8000 by default.

## API Endpoints

- `/healthz` - Health check endpoint that returns `{"status": "ok"}`

## Database Configuration

The application is configured to connect to a PostgreSQL database. You can modify the database connection settings in `src/main/resources/application.properties`.
