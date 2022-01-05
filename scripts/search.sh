#!/bin/sh

APPLICATION_ID=$1
API_KEY=$2
INDEX_NAME=$3
START_URLS=$4

git clone https://github.com/cxblovecw/docsearch-scraper
cd docsearch-scraper
yarn set-up $APPLICATION_ID $API_KEY $INDEX_NAME $START_URLS
pip install pipenv
pipenv install
pipenv run make search