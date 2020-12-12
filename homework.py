import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
#import interpreter

#mongoDB
client = MongoClient('localhost', 27017)
db = client.dbsparta

#Web Access
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://wwㄴw.genie.co.kr/chart/top200?ditc=D&rtm=N&ymd=20200713', headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')

#################################################################################################################################################
#################################################################################################################################################

charts = soup.select('.newest-list > div > table > tbody>tr')
count =1

for chart in charts:
    song = chart.select_one('tr > td.info > a')
    artist = chart.select_one('tr > td.info > a.artist')
    print(count, song.text.strip(), artist.text)

    count +=1

    doc = {
        'song': song.text.strip(),
        'artist': artist.text,
    }

    db.charts.insert_one(doc)

#body-content > div.newest-list > div > table > tbody
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1)
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1) > td.info > a.artist.ellipsis
#body-content > div.newest-list > div > table > tbody > tr:nth-child(2) > td.info > a.title.ellipsis