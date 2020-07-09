import sqlite3
from collections import defaultdict
import pymongo as pm
import os

db_path=__file__.replace('db_migrate.py', 'cma-artworks.db')

def get_connection ():
    # conn = sqlite3.connect('/srv/raiddisk/dev/pydev/cma/cma-artworks.db')
    conn = sqlite3.connect(db_path)
    return conn


def get_depts (conn, art_id):
    cur = conn.cursor()
    depts = []
    cur.execute(f'select name from department where id in (select department_id from artwork__department where artwork_id="{art_id}")')
    rows = cur.fetchall()
    for name, in rows:
        depts.append(name)

    return depts

def get_creators (conn, art_id):
    cur = conn.cursor()
    res = defaultdict(list)
    # need distict because rows in creator are duplicated (i.e. id is not a primary key because it replicates)
    cur.execute(f'select distinct role, description from creator where id in (select creator_id from artwork__creator where artwork_id="{art_id}")')
    rows = cur.fetchall()
    for role, description in rows:
        res[role].append(description)
    return res

def create_json (id=None):
    conn = get_connection()
    cur = conn.cursor()
    artworks = []
    if not id:
        cur.execute('select id,accession_number, title, tombstone from artwork')
    else:
        cur.execute(f'select id,accession_number, title, tombstone from artwork where id="{id}"')
    rows = cur.fetchall()
    for id, accession_number, title, tombstone  in rows:
        rec = {'id': id, 'accession_number': accession_number, 'title': title, 'tombstone': tombstone}
        creators = get_creators (conn, id)
        rec['creators'] = creators
        rec['departments'] = get_depts(conn, id)
        artworks.append(rec)
    return artworks

def add_artworks_to_mongo (artworks, port):
    client = pm.MongoClient(host="localhost", port=port)
    db = client.cma
    db.artwork.drop()
    db_artwork = db.artwork
    for a in artworks:
        db_artwork.insert_one(a)
    # mongo now has artwork document in the cma collection


default_mongo_port = 27017
mongo_port = os.environ.get("MONGODB_PORT", None)
if not mongo_port:
    print(f"MONGODB_PORT environment variable not set.  Assuming MongoDb is running on {default_mongo_port}")
    mongo_port = default_mongo_port

def main ():
    artwork_json = create_json()
    add_artworks_to_mongo(artwork_json, port=mongo_port)


main()