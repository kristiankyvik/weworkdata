import sqlite3
from apscheduler.scheduler import Scheduler
import time
import json
from flask import Flask,render_template, jsonify, request
from contextlib import closing
from stackOverflowFeed import getJobs
from flask.ext.cors import CORS
import stripe


# dbconfiguration
DATABASE = 'tmp/datajobs.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'admin'

app = Flask(__name__)
CORS(app)
app.config.from_object(__name__)
db = sqlite3.connect(app.config['DATABASE'])

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/charge', methods=['POST'])
def charge():
  stripe.api_key = "sk_test_kt0ZMlmxvI3pk5rYJNRA5D7C"
  data = request.json
  stripeData = data['stripeData']
  data = data['jobData']
  try:
    charge = stripe.Charge.create(
        amount=1000,
        currency="eur",
        source=stripeData['id'],
        description="Example WeWorkData charge"
    )
  except stripe.error.CardError, e:
    return "payment unsuccsefull"
    pass
  job_query = 'INSERT INTO  job(ref_number, title, company, location, requirement, type, url, published, logo, premium)' + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
  params = ('0000000', data['title'], data['company'].strip(), data['location'], data['requirement'],  data['type'],  data['url'].strip(), data['published'], data['company'].lower().strip(), data['premium'])
  db = sqlite3.connect(app.config['DATABASE'])
  cursor = db.cursor()
  cursor.execute(job_query, params)
  id_job = cursor.lastrowid
  for tag in data['tags']:
    id_tag = tag['value']
    tag_query = 'INSERT INTO job_tag (id_tag, id_job) VALUES (' + str(id_tag) + ',' + str(id_job) +');'
    cursor.execute(tag_query)
  db.commit()
  db.close()
  return jsonify({
                'status': 202,
                'msg': "payment received and job posted"
                })


@app.route('/submitJob', methods=['POST'])
def submitJob():
  data = request.json
  job_query = 'INSERT INTO  job(ref_number, title, company, location, requirement, type, url, published, logo, premium)' + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
  params = ('0000000', data['title'], data['company'].strip(), data['location'], data['requirement'],  data['type'],  data['url'].strip(), data['published'], data['company'].lower().strip(), data['premium'])
  db = sqlite3.connect(app.config['DATABASE'])
  cursor = db.cursor()
  cursor.execute(job_query, params)
  id_job = cursor.lastrowid
  for tag in data['tags']:
    id_tag = tag['value']
    tag_query = 'INSERT INTO job_tag (id_tag, id_job) VALUES (' + str(id_tag) + ',' + str(id_job) +');'
    cursor.execute(tag_query)
  db.commit()
  db.close()
  return jsonify({
                'status': 420,
                'msg': "payment received and job posted"
                })

@app.route('/jobs')
def data():
  tag_data = query_db('SELECT id, title FROM tag;')
  tags = {}
  for tag in tag_data:
    tags[tag['id']] = tag['title']
  job_data = query_db('SELECT id, title, company, location, url, published, logo, premium, type FROM job WHERE published >= date("now","-45 days") ORDER BY premium DESC, published DESC;')
  return jsonify({
                  'jobs': job_data,
                  'tags': tags
                  })

def query_db(query, args=(), one=False):
  db = sqlite3.connect(app.config['DATABASE'])
  cur = db.cursor()
  cur.execute(query, args)
  r = [dict((cur.description[i][0], value) \
             for i, value in enumerate(row)) for row in cur.fetchall()]
  for job in r:
    query = 'SELECT id from tag INNER JOIN job_tag ON tag.id = job_tag.id_tag WHERE job_tag.id_job = ' + str(job['id']) + ';'
    cur.execute(query)
    tags = [row[0] for row in cur.fetchall()]
    job['tags'] = tags
  cur.connection.close()
  db.close()
  return (r[0] if r else None) if one else r

def addTags(db, job_id, description):
  tag_dicc = getTagDicc(db)
  for tag, id_tag in tag_dicc.iteritems():
      if description.lower().find(tag) >= 0:
        query = 'INSERT INTO job_tag (id_tag, id_job) VALUES (' + str(id_tag) + ',' + str(job_id) +');'
        db.execute(query)

def getTagDicc(db):
  query_result = query_db('SELECT id, title FROM tag;')
  tag_dicc = {}
  for tag in query_result:
    tag_id = int(tag['id'])
    tag_title = tag['title']
    tag_dicc[tag_title] = tag_id
  return tag_dicc

def addNewJobs():
  with app.app_context():
    db = sqlite3.connect(app.config['DATABASE'])
    cursor = db.cursor()
    stored_jobs = [int(item[0]) for item in cursor.execute('SELECT ref_number FROM job;')]
    new_jobs = getJobs()
    jobs_added = 0
    for job in new_jobs:
      if int(job[1][0]) not in stored_jobs:
        cursor.execute(job[0], job[1])
        addTags(db, cursor.lastrowid, job[1][4])
        jobs_added += 1
    db.commit()
    db.close()

if __name__ == '__main__':
  addNewJobs()
  apsched = Scheduler()
  apsched.start()
  apsched.add_interval_job( addNewJobs, hours=1)
  app.run(debug=True, use_reloader=False, port=8000)







