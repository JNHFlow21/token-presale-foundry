# TokenPresale 前端使用指南

## 项目简介

这是一个用于与 TokenPresale 智能合约交互的前端应用程序。通过这个前端界面，您可以参与代币预售、查看预售状态、领取代币，以及（如果您是管理员）管理预售过程。

## 文件结构

- `index.html` - 主页面 HTML 文件
- `app.js` - JavaScript 交互逻辑
- `frontend-readme.md` - 详细使用说明

## 快速开始

1. 确保已部署 TokenPresale 智能合约并记录合约地址
2. 在本地启动一个简单的 HTTP 服务器：

使用 Python：
```bash
python -m http.server
```

或使用 Node.js：
```bash
npx http-server
```

3. 在浏览器中访问 http://localhost:8000 (Python) 或 http://localhost:8080 (Node.js)
4. 点击"连接钱包"按钮并授权 MetaMask 连接
5. 首次连接时，输入 TokenPresale 合约地址

## 主要功能

- 查看预售状态、目标金额和进度
- 使用 ETH 参与代币预售
- 查看个人贡献和可领取代币数量
- 领取已解锁的代币
- 管理员功能：提取 ETH、暂停/恢复预售

## 详细使用说明

请参阅 [frontend-readme.md](frontend-readme.md) 获取更详细的使用指南、故障排除和常见问题解答。

## 注意事项

- 请确保使用支持的网络（Sepolia 测试网或本地 Anvil 链）
- 请勿在生产环境中直接使用此前端，应先进行安全审计
- 此前端仅用于演示和学习目的 