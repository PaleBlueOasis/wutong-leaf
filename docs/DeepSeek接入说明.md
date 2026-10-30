# DeepSeek 接入说明

本项目已预留服务端接入，未填入任何真实密钥。没有密钥时，抽路线、探索、记笔记、生成纪念卡仍然可用；AI 按钮会明确提示正在使用固定内容。

## 模型与入口

- 用户指定版本：DeepSeek V4.1 Flash 1017。
- 2026-10-29 核对的官方 API 模型标识：`deepseek-flash`。
- 默认 API 地址：`https://api.deepseek.com`，请求路径：`/chat/completions`。
- 官方模型别名可能随平台升级变化；当前没有在本项目中使用未经核实的日期版模型 ID。后续切换只需修改 `LLM_MODEL`。
- 服务端代码：`app/api/ai/route.ts`。请求会关闭思考模式，要求 JSON 输出，并校验返回字段。

官方参考：[API 文档](https://api-docs.deepseek.com/)、[更新记录](https://api-docs.deepseek.com/zh-cn/updates/)、[Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/)、[JSON 模式](https://api-docs.deepseek.com/guides/json_mode/)。

## 哪些功能会调用模型

| 场景 | 提示词键 | 发出的内容 | 不调用时 |
| --- | --- | --- | --- |
| 将一句话整理为本次选择 | `parse` | 本次输入、默认时长/模式/兴趣 | 规则识别时长与模式，用户确认 |
| 路线开场 | `guide` | 路线标题、是否已核验 | 固定开场 |
| 回应观察、选后续任务 | `observe` | 当前笔记、该地点允许任务、当前任务编号 | 固定回应和同地点任务分支 |
| 整理纪念卡文字 | `recap` | 本次笔记、路线标题、是否提前结束 | 保留原笔记的简短记录 |

真实调用需要：已配置密钥、用户主动同意或开启 AI 功能（无需登录）。默认关闭 AI。不会把邮箱、完整历史记录、精确位置或完整轨迹传给 DeepSeek。观察笔记和主动输入可能包含用户自行写入的个人内容，页面会说明这些文本会发送给 DeepSeek。

## 本地填写密钥

在项目根目录将 `.env.example` 复制为 **`.dev.vars`**，再由你填写：

```dotenv
LLM_API_KEY=在这里填写你自己的密钥
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-flash
LLM_DAILY_LIMIT=30
```

重启开发服务器即可读取。`.dev.vars` 已被 Git 忽略。不要把密钥写到 React 页面、`NEXT_PUBLIC_` 变量、提示词文件或 `.openai/hosting.json` 中；网页里的密钥会被访客看到。

## 已发布的 Sites 网站

本地 `.dev.vars` **不会自动上传到线上**。线上需要在该 Site 的运行环境中配置同名变量，其中 `LLM_API_KEY` 必须标记为 secret；通过 Sites 的环境变量能力设置后，重新部署保存的版本，新的配置才生效。你可以先在本地填写，之后告诉我“将已填好的 DeepSeek 配置应用到线上”，我会走 Sites 的保密配置流程，不回显密钥。

`LLM_DAILY_LIMIT` 是整个网站每天（上海时区）共享的请求预算，默认 30；发起后失败的尝试也会占用预算。它不是全站金额上限，请在 DeepSeek 账户端另行设置你需要的余额/消费控制。

## 验证方式

1. 第一版无需登录；网站只在服务器保存全站调用次数，不保存身份或笔记。
2. 填写密钥后，在“我的偏好”开启 AI，尝试一段不含个人信息的观察。
3. 检查界面是否显示“AI 回应”；若显示“固定回应”或兜底提示，按提示检查认证、额度和网络。
4. 记录一次真实调用的结果后，才能把“真实模型联调通过”记入测试报告。

目前未使用真实密钥，尚未验证真实模型响应、计费和生产环境限额触发。超时、缺失密钥、输出格式错误等情况均保留固定体验路径。
