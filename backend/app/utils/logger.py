from datetime import datetime
 
def log_request(profile, query, response):
    with open("logs.txt", "a", encoding="utf-8") as f:
        f.write(f"{datetime.now().isoformat()} | {profile} | {query} | {response[:100]}...\n") 