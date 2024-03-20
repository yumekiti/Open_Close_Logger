import sys
import requests

url = "http://localhost:8080"

headers = {"Accept": "", "Content-Type": "application/json"}
payload = {"position": "asd", "status": "1"}

response = requests.request("POST", url, headers=headers, json=payload)

print(response.text)
