import flask_api
import pymongo as pmg
from flask import request, render_template, jsonify
from model import Artwork
import os

app = flask_api.FlaskAPI(__name__)
default_mongo_port = 27017
mongo_port = os.environ.get("MONGODB_PORT", None)
if not mongo_port:
    print(f"MONGODB_PORT environment variable not set.  Assuming MongoDb is running on {default_mongo_port}")
    mongo_port = default_mongo_port

@app.route("/api/artwork", methods=['GET'])
def artwork ():
    access_num = request.args.get('accession_number')
    client = pmg.MongoClient()
    db = client.cma
    rec = db.artwork.find_one({'accession_number': str(access_num)})
    rec['image'] = '/images/' + rec['accession_number']+'_reduced.jpg'
    artwork = Artwork(rec)
    return render_template('artwork.html', artwork=artwork)

@app.route("/api/artwork/search", methods=['GET'])
def artwork_search ():
    search_str = request.args.get('search_string')
    client = pmg.MongoClient(host="localhost", port=mongo_port)
    db = client.cma
    recs = db.artwork.find({ '$text': { '$search': search_str}})
    res = [Artwork(r, image_path='/static').toJSON() for r in recs]
    return jsonify(res)