# Jet Edge
## How to run the app

### Running the frontend
Move into the frontend folder with:
`cd frontend`

Install all the packages with (only needs to be done once):
`npm i`

Run in development mode with:
`npm run dev`

Build for production with:
`npm run build`

Run in production mode:
`npm run preview`

<br/>

### Running the backend
Move into the backend folder with:
`cd backend`

Run in development mode with:
`./mvnw compile quarkus:dev`

Package the project as a JAR file with (only needs to be done once):
`./mvnw package`

Run in production mode:
`java -jar target/quarkus-app/quarkus-run.jar`
