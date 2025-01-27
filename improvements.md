How to reproduce bug:

1. go to https://docs.exa.ai/reference/search
2. switch to python window in docs 
3. copy the code from the python window:
```python
import requests

url = "https://api.exa.ai/search"

payload = {
    "query": "Latest developments in LLM capabilities",
    "useAutoprompt": True,
    "type": "auto",
    "category": "research paper",
    "numResults": 10,
    "includeDomains": ["arxiv.org", "paperswithcode.com"],
    "excludeDomains": ["<string>"],
    "startCrawlDate": "2023-01-01T00:00:00.000Z",
    "endCrawlDate": "2023-12-31T00:00:00.000Z",
    "startPublishedDate": "2023-01-01T00:00:00.000Z",
    "endPublishedDate": "2023-12-31T00:00:00.000Z",
    "includeText": ["large language model"],
    "excludeText": ["course"],
    "contents": {
        "text": True,
        "highlights": {
            "numSentences": 1,
            "highlightsPerUrl": 1,
            "query": "Key advancements"
        },
        "summary": {"query": "Main developments"},
        "livecrawl": "always",
        "livecrawlTimeout": 1000,
        "subpages": 1,
        "subpageTarget": "sources",
        "extras": {
            "links": 1,
            "imageLinks": 1
        }
    }
}
headers = {
    "x-api-key": "<api-key>",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
```
4. insert api key from the dashboard 
5. get the following error:

```
{"requestId":"aaf512feb7294b12dac5d98e509b4c7a","error":"Invalid request body | Invalid domain: <string>","tag":"INVALID_REQUEST_BODY"}
```

6. Fix by removing the "string" from the excludeDomains field:

```python
import requests

url = "https://api.exa.ai/search"

payload = {
    "query": "Latest developments in LLM capabilities",
    "useAutoprompt": True,
    "type": "auto",
    "category": "research paper",
    "numResults": 10,
    "includeDomains": ["arxiv.org", "paperswithcode.com"],
    "excludeDomains": [],
    "startCrawlDate": "2023-01-01T00:00:00.000Z",
    "endCrawlDate": "2023-12-31T00:00:00.000Z",
    "startPublishedDate": "2023-01-01T00:00:00.000Z",
    "endPublishedDate": "2023-12-31T00:00:00.000Z",
    "includeText": ["large language model"],
    "excludeText": ["course"],
    "contents": {
        "text": True,
        "highlights": {
            "numSentences": 1,
            "highlightsPerUrl": 1,
            "query": "Key advancements"
        },
        "summary": {"query": "Main developments"},
        "livecrawl": "always",
        "livecrawlTimeout": 1000,
        "subpages": 1,
        "subpageTarget": "sources",
        "extras": {
            "links": 1,
            "imageLinks": 1
        }
    }
}
headers = {
    "x-api-key": "<api-key>",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)
```


-------------

1. When making a request the following parameters can be set to narrow down the results to improve speed and quality:
```
"type": "auto",
"category": "research paper",
"numResults": 10,
"includeDomains": ["arxiv.org", "paperswithcode.com"],
"excludeDomains": [],
"startCrawlDate": "2023-01-01T00:00:00.000Z",
"endCrawlDate": "2023-12-31T00:00:00.000Z",
"startPublishedDate": "2023-01-01T00:00:00.000Z",
"endPublishedDate": "2023-12-31T00:00:00.000Z",
"includeText": ["large language model"],
"excludeText": ["course"],
...
```
2. before processing the actual response of the user we can use a llm to find the parameters first