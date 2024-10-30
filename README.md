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
  
  | Issue key | Epic Name                        | User Story Name                                                                                                                                 | User Story                                                                                                                                                                                                                                                                                                                                                             | Priority |
| --------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| KAN-51    | Automate Timetable Generation    | Add workdays to algorithms                                                                                                                      | As a student support team member,<br>I want the scheduling algorithm to work across 5 working days instead of just one day,<br>so that we can create timetables for the entire week, offering more flexibility and better scheduling options for students.                                                                                                             | High     |
| KAN-41    | Automate Timetable Generation    | Connect to Azure database                                                                                                                       | As a Student Service team member,<br>I want to store semester and campus information for later retrieval,<br>So that I can view and edit them later down the line without having to re-enter all the data, which saves time and effort.                                                                                                                                | High     |
| KAN-32    | Automate Timetable Generation    | Constraint 1: no students have overlapping units                                                                                                | As a student service team member,<br>I want to implement a constraint that ensures no student has overlapping classes<br>so that students can attend all their enrolled classes without any scheduling conflicts.                                                                                                                                                      | Highest  |
| KAN-45    | Automate Timetable Generation    | Constraint 2: no overlapping units are in the same room                                                                                         | As a student service team member,<br>I want to implement a constraint that ensures no two classes are scheduled in the same classroom at the same time<br>so that there are no conflicts or double-bookings in the timetable, ensuring each class has a dedicated space.                                                                                               | Highest  |
| KAN-34    | Automate Timetable Generation    | Constraint 3: ensure room capacity is not less than allocated unit size                                                                         | As a student service team member,<br>I want to implement a constraint that ensures the room size is greater than or equal to the class size<br>so that all scheduled classes have adequate space for all enrolled students.                                                                                                                                            | Highest  |
| KAN-52    | Automate Timetable Generation    | Constraint 4: lab units prefer lab rooms                                                                                                        | As a student service team member,<br>I want to implement a constraint that ensures lab units are allocated to lab rooms whenever possible<br>so that practical classes are held in appropriate environments conducive to hands-on learning.                                                                                                                            | Highest  |
| KAN-53    | Automate Timetable Generation    | Constraint 5 (Room Availability Constraint): Filter the room in Front End (if a room is labelled not available, do not sent it to the backend). | As a student service team member,<br>I want to label the rooms as available or not,<br>so that only available rooms are scheduled.                                                                                                                                                                                                                                     | High     |
| KAN-56    | Automate Timetable Generation    | Front end persistence using indexedDB                                                                                                           | As a Student Service Team member,<br>I want all input data to be saved at least until I have finished inputting all data necessary for generating the timetable<br>so that I can input all the data for the schedule process.                                                                                                                                          | High     |
| KAN-57    | Automate Timetable Generation    | Store and get info from database                                                                                                                | As a Student Service Team member,<br>I want to store semester and campus information for later retrieval,<br>so that I can view and edit them later down the line without having to re-enter all the data, which saves time and effort.                                                                                                                                | Medium   |
| KAN-92    | General                          | Improve UI/UX design on frontend                                                                                                                | As a Student Service Team member,<br>I want the product to be aesthetically feasible,<br>so that it would match with other VIT websites                                                                                                                                                                                                                                | Lowest   |
| KAN-91    | General                          | Skip button straight to timetable page                                                                                                          | As a Student Service Team member,<br>I want to be able to modify my previously generated timetable right away<br>so that I can save time                                                                                                                                                                                                                               | High     |
| KAN-77    | Security                         | Basic Authentication at backend                                                                                                                 | As a Student Service Team member,<br>I want to ensure that access to the backend is secured using Basic Authentication<br>so that only authorized users can interact with the system.                                                                                                                                                                                  | High     |
| KAN-76    | Security                         | Integrate with backend Basic Auth + reroute to login page                                                                                       | As a Student Service Team member,<br>I want the application to be secure<br>so that only authorised personnel can access the website to use its functionalities and view VIT’s timetables.                                                                                                                                                                             | High     |
| KAN-37    | Store Timetable Input Data       | Allow classes to take up more than 1 timeslot                                                                                                   | As a Student Service Team member,<br>I want to be able to make timetables with class durations of varying length<br>so that I can have flexibility in the classes I plan to have at my institution, and still be able to generate a timetable for them.                                                                                                                | Highest  |
| KAN-26    | Store Timetable Input Data       | Build campus data input page                                                                                                                    | As a member of the Student Service Team,<br>I want to input information about each campus<br>so that the timetables I want to generate is specific to each campus.                                                                                                                                                                                                     | Medium   |
| KAN-27    | Store Timetable Input Data       | Build classroom/lab data input page                                                                                                             | As a member of the Student Service Team,<br>I want to input information about each building and classroom<br>so that lessons can be allocated to a physical location.                                                                                                                                                                                                  | Medium   |
| KAN-25    | Store Timetable Input Data       | Build course data input page                                                                                                                    | As a member of the Student Service Team,<br>I want to input information about each course<br>so that the timetable for students enrolled in each course is different.                                                                                                                                                                                                  | Medium   |
| KAN-24    | Store Timetable Input Data       | Build file upload page for enrolment info                                                                                                       | As a member of the Student Service Team,<br>I want timetables to be generated using the enrolment information of the current semester<br>so that classroom/space allocation will be efficient and adjust dynamically between semesters.                                                                                                                                | Highest  |
| KAN-36    | Store Timetable Input Data       | Client side page routing                                                                                                                        | As a Student Service Team member,<br>I want lower load time when navigating between pages,<br>so that I can get my tasks done faster.                                                                                                                                                                                                                                  | Medium   |
| KAN-39    | Store Timetable Input Data       | Connect Quarkus backend with React frontend                                                                                                     | As a Student Service Team member,<br>I want to enter data and for it to be processed to generate a timetable.<br>so that I can have an automated and quick way to create timetables, without loads of manual labour.                                                                                                                                                   | Medium   |
| KAN-20    | Store Timetable Input Data       | Design data Input UI                                                                                                                            | As a member of the Student Service Team,<br>I want the system to have an user-friendly data input interface,<br>so that I can submit information for generating timetables quickly.                                                                                                                                                                                    | High     |
| KAN-21    | Store Timetable Input Data       | Setup database                                                                                                                                  | As a Student Service Team member,<br>I want to store semester and campus information for later retrieval,<br>So that I can view and edit them later down the line without having to re-enter all the data, which saves time and effort.                                                                                                                                | Highest  |
| KAN-43    | Store Timetable Input Data       | Take into account classrooms and labs priority constraint                                                                                       | As a Student Service Team member,<br>I want to prioritize the allocation of specific classrooms and labs based on their suitability for certain courses<br>so that the timetable reflects the optimal use of resources, ensuring that specialized spaces are reserved for classes that require them.                                                                   | High     |
| KAN-59    | Store and get info from database | Store generated timetable to database                                                                                                           | As a Student Service Team member,<br>I want to store semester and campus information for later retrieval,<br>so that I can view and edit them later down the line without having to re-enter all the data, which saves time and effort.<br>This is not completed for Sprint 1 due to our change of backend framework. This will be moved to Sprint 2.                  | Medium   |
| KAN-58    | Store and get info from database | Store student enrolment info from .xlsx file                                                                                                    | As a Student Service Team member,<br>I want to store semester and campus information for later retrieval,<br>So that I can view and edit them later down the line without having to re-enter all the data, which saves time and effort.                                                                                                                                | Medium   |
| KAN-69    | Testing and Deployment           | Backend deployment                                                                                                                              | As a Student Service Team member,<br>I want the backend of the application to be properly deployed<br>so that it reliably processes data and supports frontend interactions.                                                                                                                                                                                           | High     |
| KAN-62    | Testing and Deployment           | Backend Unit Tests                                                                                                                              | As a developer,<br>I want to thoroughly test the backend functions and modules,<br>so that I can catch bugs early, validate the behaviour of APIs, and verify the correctness of business logic, ensuring that all unit tests pass when individual components are tested in isolation.                                                                                 | High     |
| KAN-87    | Testing and Deployment           | Connect deployed frontend to the deployed backend                                                                                               | As a Student Service Team member,<br>I want the application to generate timetables using a deployed backend<br>so that I don’t have to run the backend locally.                                                                                                                                                                                                        | Highest  |
| KAN-68    | Testing and Deployment           | Frontend deployment                                                                                                                             | As a Student Service Team member,<br>I want the front end of the application to be properly deployed<br>so that I can access and interact with the system’s interface seamlessly.                                                                                                                                                                                      | High     |
| KAN-65    | Testing and Deployment           | Frontend Unit Tests                                                                                                                             | As a Student Service Team member,<br>I want the application UI to be free of bugs<br>so that I can work efficiently.                                                                                                                                                                                                                                                   | Medium   |
| KAN-82    | Testing and Deployment           | Integration Tests                                                                                                                               | As a Student Service Team member,<br>I want the application to be able to communicate seamlessly with the backend<br>so that I can work coherently.                                                                                                                                                                                                                    | Medium   |
| KAN-83    | Testing and Deployment           | Security Tests                                                                                                                                  | As a backend developer,<br>I want the backend to enforce secure access to endpoints,<br>so that unauthorized users cannot access sensitive data or system functionalities.                                                                                                                                                                                             | Medium   |
| KAN-94    | Testing and Deployment           | System Tests                                                                                                                                    | As a system tester,<br>I want to test the entire timetable system comprehensively, including functional, usability, and performance aspects,<br>so that I can ensure it meets the specified requirements and works seamlessly in real-world scenarios.                                                                                                                 | High     |
| KAN-95    | Testing and Deployment           | User Acceptance Tests                                                                                                                           | As a student service team member or administrator,<br>I want to interact with the timetable system in a real-world scenario,<br>so that I can verify that the system meets my needs, is easy to use, and satisfies all business requirements.                                                                                                                          | High     |
| KAN-84    | View and Edit Timetable          | Change website tab name to "Timetabling for VIT"                                                                                                | As a Student Service Team member,<br>I want the application to have a consistent VIT theme<br>so that this application is made for VIT.                                                                                                                                                                                                                                | Low      |
| KAN-49    | View and Edit Timetable          | Display Gantt Chart for received data                                                                                                           | As a Student Service Team member,<br>I want the auto-generated timetable to have a clear display format<br>so that I can easily view and make modifications.                                                                                                                                                                                                           | High     |
| KAN-74    | View and Edit Timetable          | Ensure database only stores one timetable for each campus at all times                                                                          | As a Student Service Team member,<br>I want to only have one timetable for each campus at all times, i.e. each time I generate a new timetable for a campus, any existing timetable for that particular campus should be removed<br>So that I don’t have to sift through a lot of timetables and always be focused on just one                                         | High     |
| KAN-75    | View and Edit Timetable          | Fix database, prevent leaking large input files                                                                                                 | As a Student Service Team member,<br>I want to have all the data I enter into the system saved<br>So that I can retrieve these data later                                                                                                                                                                                                                              | High     |
| KAN-50    | View and Edit Timetable          | Handle download timetables                                                                                                                      | As a Student Service Team member,<br>I want to download the auto-generated timetable(s)<br>so that I view them locally on my own PC and set up timetables for my students.                                                                                                                                                                                             | High     |
| KAN-60    | View and Edit Timetable          | Handle dynamic routing with dynamic campus inputs                                                                                               | As a Student Service Team member,<br>I want to view the timetable of 1 campus per Gantt chart<br>so that any changes in room/time allocation I make will not clash with other classes happening on the same campus. If more campuses are added in the future, the web-application should be dynamic and display timetables for those new campuses in new tabs as well. | High     |
| KAN-71    | View and Edit Timetable          | Modify DB schema to allow storage of timetables by campus                                                                                       | As a Student Service Team member,<br>I want to view timetables by campus<br>So that I can know the classes happening for each campus during the semester and modify accordingly since classes can’t be changed across campuses.                                                                                                                                        | High     |
| KAN-86    | View and Edit Timetable          | Remove the "Building" tab from input spreadsheets page                                                                                          | As a Student Service Team member,<br>I want the UI to not contain unnecessary elements<br>so that I can focus on my tasks.                                                                                                                                                                                                                                             | Low      |
| KAN-80    | View and Edit Timetable          | Save unit drag-and-drop changes to database                                                                                                     | As a Student Service Team member,<br>I want to drag and drop to modify existing timetables and have those changes saved<br>So that when I return to the timetable, it always has the latest changed applied, and I can keep modifying from there                                                                                                                       | High     |
| KAN-73    | View and Edit Timetable          | Split user input by campus before sending to backend                                                                                            | As a Student Service Team member,<br>I want the application to generate 1 timetable for each campus<br>so that each campus is constrained separately by their available buildings.                                                                                                                                                                                     | High     |
| KAN-72    | View and Edit Timetable          | Update frontend API method to match latest backend                                                                                              | As a Student Service Team member,<br>I want the process of communicating with the backend to work seamlessly,<br>so that I can generate a timetable from my input.                                                                                                                                                                                                     | High     |
| KAN-85    | View and Edit Timetable          | Update pages to show loading state whilst processing data                                                                                       | As a Student Service Team member,<br>I want the application UI to feel interactive when it’s loading,<br>so that I know I am waiting on something to be done.                                                                                                                                                                                                          | High     |
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

## Deployment guidelines

You can deploy this site to any hosting platform of your choice, but we have selected Heroku. To ensure smooth deployments and updates, follow the steps outlined below for managing the frontend and backend of the "Timetabling for VIT" application.

<details>

  <summary>Frontend Deployment</summary>

  - [Current Deployment URL](https://vit-timetabling-230c1835ad5a.herokuapp.com/)
  - Process: The frontend is deployed as a Node.js app on Heroku.
  - Update Instructions:
    - Automatic Deployment: Push updates to the `main` branch on GitHub to automatically trigger the CI/CD pipeline for deployment on Heroku.
    - Manual Deployment: If needed, log in to Heroku, access the frontend app, and deploy manually via the Heroku CLI.

</details>
<details>

  <summary>Backend Deployment</summary>

  - [Current Deployment URL](https://jetedge-backend-e1eeff4b0c04.herokuapp.com/)
  - Process: The backend is deployed as a Java app on Heroku.
  - Update Instructions:
    - Automatic Deployment: Push updates to the `main` branch on GitHub to automatically trigger the CI/CD pipeline for deployment on Heroku.
    - Manual Deployment: If needed, log in to Heroku, access the backend app, and deploy manually via the Heroku CLI.

</details>
<details>

  <summary>CI/CD Pipeline</summary>

  - Platform: GitHub Actions
  - [Pipeline Link](.github\workflows\main.yml)
  - Setup: The pipeline automates deployments for both frontend and backend. Pushing to the `main` branch triggers automatic deployment to Heroku.

</details>

Notes
- Environment Variables: Ensure all required variables are updated in your local environment, GitHub Actions secrets, and Heroku app settings
  - FRONTEND_USERNAME, FRONTEND_PASSWORD: Login details for accessing the website.
  - HEROKU_EMAIL, HEROKU_API_KEY, HEROKU_FRONTEND_APP_NAME, HEROKU_BACKEND_APP_NAME: Heroku credentials for automated deployment.
  - QUARKUS_DATASOURCE_USERNAME, QUARKUS_DATASOURCE_PASSWORD, QUARKUS_DATASOURCE_JDBC_URL: Database credentials for the backend.
- Error Handling: Review Heroku logs for any deployment or runtime issues. Logs are accessible via the Heroku dashboard or by running heroku logs --tail in the command line.
- Security: Keep all credentials secure by storing them in environment variables and avoid hard-coding sensitive information.

<br/>

## Changelog

*

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
