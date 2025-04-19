#!/bin/bash

# 设置质量（可选），默认是 80
QUALITY=60


# 遍历当前目录下所有 .webp 文件
for file in *.webp; do
    # 跳过不存在匹配的情况
    [ -e "$file" ] || continue

    cwebp -q $QUALITY "$file" -o "$file"
    echo "✅ 重新压缩: $file → $OUTPUT"
done