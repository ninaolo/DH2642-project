#Awesome Google Analytics Simplifier
##Making Analytics work For You

##Project Idea

We will do a _Google Analytics Simplifier_ using HTML5 and JavaScript. We will use AngularJS for the frontend manipulation of data. Google Analytics is a tool which makes it possible to get statistics from your own web page, such as number of user sessions during a certain period, number of visitors, advertising money spent this month et cetera. This makes it a very useful tool for companies when analyzing their users’ behavior and such. 
The problem is that not everyone knows how to use Google Analytics, and therefore only look at the reports which Google automatically creates for you. It is not easy or fun to follow the statistics real-time. 
Our proposal is to create a web app which provides this functionality where a user can create a customized, nice looking view with exactly the data that is relevant for that person. It should also be possible to have other settings in the app. 
For example:
A user could choose to get desktop notifications when there are more than X users on the site
When number of viewers per week is less than X
Referal rate from a web site is less than X.

##Some links with documentation

* Google Analytics Metrics: https://developers.google.com/analytics/devguides/reporting/core/dimsmets
* Google Analytics API v3: https://developers.google.com/apis-explorer/?hl=en_US#p/analytics/v3/

##Some details on every goal

### Several different views on the same model
* `Help` view.
* `Profile` views (the user can add multiple profiles which show different types of data in a nice and understandable way).
* `Settings` view for every profile.
* `Create new profile` view.
* `Profiles overview` view.

###Model
The model contains information about each profile. A profile holds the preferred Google Analytics metrics to show, their grouping and positions on the profile screen/view. Each profile can also have specific settings such as name of the profile, background color for the view et cetera.

The model also contains information about the whole app, such as which website it is connected to and retrieving statistics from.

###Interaction on model data
* Drag and drop feature for individual metrics groupings.
* Checkboxes to select data display. Can be bar, pie chart, and so on.

###External data through REST API & persisting the data
* We will use the Google Analytics external API to fetch web page statistics from.
* We will set up a simple API using Java for profile persistence.
