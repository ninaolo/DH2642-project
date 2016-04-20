<!DOCTYPE html>
<html lang="en" ng-app="analytics">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

        <!-- Fonts -->
        <link href='https://fonts.googleapis.com/css?family=Lato:300,100,400' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Quicksand:600,400,300' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Raleway:600,500,400,300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

        <title>Meeter</title>

        <!-- Bootstrap -->
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet">

        <!-- Style -->
        <link href="css/site.css" rel="stylesheet">
        <link href="css/navbar.css" rel="stylesheet">

        <script>
            var baseUrl = "http://localhost:81/DH2642-project/analytics/public";
            var apiUrl = "http://localhost:81/DH2642-project/analytics/public/api";
        </script>

    </head>

    <body>

    <div id="wrap">
        <div id="main">

        <ng-include src="'partials/navbar.html'" ng-controller="homeController"></ng-include>

            <!-- Main Angular content -->
            <div ng-view></div>

        </div>
    </div>

    <div id="footer">
        <div class="container">

                <div class="container-fluid">
                    <div class="row">

                        <div class="col-md-4">
                            </br>
                            <h4>Meeter</h4>
                            <p>Create meeting agendas with your colleagues.</p>
                            </br>
                        </div>

                        <div class="col-md-4">
                            </br>
                            <h4>CONTACT</h4>
                            <p>Email: meeter@mail.com</p>
                        </div>

                        <div class="col-md-4">
                            </br>
                            <h4>Follow us</h4>
                            <h6><a href=""><i class="fa fa-btn fa-facebook-square"></i></a>
                               <a href=""><i class="fa fa-btn fa-twitter-square"></i></a>
                               <a href=""><i class="fa fa-btn fa-instagram"></i></h6></a>
                        </div>
                    </div>
                </div>

        </div>
    </div>


    <!-- jQuery -->
    <script src="bower_components/jquery/dist/jquery.js"></script>

    <!-- Bootstrap JavaScript, needed if you want for instance tabs, models, popovers etc. -->
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Angular JavaScript including routing and resource modules  -->
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-route/angular-route.min.js"></script>
    <script src="bower_components/angular-resource/angular-resource.min.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.min.js"></script>
        <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>

    <!-- Moment.js for dates -->
    <script src="bower_components/moment/moment.js"></script>
    <script src="bower_components/angular-moment/angular-moment.js"></script>

    <!-- Include ScrollMagic and GSAP -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js"></script>

    <!-- Modules -->
    <script src="js/app.js"></script>

    <!-- Controllers -->
    <script src="js/controllers/homeController.js"></script>
    <script src="js/controllers/userController.js"></script>
    <script src="js/controllers/profileController.js"></script>
    <script src="js/controllers/colleaguesController.js"></script>
    <script src="js/controllers/agendaController.js"></script>

    <!-- Directives -->
    <script src="js/directives/droppable.js"></script>
    <script src="js/directives/draggable.js"></script>

    <!-- Services -->
    <script src="js/services/userService.js"></script>
    <script src="js/services/agendaService.js"></script>

    </body>

</html>
