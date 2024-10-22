import praw
import pandas as pd
from datetime import datetime

# 设置你的 Reddit API 凭据
reddit = praw.Reddit(
    client_id='nAaQGwKKoMu2QZOkVBF36w',          # 替换为你的client_id
    client_secret='CyRtAE1dH4YQ_dhFVSgqTYyDPJ7Xew',    # 替换为你的client_secret
    user_agent='my_reddit_scraper by u/your_reddit_username'          # 可以填写任意描述性字符串
)
# 爬取 'nba' subreddit 的最新帖子
subreddit = reddit.subreddit('worldnews')

# 存储帖子和评论数据的列表
posts_data = []

# 设置要爬取的帖子数量
post_limit = 1200  # 我们希望获取1500条信息
batch_size = 100  # 每次请求最多获取100条

# 获取帖子
last_submission = None  # 记录最后一个帖子的ID
while len(posts_data) < post_limit:
    if last_submission:
        # 如果有最后一条的 ID，接着从这条后继续爬取
        submissions = subreddit.new(limit=batch_size, params={"after": last_submission})
    else:
        # 第一次直接获取最新的帖子
        submissions = subreddit.new(limit=batch_size)
    
    for submission in submissions:
        # 将 UTC 时间戳转换为易读的日期格式
        post_date = datetime.utcfromtimestamp(submission.created_utc).strftime('%Y-%m-%d %H:%M:%S')

        # 获取每个帖子的基础信息
        post_info = {
            'subreddit': submission.subreddit.display_name,
            'Date': post_date,
            'User': submission.author.name if submission.author else 'N/A',
            'Content': submission.title
        }

        # 获取评论（可选，限制评论数量避免过多数据）
        submission.comments.replace_more(limit=0)
        comments = []
        for comment in submission.comments.list():
            comments.append(comment.body)

        # 将评论添加到数据
        post_info['Comments'] = " || ".join(comments[:5])  # 每个帖子保存前5条评论

        # 将信息加入数据列表
        posts_data.append(post_info)

        # 更新最后一个帖子的ID
        last_submission = submission.id

        # 如果数据已经达到了目标数量，则停止
        if len(posts_data) >= post_limit:
            break

# 将数据转换为 pandas DataFrame
df = pd.DataFrame(posts_data)

# 保存为 CSV 文件
df.to_csv('reddit_nba_posts_1200worldnews.csv', index=False)

print(f"成功获取了 {len(posts_data)} 条帖子并保存为 'reddit_nba_posts_1200worldnews.csv'")
