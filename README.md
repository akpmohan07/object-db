# About
This Project was one of the Interview Round by [Freshworks](https://www.freshworks.com/).
Project Time - ***`72 hours`***
## Problem Statement
Build a file-based key-value data store that supports the basic CRD (create, read, and delete) operations. This data store is meant to be used as local storage for one single process on one laptop. The datastore must be exposed as a library to clients that can instantiate a class and work with the data store. [Details](https://github.com/akpmohan07/object-db/blob/main/Readme%20Files/Engg%20-%20assignment.pdf)
## Environment Requirements

    node  14.15.1 
https://nodejs.org/en/download/

https://nodejs.org/download/release/v14.15.1/

https://nodejs.org/dist/v14.15.1/docs/api/

If you have `nvm`.You can install **node 14.15.1** by:

    nvm install 14.15.1
    nvm use 14.15.1

## How to run?
First, check node version.

    node -v
    v14.15.1

 - To create DB in Specified Path:
 
	    node app.js <absolute_path>
**Sample** : `node app.js /home/akpmohan/Fresh/Project/`

 - To create DB in Default Path:`node app.js`

 **Note:**

>  **Node version is very important.**

## Task
1. Understanding the Problem statement
2. Thinking Solution
3. Coding
4. Documentation

## Solution

 - Console Application to do CRD operation, Satisfying the functional and Non-Functional requirements.
 
 - I chose **Node.js** for development because I am currently learning it.
 
 - App will store data in **JSON** file. I chose the JSON as storing format because it is easy to access Key-Value Data.

## Application Flow
![flow](https://raw.githubusercontent.com/akpmohan07/object-db/main/Readme%20Files/flow_chart.png?raw=)



## Operation Supported:

 - Create
 - Read
 - Delete

## Functionalities Supported:

 - [x] It can be initialized using an optional file path. If one is
       not provided, it will reliably create itself in a reasonable
       location on the laptop.
 - [x] A new key-value pair can be added to the data store using the
       Create operation. The key is always a string - capped at 32chars.
       The value is always a JSON object - capped at 16KB.
 - [x] If Create is invoked for an existing key, an appropriate error
       must be returned
 - [x] A Read operation on a key can be performed by providing the key,
       and receive the value in the response, as a JSON object.
 - [x] A Delete operation can be performed by providing the key.
 - [x] Appropriate error responses must always be returned to a client
       if it uses the data store in unexpected ways or breaches any
       limits.
 - [x] The size of the file storing data must never exceed 1GB.

   
## Upcoming Features:
 - [ ] Every key supports setting a Time-To-Live property when it is created. This property is optional. If provided, it will be evaluated as an integer defining the number of seconds the key must be retained in the data store. Once the Time-To-Live for a key has expired, the key will no longer be available for or Delete operations
 - [ ] The client will bear as little memory costs as possible to use this data store while deriving maximum performance with respect to response times for accessing the data store.
 
## Technology Stack
 -  Node.js
 
## Library Used
 - fs (File system for accessing files)
## Tools Used
 - Github
 - VS code

                             ***Thank You***
