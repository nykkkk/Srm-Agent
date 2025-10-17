export const mockData = `
# Markdown 完整语法示例

## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

---

## 文字格式

**粗体文字**  
*斜体文字*  
***粗斜体文字***  
~~删除线文字~~  
==高亮文字==  
上标：X^2^  
下标：H~2~O

## 列表

### 无序列表
- 列表项一
- 列表项二
  - 嵌套列表项
  - 另一个嵌套
- 列表项三

### 有序列表
1. 第一项
2. 第二项
   1. 嵌套有序
   2. 继续嵌套
3. 第三项

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个任务

---

## 链接和图片

[普通链接](https://www.example.com)  
[带标题的链接](https://www.example.com "示例网站")  
自动链接：<https://www.example.com>  
邮箱链接：<example@email.com>

![图片替代文本](https://via.placeholder.com/150 "图片标题")

---

## 引用

> 这是一个引用块
> 可以有多行内容
> 
> > 嵌套引用
> > 也很简单
>
> 引用中也可以包含**粗体**、*斜体*等格式

---

## 代码

行内代码：\`const example = "Hello World" \`

### 代码块
\`\`\`javascript
function helloWorld() {
  console.log("Hello, World!");
  return true;
}
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

\`\`\`css
.container {
  width: 100%;
  padding: 20px;
  background-color: #f0f0f0;
}
\`\`\`

---

## 表格

| 姓名 | 年龄 | 职业 | 状态 |
|------|------|------|------|
| 张三 | 25 | 工程师 | ✅ 在职 |
| 李四 | 30 | 设计师 | ❌ 离职 |
| 王五 | 28 | 产品经理 | ✅ 在职 |

### 对齐表格
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1 | 内容2 | 内容3 |
| 较长的内容 | 中间 | 123 |

---

## 数学公式（部分 Markdown 扩展）

行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

---

## 脚注

这是一个带有脚注的句子[^1]。  
这是另一个脚注[^2]。

[^1]: 这是第一个脚注的内容。
[^2]: 这是第二个脚注的内容，可以包含**格式**和\`代码\`。

---

## 定义列表（部分 Markdown 扩展）

术语一
: 这是术语一的定义

术语二
: 这是术语二的定义
: 这是同一个术语的第二个定义

---

## 特殊符号

### 转义字符
\*这不是斜体\*  
\# 这不是标题  
\[这不是链接\]

### 其他符号
© ® ™ → ← ↑ ↓ ⇨ ★ ☆ ♥ ♦ ♣ ♠

---

## 注释

<!-- 这是一个注释，在渲染时不可见 -->

---

## 表情符号

:smile: :heart: :+1: :rocket: :tada:

或者直接使用 Unicode 表情：😊 ❤️ 🚀 🎉

---

## 进度条（部分扩展）

进度： [==========] 100%  
进度： [====------] 50%

---

## 图表（Mermaid，部分扩展支持）

\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -->|是| C[执行操作]
    B -->|否| D[结束]
    C --> D
\`\`\`

\`\`\`mermaid
pie title 饼图示例
    "苹果" : 45.0
    "香蕉" : 25.5
    "橙子" : 29.5
\`\`\`

---

## 目录（部分扩展支持）

[TOC]

---

## 总结

这几乎涵盖了所有标准的 Markdown 语法元素，包括：
- 标题
- 文字格式
- 列表
- 链接和图片
- 引用
- 代码
- 表格
- 分割线
- 以及各种扩展语法

> **注意**：某些语法（如数学公式、Mermaid 图表、定义列表等）需要特定的 Markdown 解析器支持。
`

export const mockThinkCard = [
  {
    message: {
      type: 'top',
      status: 'create',
      title: '多Agents协作中...',
      agentNumber: [0, 0],
      process: 0,
    },
  },
  {
    message: {
      type: 'top',
      status: 'edit',
      title: '多Agents协作中....',
      agentNumber: [1, 4],
      process: 0,
    },
  },
  {
    message: {
      type: 'center',
      title: '行程规划分析 Agent',
      status: 'create',
    },
  },
  {
    message: {
      id: '1',
      type: 'center',
      title: '行程规划分析 Agent',
      subtitle: '接收用户任务',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  {
    message: {
      id: '1',
      type: 'center',
      content: '识别用户意图：生成差旅出行方案',
      process: 100,
      status: 'eidt',
    },
  },
  {
    message: {
      id: '2',
      type: 'center',
      title: '行程规划分析 Agent',
      subtitle: '接收用户任务1',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  {
    message: {
      id: '2',
      type: 'center',
      content: '识别用户意图：生成差旅出行方案1',
      process: 100,
      status: 'edit',
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      title: '去程机票预定 Agent',
      subtitle: '筛选合适的去程机票信息',
      process: 50,
      status: 'create',
      content: ``,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      content: `经三重唯独筛选：
    1.首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）`,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      content: `2.关键优势：黄金时段起降（06:25-08:20，符合商旅作息规律）`,
    },
  },
  {
    message: {
      id: `31`,
      type: 'bottom',
      status: 'edit',
      process: 100,
      content: `3.附加价值：直飞航班保障，避免中转耗时（经比对含中转航班平均增加4.5小时）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      title: '去程机票预定 Agent',
      subtitle: '筛选合适的去程机票信息',
      process: 50,
      status: 'create',
      content: ``,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      content: `经三重唯独筛选：
    1.首要考量：本场最短飞行时长（2小时55分钟，较平均值减少15%时长）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      content: `2.关键优势：黄金时段起降（06:25-08:20，符合商旅作息规律）`,
    },
  },
  {
    message: {
      id: `313`,
      type: 'bottom',
      status: 'edit',
      process: 100,
      content: `3.附加价值：直飞航班保障，避免中转耗时（经比对含中转航班平均增加4.5小时）`,
    },
  },
  {
    message: {
      type: 'top',
      status: 'edit',
      title: '多Agents协作中...',
      agentNumber: [4, 4],
      process: 100,
    },
  },
]

export const mockThinkCardStream = [
  // 1. 初始化顶部状态
  {
    message: {
      type: 'top',
      status: 'create',
      title: '多Agents协作中...',
      agentNumber: [0, 0],
      process: 0,
    },
  },
  { message: { id: 'pre', type: 'pre', status: 'create', content: '系' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '统' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '检' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '测' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '出' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '您' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '企' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '业' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '是' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '电' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '子' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '科' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '技' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '并' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '采' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '用' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'E' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'T' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'O' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '生' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '产' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '制' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '造' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '模' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '式' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '。' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'E' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'T' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'O' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '模' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '式' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '特' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '点' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '是' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '个' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '性' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '化' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '强' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '、' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '项' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '目' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '制' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '所' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '以' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '呆' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '滞' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '风' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '险' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '主' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '要' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '来' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '自' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '设' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '计' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '变' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '更' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '您' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '深' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '层' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '需' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '求' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '可' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '能' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '不' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '只' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '是' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '简' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '单' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '分' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '析' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '报' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '告' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '而' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '是' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '希' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '望' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '找' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '到' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '呆' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '滞' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '根' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '本' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '原' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '因' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '并' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '减' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '少' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '呆' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '滞' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '库' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '存' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '降' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '低' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '库' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '存' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '呆' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '滞' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '金' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '额' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '；' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '需' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '要' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '强' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '调' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '归' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '因' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '到' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '具' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '体' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '项' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '目' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '和' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '客' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '户' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '因' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '此' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '分' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '析' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '报' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '告' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '中' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '会' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '体' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '现' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '项' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '目' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '、' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'E' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'C' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: 'N' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '变' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '更' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '以' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '及' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '客' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '户' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '等' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '维' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '度' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '分' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '析' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '，' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '同' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '时' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '给' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '出' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '相' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '应' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '的' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '呆' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '滞' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '处' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '理' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '建' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '议' } },
  { message: { id: 'pre', type: 'pre', status: 'append', content: '。' } },
  // 顶部标题逐字输出 - 每个消息只包含当前字
  // 更新agent数量
  {
    message: {
      type: 'top',
      status: 'edit',
      title: '多Agents协作中....',
      agentNumber: [1, 4],
      process: 0,
    },
  },

  // 2. 创建中心区域
  {
    message: {
      type: 'center',
      title: '行程规划分析 Agent',
      status: 'create',
    },
  },
  // 3. 第一个中心项目
  {
    message: {
      id: '1',
      type: 'center',
      title: '',
      subtitle: '',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  // 中心项目内容逐字输出
  { message: { id: '1', type: 'center', status: 'append', content: '识', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '别', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '用', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '户', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '意', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '图', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '：', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '生', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '成', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '差', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '旅', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '出', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '行', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '方', process: 50 } },
  { message: { id: '1', type: 'center', status: 'append', content: '案', process: 100 } },

  // 4. 第二个中心项目
  {
    message: {
      id: '2',
      type: 'center',
      title: '',
      subtitle: '',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  // 第二个中心项目内容逐字输出
  { message: { id: '2', type: 'center', status: 'append', content: '识', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '别', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '用', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '户', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '意', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '图', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '：', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '生', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '成', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '差', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '旅', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '出', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '行', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '方', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '案', process: 50 } },
  { message: { id: '2', type: 'center', status: 'append', content: '1', process: 100 } },

  {
    message: {
      type: 'center',
      title: '采购智能风控Agent',
      status: 'create',
    },
  },
  {
    message: {
      id: 'risk-1',
      type: 'center',
      title: '企业生产模式分析',
      subtitle: '识别ETO模式特点及风险',
      content: '',
      process: 50,
      status: 'create',
    },
  },
  // 风险分析内容逐字输出
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '分', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '析', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: 'E', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: 'T', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: 'O', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '模', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '式', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '下', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '的', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '呆', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '滞', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '风', process: 50 } },
  { message: { id: 'risk-1', type: 'center', status: 'append', content: '险', process: 100 } },

  // 5. 第一个底部项目
  {
    message: {
      id: '31',
      type: 'bottom',
      title: '去程机票预定 Agent',
      subtitle: '筛选合适的去程机票信息',
      process: 50,
      status: 'create',
      content: '',
    },
  },
  // 底部项目内容逐字输出
  { message: { id: '31', type: 'bottom', status: 'append', content: '经', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '三', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '重', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '唯', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '独', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '筛', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '选', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '：', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '\n', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: ' ', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: ' ', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: ' ', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: ' ', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '1', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '.', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '首', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '要', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '考', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '量', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '：', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '本', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '场', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '最', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '短', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '飞', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '行', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '时', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '长', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '（', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '2', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '小', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '时', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '5', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '5', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '分', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '钟', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '，', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '较', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '平', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '均', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '值', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '减', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '少', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '1', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '5', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '%', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '时', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '长', process: 50 } },
  { message: { id: '31', type: 'bottom', status: 'append', content: '）', process: 100 } },

  // 底部风险分析项目
  {
    message: {
      id: 'risk-bottom-1',
      type: 'bottom',
      title: '呆滞库存分析 Agent',
      subtitle: '深度分析呆滞库存根本原因',
      process: 50,
      status: 'create',
      content: '',
    },
  },
  // 呆滞分析内容逐字输出
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '根', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '据', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'E', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'T', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'O', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '模', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '式', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '特', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '点', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '，', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '呆', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '滞', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '风', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '险', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '主', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '要', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '来', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '自', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '：', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '\n', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '1', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '.', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '设', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '计', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '变', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '更', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '（', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'E', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'C', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: 'N', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '）', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '\n', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '2', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '.', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '项', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '目', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '取', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '消', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '或', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '延', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '期', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '\n', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '3', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '.', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '客', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '户', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '需', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '求', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '变', process: 50 } },
  { message: { id: 'risk-bottom-1', type: 'bottom', status: 'append', content: '更', process: 100 } },
  //   {
  //     message: {
  //       type: 'top',
  //       status: 'edit',
  //       title: '多Agents协作中...',
  //       agentNumber: [4, 4],
  //       process: 100,
  //     },
  //   },
]

import { Supplier } from '@/components/Search'
export const recentAnalysis = [
  {
    id: 1,
    companyName: '深圳德稳电子科技有限公司',
    creditCode: '910000091212221311',
    date: '2025年10月10日',
    riskLevel: 'high', // high, medium, low
  },
  {
    id: 2,
    companyName: '大疆创新公司',
    creditCode: '910000091212221311',
    date: '2025年10月11日',
    riskLevel: 'medium',
  },
  {
    id: 3,
    companyName: '大疆创新公司',
    creditCode: '910000091212221311',
    date: '2025年10月11日',
    riskLevel: 'medium',
  },
]

export const mockSuppliers: Supplier[] = [
  { id: '1', companyName: '阿里巴巴集团', creditCode: '91330100MA2J4R4K0X' },
  { id: '2', companyName: '腾讯科技', creditCode: '91440300MA5FQ0QY6R' },
  { id: '3', companyName: '百度在线', creditCode: '911101087000000000' },
  { id: '4', companyName: '京东集团', creditCode: '91110302MA006YQY0F' },
  { id: '5', companyName: '华为技术', creditCode: '914403001922298216' },
  { id: '6', companyName: '小米科技', creditCode: '91110108MA006YQY0F' },
  { id: '7', companyName: '字节跳动', creditCode: '91110105MA7BQYQY0F' },
]

export const mockHistory = ['深圳德胜电子科技有限公司', '华为技术有限公司', '腾讯科技', '阿里巴巴集团', '字节跳动']

export const mockWsUrl = [
  {
    code: 200,
    message: 'success',
    data: { wsUrl: 'wss://chat.example.com' },
  },
]

export const mockHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>供应商风险详情</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
    
    <!-- 配置Tailwind自定义颜色 -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#165DFF',
                        highRisk: '#F53F3F',
                        mediumRisk: '#FF7D00',
                        lowRisk: '#00B42A',
                        normal: '#165DFF',
                        lightGray: '#F2F3F5',
                        cardGray: '#F7F8FA',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    
    <style type="text/tailwindcss">
        @layer utilities {
            .content-auto {
                content-visibility: auto;
            }
            .risk-tag {
                @apply text-xs px-2 py-0.5 rounded-full font-medium;
            }
            .card-shadow {
                @apply shadow-sm hover:shadow-md transition-shadow duration-200;
            }
            .expand-icon {
                @apply transition-transform duration-300;
            }
            .rotate-icon {
                @apply transform rotate-180;
            }
        }
    </style>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <!-- 顶部导航栏 -->
    <header class="bg-primary text-white p-4 relative">
        <button class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <i class="fa fa-arrow-left"></i>
        </button>
        <h1 class="text-center font-medium text-lg">供应商风险详情</h1>
    </header>

    <main class="container mx-auto p-4 max-w-4xl">
        <!-- 公司基本信息 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h2 class="text-xl font-semibold">深圳德胜电子科技有限公司</h2>
                    <p class="text-gray-500 text-sm mt-1">9110090113112221311</p>
                </div>
                <span class="risk-tag bg-mediumRisk/10 text-mediumRisk">中风险</span>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">存续</span>
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">合作供应商</span>
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">战略供应商</span>
            </div>
            
            <div class="flex justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
                <div>
                    <p class="text-gray-500">法定代表</p>
                    <p>王大锤</p>
                </div>
                <div>
                    <p class="text-gray-500">注册资本</p>
                    <p>13637.9万</p>
                </div>
                <div>
                    <p class="text-gray-500">成立日期</p>
                    <p>1995-01-23</p>
                </div>
                <div class="text-primary">
                    <a href="#" class="flex items-center">
                        查看简介 <i class="fa fa-angle-right ml-1"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- 整体风险评估洞察 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <h3 class="text-lg font-semibold mb-4">整体风险评估洞察</h3>
            
            <!-- 雷达图容器 -->
            <div class="flex justify-center mb-6">
                <div class="w-64 h-64 relative">
                    <canvas id="riskRadarChart"></canvas>
                </div>
            </div>
            
            <!-- AI整体解读 -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div class="flex items-center mb-2">
                    <i class="fa fa-lightbulb-o text-primary mr-2"></i>
                    <h4 class="font-medium">AI整体解读</h4>
                </div>
                <p class="text-sm mb-3">该公司整体风险处于中等水平，在产品质量和经营风险方面表现较好，但在供应链和财务风险方面需要重点关注。</p>
                
                <p class="text-sm font-medium mb-1">关键发现:</p>
                <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1 mb-3">
                    <li>司法风险：近一年有1起未结案合同纠纷，涉及金额80万元。</li>
                    <li>履约风险：近3个月交货准时率72%，低于合同约定的90%。</li>
                    <li>财务风险：XXXXXXXXXXXXXXXXXX</li>
                </ul>
                
                <a href="#" class="text-primary text-sm flex items-center">
                    查看完整分析 <i class="fa fa-angle-right ml-1"></i>
                </a>
            </div>
        </section>

        <!-- 风险速览 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">风险速览</h3>
                <span class="text-sm text-gray-500">共20项风险</span>
            </div>
            
            <!-- 高风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="high-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-highRisk mr-2"></div>
                        <span class="font-medium">高风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="high-risk-content" class="mt-3 pl-5 border-l-2 border-highRisk/30 space-y-3">
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">产品合格率</p>
                        <p class="text-sm text-gray-600 mt-1">最近一批次产品合格率为87%</p>
                    </div>
                    
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">准时交货率</p>
                        <p class="text-sm text-gray-600 mt-1">近三个月平均延迟率12.5%，较上季度上升8个百分点</p>
                    </div>
                    
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">订单交货周期</p>
                        <p class="text-sm text-gray-600 mt-1">近三个月平均延迟率12.5%，较上季度上升8个百分点</p>
                    </div>
                </div>
            </div>
            
            <!-- 中风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="medium-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-mediumRisk mr-2"></div>
                        <span class="font-medium">中风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="medium-risk-content" class="mt-3 pl-5 border-l-2 border-mediumRisk/30 hidden">
                    <!-- 中风险内容将通过JavaScript动态显示 -->
                </div>
            </div>
            
            <!-- 低风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="low-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-lowRisk mr-2"></div>
                        <span class="font-medium">低风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="low-risk-content" class="mt-3 pl-5 border-l-2 border-lowRisk/30 hidden">
                    <!-- 低风险内容将通过JavaScript动态显示 -->
                </div>
            </div>
            
            <!-- 正常 -->
            <div>
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="normal-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-normal mr-2"></div>
                        <span class="font-medium">正常</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="normal-content" class="mt-3 pl-5 border-l-2 border-normal/30 hidden">
                    <!-- 正常内容将通过JavaScript动态显示 -->
                </div>
            </div>
        </section>

        <!-- 全部风险详情 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold">全部风险详情</h3>
                <span class="text-sm text-gray-500">共31项指标</span>
            </div>
            
            <!-- 服务水平 -->
            <div class="mb-6">
                <div class="flex justify-between items-center cursor-pointer detail-section-header" data-target="service-level-content">
                    <h4 class="font-medium">服务水平</h4>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">5项异常</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="service-level-content" class="mt-4 hidden">
                    <!-- 服务水平内容 -->
                </div>
            </div>
            
            <!-- 经营风险 -->
            <div class="mb-6">
                <div class="flex justify-between items-center cursor-pointer detail-section-header" data-target="operation-risk-content">
                    <h4 class="font-medium">经营风险</h4>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">2项异常</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="operation-risk-content" class="mt-4 hidden">
                    <!-- 经营风险内容 -->
                </div>
            </div>
            
            <!-- 产品质量 -->
            <div class="mb-6">
                <div class="flex justify-between items-center cursor-pointer detail-section-header" data-target="product-quality-content">
                    <h4 class="font-medium">产品质量</h4>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">1项异常</span>
                        <i class="fa fa-angle-down expand-icon rotate-icon"></i>
                    </div>
                </div>
                
                <div id="product-quality-content" class="mt-4 space-y-6">
                    <!-- 产品合格率 -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-medium">产品合格率</p>
                            <span class="risk-tag bg-highRisk/10 text-highRisk">高风险</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg mb-3">
                            <p class="text-sm mb-1">检查结果: 最近一批次产品合格率为<span class="font-medium">87%</span></p>
                            <p class="text-sm text-gray-600">分值范围: 0.8~0.95</p>
                        </div>
                        
                        <div class="bg-blue-50 p-3 rounded-lg mb-4">
                            <div class="flex items-center mb-1">
                                <i class="fa fa-lightbulb-o text-primary mr-1 text-sm"></i>
                                <span class="text-sm font-medium">AI建议</span>
                            </div>
                            <p class="text-sm">启动质量审核程序，要求供应商提交整改报告，并进行现场评估。</p>
                        </div>
                        
                        <!-- 产品合格率分析图表 -->
                        <div>
                            <p class="text-sm font-medium mb-2 flex items-center">
                                <i class="fa fa-bar-chart text-gray-500 mr-1"></i>
                                产品合格率分析
                            </p>
                            <div class="h-48">
                                <canvas id="productRateChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 订单响应周期 -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-medium">订单响应周期</p>
                            <span class="risk-tag bg-normal/10 text-normal">正常</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-sm mb-1">检查结果: 从确认订单到发货的平均时间为0.5天，响应快</p>
                            <p class="text-sm text-gray-600">分值范围: 0~3天</p>
                        </div>
                    </div>
                    
                    <!-- 准时交货率 -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-medium">准时交货率</p>
                            <span class="risk-tag bg-mediumRisk/10 text-mediumRisk">中风险</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg mb-3">
                            <p class="text-sm mb-1">检查结果: 近三个月平均延迟率<span class="font-medium">12.5%</span>，较上季度上升8个百分点</p>
                            <p class="text-sm text-gray-600">分值范围: 0.8~0.95</p>
                        </div>
                        
                        <div class="bg-blue-50 p-3 rounded-lg">
                            <div class="flex items-center mb-1">
                                <i class="fa fa-lightbulb-o text-primary mr-1 text-sm"></i>
                                <span class="text-sm font-medium">AI建议</span>
                            </div>
                            <p class="text-sm">启动质量审核程序，要求供应商提交整改报告，并进行现场评估。</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 合规风险 -->
            <div>
                <div class="flex justify-between items-center cursor-pointer detail-section-header" data-target="compliance-risk-content">
                    <h4 class="font-medium">合规风险</h4>
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">正常</span>
                        <i class="fa fa-angle-down expand-icon"></i>
                    </div>
                </div>
                
                <div id="compliance-risk-content" class="mt-4 hidden">
                    <!-- 合规风险内容 -->
                </div>
            </div>
        </section>

        <!-- 改进建议 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa fa-list-ul text-primary mr-2"></i>
                改进建议
            </h3>
            
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="font-medium text-primary mb-2 flex items-center">
                        <i class="fa fa-link mr-2"></i>
                        供应链优化
                    </p>
                    <p class="text-sm text-gray-700">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="font-medium text-primary mb-2 flex items-center">
                        <i class="fa fa-money mr-2"></i>
                        财务管理
                    </p>
                    <p class="text-sm text-gray-700">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="font-medium text-primary mb-2 flex items-center">
                        <i class="fa fa-newspaper-o mr-2"></i>
                        舆情监控
                    </p>
                    <p class="text-sm text-gray-700">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
            </div>
        </section>

        <!-- 报告下载 -->
        <section class="bg-white rounded-lg p-5 mb-4 card-shadow">
            <p class="text-sm text-gray-500 mb-3">已经为您生成一份供应商报告</p>
            
            <div class="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-primary mr-3">
                        <i class="fa fa-file-text-o text-lg"></i>
                    </div>
                    <div>
                        <p class="text-sm font-medium">深圳德胜电子科技有限公司供应商风险报告</p>
                        <p class="text-xs text-gray-500">Markdown · 4MB</p>
                    </div>
                </div>
                <button class="text-primary text-sm flex items-center">
                    <i class="fa fa-download mr-1"></i> 下载
                </button>
            </div>
        </section>
    </main>

    <script>
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', function() {
            // 风险速览区域的展开/折叠功能
            const riskSectionHeaders = document.querySelectorAll('.risk-section-header');
            riskSectionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const icon = this.querySelector('.expand-icon');
                    
                    targetContent.classList.toggle('hidden');
                    icon.classList.toggle('rotate-icon');
                });
            });
            
            // 全部风险详情区域的展开/折叠功能
            const detailSectionHeaders = document.querySelectorAll('.detail-section-header');
            detailSectionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const icon = this.querySelector('.expand-icon');
                    
                    targetContent.classList.toggle('hidden');
                    icon.classList.toggle('rotate-icon');
                });
            });
            
            // 初始化雷达图
            const radarCtx = document.getElementById('riskRadarChart').getContext('2d');
            const riskRadarChart = new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: ['产品质量', '经营风险', '财务风险', '供应链', '舆情风险', '法律诉讼'],
                    datasets: [{
                        label: '风险值',
                        data: [65, 55, 80, 85, 60, 70],
                        backgroundColor: 'rgba(255, 125, 0, 0.2)',
                        borderColor: 'rgba(255, 125, 0, 1)',
                        pointBackgroundColor: 'rgba(255, 125, 0, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 125, 0, 1)'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // 初始化产品合格率图表
            const productRateCtx = document.getElementById('productRateChart').getContext('2d');
            const productRateChart = new Chart(productRateCtx, {
                type: 'line',
                data: {
                    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
                    datasets: [{
                        label: '合格率',
                        data: [300, 700, 900, 600, 500, 800],
                        borderColor: 'rgba(22, 93, 255, 1)',
                        backgroundColor: 'rgba(22, 93, 255, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // 为了演示，动态生成一些风险内容
            generateRiskContent('medium-risk-content', 'bg-orange-50', 10);
            generateRiskContent('low-risk-content', 'bg-green-50', 10);
            generateRiskContent('normal-content', 'bg-blue-50', 10);
        });
        
        // 生成风险内容的辅助函数
        function generateRiskContent(containerId, bgClass, count) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            let content = '';
            for (let i = 1; i <= count; i++) {
                content += \`
                    <div class="p-3 \${bgClass} rounded-lg">
                        <p class="font-medium text-sm">风险项 \${i}</p>
                        <p class="text-sm text-gray-600 mt-1">这是自动生成的风险项描述内容 \${i}</p>
                    </div>
                \`;
            }
            
            container.innerHTML = content;
        }
    </script>
</body>
</html>
`

export const mockHtml1 = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>供应商风险详情</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>
    
    <!-- 配置Tailwind自定义颜色 -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#165DFF',
                        highRisk: '#F53F3F',
                        mediumRisk: '#FF7D00',
                        lowRisk: '#00B42A',
                        normal: '#165DFF',
                        lightGray: '#F2F3F5',
                        cardGray: '#F7F8FA',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                    screens: {
                        'xs': '358px',
                    }
                }
            }
        }
    </script>
    
    <style type="text/tailwindcss">
        @layer utilities {
            .content-auto {
                content-visibility: auto;
            }
            .risk-tag {
                @apply text-xs px-2 py-0.5 rounded-full font-medium;
            }
            .card-shadow {
                @apply shadow-sm hover:shadow-md transition-shadow duration-200;
            }
            .expand-icon {
                @apply transition-transform duration-300;
            }
            .rotate-icon {
                @apply transform rotate-180;
            }
        }
        
        /* 响应式调整 */
        @media (max-width: 480px) {
            .responsive-grid {
                grid-template-columns: 1fr;
            }
            .responsive-text {
                font-size: 0.875rem;
            }
            .responsive-padding {
                padding: 1rem;
            }
        }
        
        /* 确保图表容器响应式 */
        .chart-container {
            position: relative;
            height: 200px;
            width: 100%;
        }
        
        /* 移动端优化 */
        @media (max-width: 360px) {
            .mobile-compact {
                padding: 0.75rem;
            }
            .mobile-text-sm {
                font-size: 0.8125rem;
            }
        }
    </style>
</head>
<body class="bg-gray-50 font-sans text-gray-800">
    <!-- 顶部导航栏 -->
    <header class="bg-primary text-white p-4 relative">
        <button class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <i class="fa fa-arrow-left"></i>
        </button>
        <h1 class="text-center font-medium text-lg sm:text-xl">供应商风险详情</h1>
    </header>

    <main class="w-full px-3 sm:px-4 py-4 max-w-full">
        <!-- 公司基本信息 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                <div class="flex-1 min-w-0">
                    <h2 class="text-lg sm:text-xl font-semibold break-words">深圳德胜电子科技有限公司</h2>
                    <p class="text-gray-500 text-sm mt-1 break-all">9110090113112221311</p>
                </div>
                <span class="risk-tag bg-mediumRisk/10 text-mediumRisk self-start sm:self-auto">中风险</span>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">存续</span>
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">合作供应商</span>
                <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">战略供应商</span>
            </div>
            
            <div class="grid grid-cols-2 sm:flex sm:justify-between text-sm text-gray-600 border-t border-gray-100 pt-3 gap-3 sm:gap-0">
                <div class="text-center sm:text-left">
                    <p class="text-gray-500 text-xs sm:text-sm">法定代表</p>
                    <p class="text-sm font-medium">王大锤</p>
                </div>
                <div class="text-center sm:text-left">
                    <p class="text-gray-500 text-xs sm:text-sm">注册资本</p>
                    <p class="text-sm font-medium">13637.9万</p>
                </div>
                <div class="text-center sm:text-left col-span-2 sm:col-auto">
                    <p class="text-gray-500 text-xs sm:text-sm">成立日期</p>
                    <p class="text-sm font-medium">1995-01-23</p>
                </div>
                <div class="text-primary hidden sm:block">
                    <a href="#" class="flex items-center text-sm">
                        查看简介 <i class="fa fa-angle-right ml-1"></i>
                    </a>
                </div>
            </div>
            
            <!-- 移动端查看简介按钮 -->
            <div class="sm:hidden text-primary mt-3 pt-3 border-t border-gray-100">
                <a href="#" class="flex items-center justify-center text-sm">
                    查看简介 <i class="fa fa-angle-right ml-1"></i>
                </a>
            </div>
        </section>

        <!-- 整体风险评估洞察 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <h3 class="text-lg font-semibold mb-4">整体风险评估洞察</h3>
            
            <!-- 雷达图容器 -->
            <div class="flex justify-center mb-6">
                <div class="w-48 h-48 sm:w-64 sm:h-64 relative">
                    <canvas id="riskRadarChart"></canvas>
                </div>
            </div>
            
            <!-- AI整体解读 -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div class="flex items-center mb-2">
                    <i class="fa fa-lightbulb-o text-primary mr-2"></i>
                    <h4 class="font-medium text-sm sm:text-base">AI整体解读</h4>
                </div>
                <p class="text-xs sm:text-sm mb-3 leading-relaxed">该公司整体风险处于中等水平，在产品质量和经营风险方面表现较好，但在供应链和财务风险方面需要重点关注。</p>
                
                <p class="text-xs sm:text-sm font-medium mb-1">关键发现:</p>
                <ul class="text-xs sm:text-sm text-gray-700 list-disc pl-4 space-y-1 mb-3">
                    <li class="leading-relaxed">司法风险：近一年有1起未结案合同纠纷，涉及金额80万元。</li>
                    <li class="leading-relaxed">履约风险：近3个月交货准时率72%，低于合同约定的90%。</li>
                    <li class="leading-relaxed">财务风险：XXXXXXXXXXXXXXXXXX</li>
                </ul>
                
                <a href="#" class="text-primary text-xs sm:text-sm flex items-center">
                    查看完整分析 <i class="fa fa-angle-right ml-1"></i>
                </a>
            </div>
        </section>

        <!-- 风险速览 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">风险速览</h3>
                <span class="text-xs sm:text-sm text-gray-500">共20项风险</span>
            </div>
            
            <!-- 高风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="high-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-highRisk mr-2"></div>
                        <span class="font-medium text-sm sm:text-base">高风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 text-xs sm:text-sm mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon text-sm"></i>
                    </div>
                </div>
                
                <div id="high-risk-content" class="mt-3 pl-4 sm:pl-5 border-l-2 border-highRisk/30 space-y-3">
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">产品合格率</p>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">最近一批次产品合格率为87%</p>
                    </div>
                    
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">准时交货率</p>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">近三个月平均延迟率12.5%，较上季度上升8个百分点</p>
                    </div>
                    
                    <div class="p-3 bg-red-50 rounded-lg">
                        <p class="font-medium text-sm">订单交货周期</p>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">近三个月平均延迟率12.5%，较上季度上升8个百分点</p>
                    </div>
                </div>
            </div>
            
            <!-- 中风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="medium-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-mediumRisk mr-2"></div>
                        <span class="font-medium text-sm sm:text-base">中风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 text-xs sm:text-sm mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon text-sm"></i>
                    </div>
                </div>
                
                <div id="medium-risk-content" class="mt-3 pl-4 sm:pl-5 border-l-2 border-mediumRisk/30 hidden">
                    <!-- 中风险内容将通过JavaScript动态显示 -->
                </div>
            </div>
            
            <!-- 低风险 -->
            <div class="mb-4">
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="low-risk-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-lowRisk mr-2"></div>
                        <span class="font-medium text-sm sm:text-base">低风险</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 text-xs sm:text-sm mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon text-sm"></i>
                    </div>
                </div>
                
                <div id="low-risk-content" class="mt-3 pl-4 sm:pl-5 border-l-2 border-lowRisk/30 hidden">
                    <!-- 低风险内容将通过JavaScript动态显示 -->
                </div>
            </div>
            
            <!-- 正常 -->
            <div>
                <div class="flex justify-between items-center cursor-pointer risk-section-header" data-target="normal-content">
                    <div class="flex items-center">
                        <div class="w-3 h-3 rounded-full bg-normal mr-2"></div>
                        <span class="font-medium text-sm sm:text-base">正常</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-gray-500 text-xs sm:text-sm mr-2">10项</span>
                        <i class="fa fa-angle-down expand-icon text-sm"></i>
                    </div>
                </div>
                
                <div id="normal-content" class="mt-3 pl-4 sm:pl-5 border-l-2 border-normal/30 hidden">
                    <!-- 正常内容将通过JavaScript动态显示 -->
                </div>
            </div>
        </section>

        <!-- 全部风险详情 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold">全部风险详情</h3>
                <span class="text-xs sm:text-sm text-gray-500">共31项指标</span>
            </div>
            
            <!-- 产品质量 -->
            <div class="mb-6">
                <div class="flex justify-between items-center cursor-pointer detail-section-header" data-target="product-quality-content">
                    <h4 class="font-medium text-sm sm:text-base">产品质量</h4>
                    <div class="flex items-center">
                        <span class="text-xs sm:text-sm text-gray-500 mr-2">1项异常</span>
                        <i class="fa fa-angle-down expand-icon text-sm rotate-icon"></i>
                    </div>
                </div>
                
                <div id="product-quality-content" class="mt-4 space-y-4 sm:space-y-6">
                    <!-- 产品合格率 -->
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                            <p class="font-medium text-sm sm:text-base">产品合格率</p>
                            <span class="risk-tag bg-highRisk/10 text-highRisk self-start">高风险</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg mb-3">
                            <p class="text-xs sm:text-sm mb-1">检查结果: 最近一批次产品合格率为<span class="font-medium">87%</span></p>
                            <p class="text-xs sm:text-sm text-gray-600">分值范围: 0.8~0.95</p>
                        </div>
                        
                        <div class="bg-blue-50 p-3 rounded-lg mb-4">
                            <div class="flex items-center mb-1">
                                <i class="fa fa-lightbulb-o text-primary mr-1 text-xs sm:text-sm"></i>
                                <span class="text-xs sm:text-sm font-medium">AI建议</span>
                            </div>
                            <p class="text-xs sm:text-sm">启动质量审核程序，要求供应商提交整改报告，并进行现场评估。</p>
                        </div>
                        
                        <!-- 产品合格率分析图表 -->
                        <div>
                            <p class="text-xs sm:text-sm font-medium mb-2 flex items-center">
                                <i class="fa fa-bar-chart text-gray-500 mr-1 text-xs"></i>
                                产品合格率分析
                            </p>
                            <div class="chart-container">
                                <canvas id="productRateChart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 订单响应周期 -->
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                            <p class="font-medium text-sm sm:text-base">订单响应周期</p>
                            <span class="risk-tag bg-normal/10 text-normal self-start">正常</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg">
                            <p class="text-xs sm:text-sm mb-1">检查结果: 从确认订单到发货的平均时间为0.5天，响应快</p>
                            <p class="text-xs sm:text-sm text-gray-600">分值范围: 0~3天</p>
                        </div>
                    </div>
                    
                    <!-- 准时交货率 -->
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                            <p class="font-medium text-sm sm:text-base">准时交货率</p>
                            <span class="risk-tag bg-mediumRisk/10 text-mediumRisk self-start">中风险</span>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded-lg mb-3">
                            <p class="text-xs sm:text-sm mb-1">检查结果: 近三个月平均延迟率<span class="font-medium">12.5%</span>，较上季度上升8个百分点</p>
                            <p class="text-xs sm:text-sm text-gray-600">分值范围: 0.8~0.95</p>
                        </div>
                        
                        <div class="bg-blue-50 p-3 rounded-lg">
                            <div class="flex items-center mb-1">
                                <i class="fa fa-lightbulb-o text-primary mr-1 text-xs sm:text-sm"></i>
                                <span class="text-xs sm:text-sm font-medium">AI建议</span>
                            </div>
                            <p class="text-xs sm:text-sm">启动质量审核程序，要求供应商提交整改报告，并进行现场评估。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 改进建议 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
                <i class="fa fa-list-ul text-primary mr-2"></i>
                改进建议
            </h3>
            
            <div class="space-y-3 sm:space-y-4">
                <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p class="font-medium text-primary text-sm sm:text-base mb-2 flex items-center">
                        <i class="fa fa-link mr-2"></i>
                        供应链优化
                    </p>
                    <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
                
                <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p class="font-medium text-primary text-sm sm:text-base mb-2 flex items-center">
                        <i class="fa fa-money mr-2"></i>
                        财务管理
                    </p>
                    <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
                
                <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p class="font-medium text-primary text-sm sm:text-base mb-2 flex items-center">
                        <i class="fa fa-newspaper-o mr-2"></i>
                        舆情监控
                    </p>
                    <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。</p>
                </div>
            </div>
        </section>

        <!-- 报告下载 -->
        <section class="bg-white rounded-lg p-4 sm:p-5 mb-4 card-shadow">
            <p class="text-xs sm:text-sm text-gray-500 mb-3">已经为您生成一份供应商报告</p>
            
            <div class="border border-gray-200 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <div class="flex items-center min-w-0 flex-1">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded flex items-center justify-center text-primary mr-2 sm:mr-3 flex-shrink-0">
                        <i class="fa fa-file-text-o text-sm sm:text-lg"></i>
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-xs sm:text-sm font-medium truncate">深圳德胜电子科技有限公司供应商风险报告</p>
                        <p class="text-xs text-gray-500">Markdown · 4MB</p>
                    </div>
                </div>
                <button class="text-primary text-xs sm:text-sm flex items-center whitespace-nowrap ml-2">
                    <i class="fa fa-download mr-1"></i> 下载
                </button>
            </div>
        </section>
    </main>

    <script>
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', function() {
            // 风险速览区域的展开/折叠功能
            const riskSectionHeaders = document.querySelectorAll('.risk-section-header');
            riskSectionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const icon = this.querySelector('.expand-icon');
                    
                    targetContent.classList.toggle('hidden');
                    icon.classList.toggle('rotate-icon');
                });
            });
            
            // 全部风险详情区域的展开/折叠功能
            const detailSectionHeaders = document.querySelectorAll('.detail-section-header');
            detailSectionHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const icon = this.querySelector('.expand-icon');
                    
                    targetContent.classList.toggle('hidden');
                    icon.classList.toggle('rotate-icon');
                });
            });
            
            // 初始化雷达图
            const radarCtx = document.getElementById('riskRadarChart').getContext('2d');
            const riskRadarChart = new Chart(radarCtx, {
                type: 'radar',
                data: {
                    labels: ['产品质量', '经营风险', '财务风险', '供应链', '舆情风险', '法律诉讼'],
                    datasets: [{
                        label: '风险值',
                        data: [65, 55, 80, 85, 60, 70],
                        backgroundColor: 'rgba(255, 125, 0, 0.2)',
                        borderColor: 'rgba(255, 125, 0, 1)',
                        pointBackgroundColor: 'rgba(255, 125, 0, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 125, 0, 1)'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // 初始化产品合格率图表
            const productRateCtx = document.getElementById('productRateChart').getContext('2d');
            const productRateChart = new Chart(productRateCtx, {
                type: 'line',
                data: {
                    labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
                    datasets: [{
                        label: '合格率',
                        data: [300, 700, 900, 600, 500, 800],
                        borderColor: 'rgba(22, 93, 255, 1)',
                        backgroundColor: 'rgba(22, 93, 255, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            
            // 为了演示，动态生成一些风险内容
            generateRiskContent('medium-risk-content', 'bg-orange-50', 10);
            generateRiskContent('low-risk-content', 'bg-green-50', 10);
            generateRiskContent('normal-content', 'bg-blue-50', 10);
        });
        
        // 生成风险内容的辅助函数
        function generateRiskContent(containerId, bgClass, count) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            let content = '';
            for (let i = 1; i <= count; i++) {
                content += \`
                    <div class="p-3 \${bgClass} rounded-lg">
                        <p class="font-medium text-sm">风险项 \${i}</p>
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">这是自动生成的风险项描述内容 \${i}</p>
                    </div>
                \`;
            }
            
            container.innerHTML = content;
        }
    </script>
</body>
</html>`

export const reportData = {
  companyInfo: {
    companyName: '深圳德胜电子科技有限公司',
    registrationNumber: '9110090113112221311',
    riskLevel: 'medium',
    riskLevelText: '中风险',
    tags: ['存续', '合作供应商', '战略供应商'],
    legalRepresentative: '王大锤',
    registeredCapital: '13637.9万',
    establishmentDate: '1995-01-23',
  },
  riskAssessment: {
    aiInterpretation:
      '该公司整体风险处于中等水平，在产品质量和经营风险方面表现较好，但在供应链和财务风险方面需要重点关注。',
    keyFindings: [
      '司法风险：近一年有1起未结案合同纠纷，涉及金额80万元。',
      '履约风险：近3个月交货准时率72%，低于合同约定的90%。',
      '财务风险：XXXXXXXXXXXXXXXXXX',
    ],
  },
  riskOverview: {
    totalRisks: 20,
    riskCategories: [
      {
        id: 'high-risk',
        name: '高风险',
        type: 'high',
        count: 3,
        defaultExpanded: true,
        items: [
          {
            title: '产品合格率',
            description: '最近一批次产品合格率为87%',
          },
          {
            title: '准时交货率',
            description: '近三个月平均延迟率12.5%，较上季度上升8个百分点',
          },
          {
            title: '订单交货周期',
            description: '近三个月平均延迟率12.5%，较上季度上升8个百分点',
          },
        ],
      },
      {
        id: 'medium-risk',
        name: '中风险',
        type: 'medium',
        count: 7,
        defaultExpanded: false,
        items: [
          {
            title: '财务状况',
            description: '近期现金流紧张',
          },
          {
            title: '供应链稳定性',
            description: '主要原材料供应商单一',
          },
        ],
      },
    ],
  },
  riskDetails: {
    totalIndicators: 31,
    categories: [
      {
        id: 'product-quality',
        name: '产品质量',
        abnormalCount: 1,
        defaultExpanded: true,
        indicators: [
          {
            id: 'product-rate',
            name: '产品合格率',
            riskLevel: 'high',
            riskLevelText: '高风险',
            result: '检查结果: 最近一批次产品合格率为87%',
            scoreRange: '分值范围: 0.8~0.95',
            aiSuggestion: '启动质量审核程序，要求供应商提交整改报告，并进行现场评估。',
            chartTitle: '产品合格率分析',
            showChart: true,
          },
          {
            id: 'order-response',
            name: '订单响应周期',
            riskLevel: 'normal',
            riskLevelText: '正常',
            result: '检查结果: 从确认订单到发货的平均时间为0.5天，响应快',
            scoreRange: '分值范围: 0~3天',
          },
        ],
      },
    ],
  },
  improvementSuggestions: {
    suggestions: [
      {
        icon: 'link',
        title: '供应链优化',
        description: '拓展2-3家供应商，降低对一家供应商的依赖度，建立供应商评估体系。',
      },
      {
        icon: 'money',
        title: '财务管理',
        description: '加强财务监控，建立预警机制，优化现金流管理。',
      },
      {
        icon: 'newspaper-o',
        title: '舆情监控',
        description: '建立舆情监测体系，及时发现并应对负面信息。',
      },
    ],
  },
  radarChartData: {
    labels: ['产品质量', '经营风险', '财务风险', '供应链', '舆情风险', '法律诉讼'],
    datasets: [
      {
        label: '风险值',
        data: [65, 55, 80, 85, 60, 70],
        backgroundColor: 'rgba(255, 125, 0, 0.2)',
        borderColor: 'rgba(255, 125, 0, 1)',
        pointBackgroundColor: 'rgba(255, 125, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 125, 0, 1)',
        borderWidth: 2,
      },
    ],
  },
  productRateChartData: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '合格率',
        data: [95, 92, 89, 87, 90, 88],
        borderColor: 'rgba(22, 93, 255, 1)',
        backgroundColor: 'rgba(22, 93, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 80,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function (value) {
            return value + '%'
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return '合格率: ' + context.parsed.y + '%'
          },
        },
      },
    },
  },
  radarChartOptions: {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  },
}
