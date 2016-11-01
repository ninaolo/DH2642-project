# Office Social Network

This is a project by Nina Olofsson and Li Wirström.

The old project idea can be found in the file IDEA.md. However, Google Analytics Real-time API is in beta and needs registration. We therefore changed our project idea to a meeting agenda builder, which we put into a kind of social network for an office.

## Frontend
The frondend part of this project can be found in the `analytics/public` folder. It's written with the AngularJS framework, HTML5 and CSS3.

## Backend
The backend is written in the PHP Laravel framework and contains a RESTful API. The routes for the API can be found in `analytics/app/Http/routes.php` and these are called by the frontend. The models can be found in `analytics/app` and the controllers in `analytics/Http/Controllers`.
