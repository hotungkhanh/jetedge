<h1 align="center">
  <img src="frontend/src/assets/cropped-vit-logo.png" width="150px"/><br/>
  Timetabling for VIT
</h1>

[Timetabling for VIT](https://vit-timetabling-230c1835ad5a.herokuapp.com) is a web application designed to automate the unit timetabling process for the **Victorian Institute of Technology**. The platform optimizes class schedules, taking into account room availability, course requirements, and student availability to ensure **efficient use of resources** and a **seamless scheduling experience**.

<hr/>

## Demo

https://vit-timetabling-230c1835ad5a.herokuapp.com

<br/>


## Features

<details>
  <summary>Login</summary>
  
  * 
</details>
<details>
  <summary>Welcome Page</summary>
  
  * 
</details>
<details>
  <summary>Upload File</summary>
  
  * 
</details>
<details>
  <summary>Information Page</summary>
  
  * 
</details>
<details>
  <summary>Generate Timetable</summary>
  
  * 
</details>
<details>
  <summary>Display and Download Timetables</summary>
  
  * 
</details>

<br/>

## Documentation

<details>
  <summary>User Stories</summary>
  
  * 
</details>
<details>

  <summary>Motivational Model</summary>
  <img src="docs\Motivational Model.png"/><br/>

</details>
<details>

  <summary>Domain Model</summary>
  <img src="docs\Domain Model.png"/><br/>

</details>
<details>

  <summary>Flow Diagram</summary>
  <img src="docs\Flow Diagram.png"/><br/>
  
</details>
<details>

  <summary>Architecture Diagram</summary>
  <img src="docs\Architecture Diagram.png"/><br/>

</details>

<br/>


## System requirements

Before cloning and attempting to run this code, you will need:

- Node.js: Required for the frontend development, which uses JavaScript and Node.js.
- Java 11 or later: Required for running the backend developed with the Quarkus framework.
- Maven: For managing Java dependencies and building the backend.
- PostgreSQL: The database used in this project, along with pgAdmin for database management.
- Git: For version control and cloning the repository. (Optional, repo can also be downloaded as .zip)
- Heroku CLI: To deploy and manage the application on Heroku. (Optional, for deployment only)

<br/>

## Installation guide

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

### Running the backend
Move into the backend folder with:
`cd backend`

Run in development mode with:
`./mvnw compile quarkus:dev`

Package the project as a JAR file with (only needs to be done once):
`./mvnw package`

Run in production mode:
`java -jar target/quarkus-app/quarkus-run.jar`

<br/>

## Tech Stack

- Frontend: JavaScript with Node.js
- Backend: Java with Quarkus
- Database: PostgreSQL
- CI/CD: GitHub Actions
- Deployment: Heroku

<br/>

## Testing

- Unit Testing
  - [Frontend](tests/Unit%20Testing%20(Frontend).pdf)
  - [Backend](tests/Unit%20Testing%20(Backend).pdf)
- [Integration Testing](tests/Integration%20Testing.pdf)
- [System Testing](tests/System%20Testing.pdf)
- [Security Testing](tests/Security%20Testing.pdf)
- [User Acceptance Testing](tests/User%20Acceptance%20Testing.pdf)

<br/>

## Contributors

<a href="https://github.com/dh-giang-vu">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/140997148?v=4" width="50px"/>
</a>
<a href="https://github.com/NguyenDonLam">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/141087284?v=4" width="50px"/>
</a>
<a href="https://github.com/JackTong24">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/161688152?v=4" width="50px"/>
</a>
<a href="https://github.com/FlyingPufferFish">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/130119691?v=4" width="50px"/>
</a>
<a href="https://github.com/hotungkhanh">
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/114287209?v=4" width="50px"/>
</a>
<br/>
