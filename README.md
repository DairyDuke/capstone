# My Reader's Journey

## Table of contents
1. [Project Summary](#project-summary)
2. [Technologies Used](#technologies-used)
3. [App Screenshots](#app-screenshots)
4. [Local Run Instructions](#local-run-instructions)
5. [Future Features](#future-features)

---
## Project Summary
My Reader's Journey is a fullstack, stateful web-app that draws its functionality and style inspiration from [Goodreads.com](http://www.Goodreads.com/). The current build offers the following features: Books, Creators, and Bookshelves. Users are considered Librarians and are able to view and edit all books on the website. They are also able to edit their own personal bookshelves.

[Check out the live site!](https://myreadersjourney.onrender.com)

    myreadersjourney.onrender.com

---
## **Technologies Used**

### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

**| [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) | [SQLAlchemy](https://www.sqlalchemy.org/) | [Alembic](https://alembic.sqlalchemy.org/en/latest/) |**

### Frontend:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)


---
## App Screenshots

### Sign Up Form
![](https://i.imgur.com/W8Jc5He.png)

### Log In Form
![](https://i.imgur.com/yHvXcnS.png)

### Logged out splash page
![image](https://user-images.githubusercontent.com/32800127/205650654-142025af-6a38-4d5a-839b-7aa452b6b66f.png)

### Logged in splash page
![image](https://user-images.githubusercontent.com/32800127/205655449-5fadb582-6a77-41f9-98e5-3d8942383dc3.png)

### Create Post Form
![](https://i.imgur.com/5HibyDj.png)

### My Books Page
![image](https://user-images.githubusercontent.com/32800127/205655354-d76594fa-0dc2-44f7-bb69-29c6c376acee.png)
---

## Local Run Instructions
1. Clone the repository to a local directory.
2. In the root directory, copy the contents of the `.env.example` to a `.env` file.
    - Assign `DATABASE_URL` to `sqlite:///dev.db`
    - Assign `SECRET_KEY` to anything (but keep it a secret!)
    - `SCHEMA` is only used for live deployments and can be set to anything
3. In `./app`, install the backend dependencies:
```
pipenv install
```
4. Still in `./app`, run the Alembic migration:
```
pipenv run flask db upgrade
```
5. Then, seed the database:
```
pipenv run flask seed all
```
6. Start the backend server:
```
pipenv run flask run
```
7. Navigate to `./react-app` and install the frontend dependencies:
```
npm install
```
8. Start the frontend server:
```
npm start
```
---

## Future Features
* Implement Reviews.
* Implement Creators
    - Allow Creators and Books to be associated properly.
* User Profile Page
    - Included Quotes and other similar features.
* User Account Levels
    - A Librarian role which functions as an Admin.
        - Currently, all users are Librarians.
---

## Code Highlights
