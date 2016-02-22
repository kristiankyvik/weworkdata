import feedparser
from dateutil.parser import parse
import re

URL = 'http://careers.stackoverflow.com/jobs/feed?searchTerm=data+science'

def getJobs():
	queries = []
	jobs = feedparser.parse(URL)['entries']
	for job in jobs:
		print job
		job_url =  job['link']
		job_ref_number = job_url.split('/')[-2]
		job_title = getTitle(job['title'])
		job_company = job['author']
		if job.has_key("location"):
			job_location = job['location']
		job_description =  job['summary_detail']['value']
		job_language = job['summary_detail']['language']
		job_published = parse(job['published'])
		job_logo = job['author'].lower().replace(" ", "")

		if 'tags' in job:
			job_tags = [ tag['term'] for tag in job['tags']]

		q = buildQuery(job_ref_number, job_title, job_company, job_location, job_description, job_url, job_language, job_published, job_logo, 0)

		if 'data' in job_title.lower():
			queries.append(q)
	return queries

def getTitle(full_title):
	return full_title[0:full_title.rfind(' at ')]

def buildQuery(ref_num, title, company, location, description, url, language, published, logo, premium):
	query = 'INSERT INTO  job(ref_number, title, company, location, description, url, language, published, logo, premium)' + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
	params = (ref_num, title, company, location, description, url, language, published, logo, premium)
	q = [query, params]
	return q



