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

        <title>Analytics Simplifier</title>

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

                      <a href="#/">Analytics Simplifier</a>

                    </div>
                    <div id="navbar" class="navbar-collapse collapse" ng-controller="navController">
                      <ul class="nav navbar-nav navbar-right" ng-switch on="loggedIn">
                        <li><a href="#/about">About us</a></li>

                        <li ng-switch-when="false"><a href="#/register">Register</a></li>
                        <li ng-switch-when="false"><a href="#/login">Log in</a></li>

                        <li class="dropdown" ng-switch-when="true">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{user.name}} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" role="menu">
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
                            <h4>ANALYTICS SIMPLIFIER</h4>
                            <p>Blablabla.</p>
                            </br>
                        </div>

                        <div class="col-md-4">
                            </br>
                            <h4>CONTACT</h4>
                            <p>Email: analytics@mail.com</p>
                            <p>Phone: 070000000</p>
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

    <!-- Directives -->

    <!-- Services -->
    <script src="js/services/userService.js"></script>

    </body>

</html>
