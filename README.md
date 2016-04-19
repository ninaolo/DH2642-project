# DH2642-project

This is a project by Nina Olofsson, Li Wirström, Pontus Falk and Satu Cahaya Langit.

The old project idea can be found in the file IDEA.md. However, Google Analytics Real-time API is in beta and needs registration. Additionally, we might have needed to look into sockets etc. in order to get it to work. We therefore changed our project idea to the meeting agenda builder.

## Frontend
The frondend part of this project can be found in the `analytics/public` folder. It's written with the AngularJS framework, HTML5 and CSS3.

## Backend
The backend is written in the PHP Laravel framework and contains a RESTful API. The routes for the API can be found in `analytics/app/Http/routes.php` and these are called by the frontend. The models can be found in `analytics/app` and the controllers in `analytics/Http/Controllers`.
