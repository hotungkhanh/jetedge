# jetedge
## How to run the app
### Running the backend
Move into the backend folder with:
`cd backend`

Package the project as a JAR file with (only needs to be done once):
`./mvnw package`

Build the Docker image with (only needs to be done once):
`docker build -f src/main/docker/Dockerfile.jvm -t quarkus/backend-jvm .`

Run the container with:
`docker run -i --rm -p 8080:8080 quarkus/backend-jvm`

This will spin up a container for the Quarkus backend ONLY.

Access backend via:
`http://localhost:8080/`

Test by checking whether `http://localhost:8080/hello` gets a message from the backend.

### Running the frontend
No container for frontend.

Move into the frontend folder with:
`cd frontend`

Install all the packages with (only needs to be done once):
`npm i`

Run in development mode with:
`npm run dev`

Access frontend via:
`http://localhost:3000/`
