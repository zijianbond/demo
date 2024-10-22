import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import string

# 第一次运行时下载stopwords
nltk.download('stopwords')

# 读取 CSV 文件
df = pd.read_csv('reddit_nba_posts_1500new.csv')  # 替换为你的 CSV 文件路径

# 合并所有新闻内容和评论作为文本数据源
text_data = ' '.join(df['Content'].fillna(''))  # 填充空值并合并内容

# 转换为小写，移除标点符号
text_data = text_data.lower().translate(str.maketrans('', '', string.punctuation))

# 加载常见的英文停用词
stop_words = set(stopwords.words('english'))

# 分割文本为单词列表，并去掉停用词
words = [word for word in text_data.split() if word not in stop_words]

# 统计词频
word_counts = Counter(words)

# 显示词频最高的前200个单词
top_200_words = word_counts.most_common(200)

# 将词频数据转换为 DataFrame，方便保存和展示
word_count_df = pd.DataFrame(top_200_words, columns=['word', 'count'])

# 显示结果
print(word_count_df)

# 保存结果为 CSV 文件
word_count_df.to_csv('word_frequencies1500.csv', index=False)
