# Real Estate Asset Management System

## Summary

I have successfully designed and built a Real Estate Asset Management web application. The web application addresses the challenges faced by real estate investors who previously relied on various Excel spreadsheets to manage their multiple property portfolios. Managing these portfolios using spreadsheets was a tedious and time-consuming process, requiring significant effort to organize information effectively.

My solution provides an efficient user experience for accessing a SQL database that organizes all the information pertaining to a real estate portfolio and tracks it in one centralized location. This application streamlines the process of growing and managing a real estate portfolio by minimizing the administrative tasks that investors need to perform, such as manually inserting and deleting spreadsheet rows and columns. The saved time can now be redirected towards activities that generate revenue, thus enhancing the overall efficiency and profitability of managing real estate investments.

The motivation behind this project was to make the real estate investment process as efficient as possible, ensuring that our application helps investors focus on tasks that maximize their returns. The successful implementation of this project has provided real estate investors with a powerful tool to manage their portfolios more effectively and efficiently.

# Installation

To install and run the Real Estate Asset Management System locally, follow these steps:

1. Clone this repository to your local machine

```cmd
$ git clone https://github.com/aleksander-rudolf/real-estate-asset-management-system.git
```

2. Install the required packages and dependencies. Execute the following command in the "client" and "server" directories.

```cmd
$ npm install
```
3. Open the database file (real_estate_portfolio.sql) in MySql Workbench, and run it.

4. Navigate to the “server” directory and please update the user, host and password in “database.js” in accordance with your MySql Workbench settings.
 
5. Navigate to the "server" directory and start the development server. 

```cmd
$ node server.js
```
6. Navigate to the "client" directory and start the frontend user interface.

```cmd
$ npm start
```
7. Access the application at http://localhost:3000
