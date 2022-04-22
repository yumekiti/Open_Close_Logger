import sys
import requests

url = "http://localhost:8080"

payload='status=' + sys.argv[1]
headers = {
  'Accept': '',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
