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
I took the liberty of exporting my JSON objects to MongoDB (which does store the collection in a file that
it manages efficiently).  I saw you have MongoDb in your tech stack and so I'm sure you
see the wisdom of using a JSON based database rather than a text file containing JSON.
Using a variety of SQL queries
I created one Mongo collection, Artwork, which holds all the information relevant to
an Artwork and looks like this:

```
{
	"_id" : ObjectId("5f072776b94baa02ef0579a5"),
	"id" : "95191",
	"accession_number" : "1915.79.6",
	"title" : "Mercury tells Aeneas to Leave Carthage",
	"tombstone" : "Mercury tells Aeneas to Leave Carthage, 1679. Giovanni Francesco Romanelli (Italian, 1610-1662), Michael Wauters (Flemish, 1679). Tapestry weave: silk and wool; overall: 411 x 337 cm (161 13/16 x 132 11/16 in.). The Cleveland Museum of Art, Gift of Mrs. Francis F. Prentiss, in memory of Dr. Dudley P. Allen 1915.79.6",
	"creators" : {
		"designed by" : [
			"Giovanni Francesco Romanelli (Italian, 1610-1662)"
		],
		"woven by" : [
			"Michael Wauters (Flemish, 1679)"
		]
	},
	"departments" : [
		"Textiles"
	]
}
```

In /src/db_migrate.py you see I am
using the python libraries sqlite3 and pymongo to query all the data out of the SQLite database and export it
to the JSON (MongoDb) database.



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
`git clone git@github.com:marshall62/developer-code-test.git`


**_MongoDb needs to be installed and running on machine._**

**_python 3.X must be installed on machine._**

_**node and npm must be installed on machine.**_




###Python Flask back-end including SQLite database and JSON utility

You need to be running Python 3.

`cd developer-code-test`

`cd src`

Note the SQLite database given to us is in this directory

`python3 -m venv venv`

`source venv/bin/activate` (Linux/Mac OS)
'./venv/Scripts/activate' (Windows)

You are now in a python virtual environment

`pip install -r requirements.txt`

If you know that your MongoDB is running on port 27017 (the default) you can skip this.  Otherwise
you should set the MONGODB_PORT environment variable to your MongoDb port.  You
can determine the port with
`sudo lsof -iTCP -sTCP:LISTEN | grep mongo`

And set the environment variable:

`export MONGODB_PORT=27017` (Linux / Mac OS)

`set MONGODB_PORT=27017` (Windows)


Migrate the SQL db to MongoDB (JSON)

`python db_migrate.py`

The MongoDb cma schema now has one collection called artwork which holds all
the information about the artworks. To verify this start a Mongo CLI and run
a simple query:

`mongo`

`>use cma`

`> db.artwork.find({id: "95191"}).pretty()`

You'll see the record for _Mercury tells Aeneas to Leave Carthage_ 

`> exit`

We'll now start Flask. Port 5000 must be available.

`flask run&`

Flask server is now running on port 5000 as a background process.

This is the REST service.  To test, get in the browser and put in the URL:

`http://localhost:5000/api/artwork?accession_number=1915.79.6`


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


