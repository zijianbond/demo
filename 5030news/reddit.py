import snscrape.modules.reddit as sntrd
import pandas as pd
import time
query = "NBA"
start_time = time.time()
posts = []
for reddit in sntrd.RedditSubredditScraper(query).get_items():
#     print(vars(reddit))
    if not hasattr(reddit, 'title'):
        continue
    if len(posts) > 1000:
        break
    else:
        posts.append([reddit.subreddit, reddit.date, reddit.author, reddit.title])
end_time = time.time()
print("time: ", end_time-start_time)
df = pd.DataFrame(posts, columns = ["subreddit","Date", "User", "Content"])
print(len(df))
df  