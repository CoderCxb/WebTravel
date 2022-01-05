#!/bin/sh

# 获取所需参数
APPLICATION_ID=$1
API_KEY=$2
INDEX_NAME=$3
START_URLS=$4

# 克隆爬虫项目
git clone https://github.com/cxblovecw/docsearch-scraper
cd docsearch-scraper

# 初始化.env和config.json文件
yarn set-up $APPLICATION_ID $API_KEY $INDEX_NAME $START_URLS

# 安装pipenv
pip install pipenv

# 根据Pipfile.lock安装python依赖
pipenv install

# 原本是使用pipenv shell进入脚本环境, 然后make search
# 但是进入脚本环境后命令不好传入,就修改了执行命令的方式
pipenv run make search