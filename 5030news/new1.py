import praw

# 使用你的 Reddit API 凭据
reddit = praw.Reddit(
    client_id='nAaQGwKKoMu2QZOkVBF36w',          # 替换为你的client_id
    client_secret='CyRtAE1dH4YQ_dhFVSgqTYyDPJ7Xew',    # 替换为你的client_secret
    user_agent='my_reddit_scraper by u/your_reddit_username'          # 可以填写任意描述性字符串
)

# 获取 'news' subreddit 中的最新帖子
subreddit = reddit.subreddit('news')
for submission in subreddit.new(limit=1000):  # 获取5个最新帖子
    print(f"Title: {submission.title}")
    print(f"URL: {submission.url}")
    print(f"Upvotes: {submission.score}")
    print(f"Comments: {submission.num_comments}")
    print('-' * 40)
