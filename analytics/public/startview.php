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
            var baseUrl = "http://localhost/DH2642-project/analytics/public";
            var apiUrl = "http://localhost/DH2642-project/analytics/public/api";
        </script>

    </head>

    <body>

    <div id="wrap">
        <div id="main">

                <nav class="navbar navbar-inverse navbar-fixed-top">
                  <div class="container-fluid">
                    <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>

                      <a id="meeter-home" href="#/"><i id="meeter-suitcase" class="fa fa-btn fa-briefcase"></i> Meeter</a>

                    </div>
                    <div id="navbar" class="navbar-collapse collapse" ng-controller="navController">
                      <ul class="nav navbar-nav navbar-right" ng-switch on="loggedIn">
                        <li><a href="#/about">Meeter FAQ</a></li>

                        <li ng-switch-when="true"><a href="#/colleagues">Colleagues</a></li>

                        <li class="dropdown" ng-switch-when="true">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{user.name}} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#/profile/{{user.id}}"><i class="fa fa-btn fa-user"></i> Profile</a></li>
                                <li><a href="#/agenda/new"><i class="fa fa-btn fa-plus"></i> New agenda</a></li>
                                <li><a href="#/logout"><i class="fa fa-btn fa-sign-out"></i> Log out</a></li>
                            </ul>
                        </li>

                      </ul>
                    </div>
                  </div>
                </nav>

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
                            <h4>NEWSLETTER</h4>
                            <p>Do you want our newsletter?</p>
                        </div>
                    </div>
                </div>

        </div>
    </div>


    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>

    <!-- Include ScrollMagic and GSAP -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.14.2/TweenMax.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js"></script>

    <!-- Include the AngularJS library -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-route.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-cookies.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.3/angular-resource.min.js"></script>

    <!-- Modules -->
    <script src="js/app.js"></script>

    <!-- Controllers -->
    <script src="js/controllers/navController.js"></script>
    <script src="js/controllers/userController.js"></script>
    <script src="js/controllers/profileController.js"></script>
    <script src="js/controllers/colleaguesController.js"></script>
    <script src="js/controllers/agendaController.js"></script>

    <!-- Directives -->
    <script src="js/directives/droppable.js"></script>
    <script src="js/directives/draggable.js"></script>

    <!-- Services -->
    <script src="js/services/userService.js"></script>

    </body>

</html>
