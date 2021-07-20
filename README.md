# Senior Design Capstone - Scaling Backend

The goal of this capstone project was to create the back end of the "Questions and Answers" service of a mock fashion website that can scale to the demands of production traffic.

## System Design

* RESTful API to handle requests to a MongoDB database
* ETL (Extract, Transform, Load) process from csv files consisting of over six million records containing flawed data
* Designed and built an API server to provide data to the client in the format specified by the API documentation
* Optimized database and query methods for speed and response
* Deployed using Docker-Compose and AWS EC2 t2.micro instances
* Stress tested all API routes, checking for RPS (requests per second), latency, and error rate

## Stack
<table>
<tr>
    <td>Languages</td>
    <td><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"></td>
</tr>

<tr>
    <td>Frameworks / Libraries</td>
    <td><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> <img height="28" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> </td>
</tr>
  <tr>
    <td>Testing/Tools</td>
    <td><img alt="artillery" src="https://user-images.githubusercontent.com/75913066/126377179-dc2e322f-a85d-4fc2-ae1a-8b7faa6f0e62.png" height="29">  <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
      </td>
 <tr>

  <tr>
    <td>Deployment</td>
    <td><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"></td>
</tr>
 
  <tr>
      <td>Workflow</td>
      <td><img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white"/> <img alt="Discord" src="https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white"/></td>
    </tr>

</table>

## Usage

This can be readily used as a teaching tool for using Docker-Compose to quickly deploy a full stack application. Simply clone down, open your Docker desktop, and run `docker compose up` to spin up images for :ok_woman: the frontend client, :mailbox_with_mail: the server, and :open_file_folder::open_file_folder: a MongoDB-powered database. Alternatively, uncomment out line 4 and comment out line 5 of docker-compose.yml in order to see the Dockerfile in action.
