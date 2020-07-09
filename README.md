#Overview:

A prototype of a typical museum collection search is offered.  Functions include
a search box that allows a user to enter words and get back results that match.  
Results are displayed in an image carousel (lightbox).  Details of the artwork
are shown in an accordian area below.   The main image in the carousel
can be clicked upon to see it in high-res and to download it and zoom it (note that
there is a bug in this area currently and the image sometimes doesn't respond
to the click and will need extra clicks before the image browser opens).

Obviously this is just a demo that I can get something working.  There are better ways
to do all of the things that were done but in the interest of time I kept it to a basic artwork
lookup and browse function.   

##Question 1: Read SQLite database and emit JSON

My solution is in /src/dbmigrate.py.  This is a quick and dirty python script
that reads the database and creates one JSON collection called Artwork that
holds all the data about an artwork including all its creators, their roles, and the 
departments that the work is a member of.   The queries required some extra
tweaking to overcome some rather odd database issues such as duplicated creator/role
information for artworks.  The question asked that JSON be exported to a file and 
that this file then be used as input to the program written for question 2.  
I didn't believe this made a lot of sense because a simple file containing
JSON is far less useful than a SQLite database if one is writing a web app to
search a collection.  Therefore, I exported the JSON to a Mongo database which
a web app can use more productively to lookup information.  So you see I am
using the python libraries sqlite3 and pymongo to get the database read in and exported.



##Question 2:  Create a web site to view the collection

I'm using a combination of Python/Flask for the back-end and React for the front end.
/src/app.py is the Flask REST API with one endpoint /api/artwork/search.  This returns
JSON records that match the search string.  The React front-end then displays these
records in simple web page implemented in /ui/src/App.js which has several components
I developed and some third-party ones (react-image-show and react-modal-image) that
I used/modified for this purpose.  The website UI is a place where one can spend much
time trying out ideas and correcting flaws.  I got it to a workable state.  I doubt
it would look good on a phone.  It should look fine in Google Chrome.

# How to set up and run

After clone from github to <cma-dir>

**_MongoDb needs to be installed and running on machine._**

**_python 3.X must be installed on machine._**

_**node and npm must be installed on machine.**_




###Python Flask back-end including SQLite database and JSON utility

You need to be running Python 3.

`cd <cma-dir>`

`cd src`

Note the SQLite database given to us is in this directory

`python3 -m venv venv`

`source venv/bin/activate` (Linux/Mac OS)

You are now in a python virtual environment

`pip install -r requirements.txt`

`export MONGODB_PORT=27017`

If your MongoDb is running on a different port, set the above environment variable to the correct port

`python dbmigrate.py`

The MongoDb cma schema now has one collection called artwork which holds all
the information about the artworks. To verify this start a Mongo CLI and run
a simple query:

`mongo`

`>use cma`

`>db.artwork.find()`

We'll now start Flask. Port 5000 must be available.

`flask run&`

Flask server is now running on port 5000 as a background process.


### React Front-end 

Start a second terminal window 

`cd <cma-dir>`

`cd ui`

`npm install`

`npm start` 

The React server hosting the website is now running on port 3000 

Open Chrome browser to http://localhost:3000

You should see the demo Cleveland Museum of Art Collection Search Page

In search box enter some terms and click search button (e.g. canvas)

You can scroll through a collection with full description of the 
artwork (tombstone) shown below the scrolling carousel of images.

The selected main image can be more deeply expored by clicking on
it.  Currently there is bug in this and the image sometimes requires several
clicks (perhaps in different areas of image) before the image browser comes up.


