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

  Users can log in with a pre-set username and password provided by Team Jet Edge.
</details>
<details>
  <summary>Welcome Page</summary>

  After logging in, users are presented with two options:
  - Generate Timetable: Starts the process of uploading a student enrolment Excel file to generate a new timetable.
  - Modify Timetable: Allows users to edit existing timetables by navigating to the Timetable Page.
</details>
<details>
  <summary>Upload File</summary>

  - Selecting “Generate Timetable” on the Welcome Page brings up the "Upload File" pop-up window.
  - Click **UPLOAD FILE** at the top to select and upload the student enrolment Excel file.
  - After uploading, click **PROCEED** at the bottom to move to the Information Page.
</details>
<details>
  <summary>Information Page</summary>

  On the Information Page, users can edit room and unit information as needed.
  - Certain columns (Campus, Course, Unit Code, Enrolled Students) in the Unit Table are parsed directly from the uploaded Excel file and cannot be modified.
  - Right-clicking on a cell opens a context menu for more options, such as inserting or deleting rows.

Once editing is complete, click **NEXT** at the bottom right to proceed to the Generate Timetable page.
</details>
<details>
  <summary>Generate Timetable</summary>
  
  - Click **GENERATE TIMETABLE** to start the timetabling process.
  - The processing icon will indicate progress and return to its original state once generation is complete.
  - Click **NEXT** at the bottom right to move to the Timetable Page.
</details>
<details>
  <summary>Display Timetable</summary>
  
  - Users can view the timetable by campus by selecting campus names on the left-hand side of the page.
  - Drag-and-Drop Editing: Users can drag and drop units to adjust room and time allocations as needed. Click **SAVE CHANGES** to apply edits to the database.
  - Note: The system will display a warning if:
    - A unit overlaps with another time slot (“OVERLAPPED”).
    - A unit is assigned outside a designated room (“ASSIGN ACTIVITIES TO ROOMS ONLY”).
</details>
<details>
  <summary>Download Timetable</summary>
  
  If no further changes are needed, click **DOWNLOAD TIMETABLE** at the bottom to download the campus timetable as a ZIP file.
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
