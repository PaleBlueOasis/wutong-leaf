# 梧桐叶盲盒

面向南京四牌楼及周边的免登录探索网站。按时间和兴趣选一条路线，观察、记笔记、暂停续走，再生成可编辑的纪念卡。

本版范围：访客体验完整可用；记录与偏好保存在当前浏览器。账号、独立登录、跨设备云端个人档案暂缓。网站托管默认私有，公开权限与产品是否登录是两个独立设置。

## 运行

需要 Node.js 22.13+。已经安装依赖时直接运行 `npm run dev`，打开终端打印的网址（默认 http://127.0.0.1:5173/）。首次环境准备及发布请使用 Sites 插件的安装、构建和发布工作流。

```powershell
npm run dev
```

没有 DeepSeek 密钥也能体验全部固定流程。密钥由团队自行填写，详见下面的接入说明。更新内容后保留 `.openai/hosting.json` 中的 Site ID，不要重复创建站点。

## 团队入口

- `config/ai-prompts.ts`：统一预设提示词，可修改语气、任务回应和纪念卡文风。
- `.env.example`：环境变量示例，本地复制为 `.dev.vars` 后填写密钥。
- `lib/exploration.ts`：六条路线和观察任务。
- `lib/places.ts`：十一个真实地点、交通提示和官方来源。
- `docs/南京地点与路线依据.md`：信息证据与估算范围。
- `app/components/`：界面与交互。
- `app/api/ai/route.ts`：DeepSeek 服务端代理、JSON 校验、固定内容兜底。
- `db/schema.ts`：只记录全站匿名调用计数；不保存账号、笔记或个人探索档案。

## 说明文档

- [DeepSeek 接入说明](docs/DeepSeek接入说明.md)
- [提示词编辑指南](docs/提示词编辑指南.md)
- [发布与自定义域名](docs/发布与自定义域名.md)
- [Sites 运行时参考](docs/Sites运行时说明.md)：原始开发脚手架参考；其中账号示例不是当前产品功能。

## 检查

```powershell
node node_modules/typescript/bin/tsc --noEmit
node --experimental-strip-types --test tests/exploration.test.mjs
# 开启本地预览、保持未配置真实密钥时运行：
node --experimental-strip-types tests/api-smoke.mjs
```

构建使用 Sites 插件的 `build-site.mjs`。首次本地 AI 限额数据库需要应用 `drizzle/0000_grey_mandrill.sql`，已应用过的迁移不要重复执行；线上由发布流程处理迁移。

## 数据边界

清理浏览器数据或换浏览器后，记录不会自动找回；重要内容请导出。用户同意 AI 处理时，仅提交当次文本及相关任务上下文。没有配置密钥、接口超时或模型输出不合格时继续使用固定内容。

路线的线上资料核对不等于实地测量。时长和距离为规划估算，需结合当天地图、开放条件与个人步速；当前体验记录不作为真实到访证明。真实模型调用、自定义域名与户外路线均需后续专项验证。
