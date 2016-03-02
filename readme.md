### Blog App with Angular 2 + Redux pattern

Angular 2 starter with TypeScript RxJS Gulp4 Express(Server) and MongoDB

This repository is an example of how to build a Flux/Redux-like Angular 2 application using RxJs and Functional Reactive Programming.

### Blog App Structure

The Blog App is developed using the Redux Pattern Where the project it's not using any Redux library,

it's using RxJS Observables simulating the 3 principal characteristics:

- Single Source of Truth

- State of the App is immutable

- Changing the state its only with Pure Functions

Elements to consider for understanding the code are: Dependency Injection, RxJS Observable, and Redux Pattern, ES6 etc...

To Run the blog App it's recommended to open the browser and shrink it to the minimum simulating an mobile screen, cause it is mobile first design pattern and its css is not completed for bigger screen's

### To run this repo

- git clone the repo

- cd to client folder and run gulp, server running in port 3000 // note for calling the server change the static ip for your ip this was made for testing the in real mobile devices :D

- cd to server folder and run gulp, server running in port 8000
