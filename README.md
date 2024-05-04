
# Web scraper



## Tech Stack

**web-scraper:** TypeScript, Node.js, Express.js, TypeORM, Cheerio, Passport.js, googleapis, class-tranformer, class-validator, jsonwebtoken, axios, XLSX

**database:** PostgreSQL

Docker, Docker Compose


## Description

All sours code is located in the 'src' folder and is divided into modules, each of which is responsible for its own tasks. Authentication/authorization was implemented using Passport.js library and sessions to support logout without using refresh tokens paired with short-lived JWT tokens. Cheerio library was used for parsing the site content. After extracting the necessary information from the page code, the data is converted into JSON, CSV and XLSX formats. For XLSX I used the XLSX library of the same name, CSV format is quite simple so I wrote my own converter for it, for JSON I used the standard function JSON.serialize(). After conversion files are uploaded to google disk using Google API and googleapis library. To name the files that are created, the e-mail of the user who initiated the parsing and the timestamp are used.


## Installation and run

Clone the project

```bash
  $ git clone https://github.com/Kaminskyyy/web-scraper-test-task.git
```

Navigate to root folder

```
  $ cd web-scraper-test-task
```

Specify environment variables. Below you can find list of all needed environment variables.

Run docker compose up

```
  $ docker compose up
```
## Environment Variables

To run this project, you will need to add the following environment variables:


`JWT_SECRET` - Secret key for signing JWT

`SESSION_SECRET` - Secret key for session encryption

`DB_USERNAME` - Database username

`DB_PASSWORD` - Database password

`DB_HOST` - Database host

`DB_PORT` - Database port

`DB_DATABASE_NAME` - Database name

`APP_PORT` - Application port

`GOOGLE_DRIVE_TARGET_FOLDER_ID` - Id of the folder on Google Drive where you want to upload files

`GOOGLE_PRIVATE_KEY` - Google service account private key

`GOOGLE_CLIENT_EMAIL` - Google service account email
## API Reference

#### Sign up

```http
  POST /auth/sign-up
```
##### Body:
| Parameter  | Type     | Description                     |
| :--------  | :------- | :-------------------------      |
| `firstName`| `string` | **Required**. User's first name |
| `lastName` | `string` | **Required**. User's last name  |
| `email`    | `string` | **Required**. User's email      |
| `password` | `string` | **Required**. User's password

#### Login

```http
  GET /auth/login
```
##### Body:
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. User's email        |
| `password` | `string` | **Required**. User's password     |

#### Logout

```http
  GET /auth/logout
```
##### Headers:
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Bearer auth token   |

```http
  GET /parse
```
##### Headers:
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Bearer auth token   |

```http
  GET /parse-requests
```
##### Headers:
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. Bearer auth token   |

##### Query parameters:
| Parameter    | Type     | Description                       |
| :--------    | :------- | :-------------------------------- |
| `Page      ` | `string` | Page number   |
| `PageSize  ` | `string` | Items per page   |

