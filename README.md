# Token Presale - Foundry实现

**基于Foundry的代币预售智能合约项目，支持ETH捐赠、USD价格转换、代币线性解锁和紧急暂停功能。**

## 项目概述

本项目实现了一个代币预售合约，允许用户通过ETH参与代币预售。系统使用Chainlink预言机将ETH捐赠金额转换为美元，并在预售结束后按照设定比例线性释放代币给参与者。

### 主要功能

- **ETH募集**: 用户可以捐赠ETH参与预售
- **USD价值转换**: 使用Chainlink预言机将ETH转换为等值USD
- **募资目标和时间限制**: 设有预售结束时间和募资目标
- **代币线性解锁**: 代币在预定时间段内线性释放
- **紧急暂停**: 项目方可以在紧急情况下暂停预售
- **提取ETH**: 项目方可以在达到目标或时间结束后提取ETH

## 开发环境

本项目使用Foundry开发框架，具有以下优势：

- 超快的编译速度和测试执行
- 原生Solidity测试
- 强大的模拟和分叉测试能力
- 内置部署脚本支持

## 测试策略

我们采用多维度测试方法，确保合约功能的正确性和安全性：

### 1. 单元测试 (Unit Tests)

测试单个合约功能，使用模拟外部依赖（如Chainlink预言机）。

```bash
forge test --match-path test/unit/TokenPresaleTest_Unit.t.sol -v
```

### 2. 集成测试 (Integration Tests)

测试多个合约组件之间的交互，验证完整流程。

```bash
forge test --match-path test/integration/TokenPresaleTest_Integration.t.sol -v
```

### 3. 分叉测试 (Forked Tests)

在真实网络的快照上测试合约，特别是与外部服务（如Chainlink预言机）的交互。

```bash
forge test --match-path test/forked/TokenPresaleTest_Forked.t.sol --fork-url $SEPOLIA_RPC_URL -v
```

### 4. 阶段测试 (Staging Tests)

在部署前，模拟生产环境进行最终验证。

```bash
forge test --match-path test/staging/TokenPresaleTest_Staging.t.sol --fork-url $MAINNET_RPC_URL -v
```

## 快速开始

### 安装依赖

```bash
forge install
```

### 运行测试

使用我们提供的测试脚本运行所有测试：

```bash
./script/RunTests.sh
```

或者运行特定维度的测试：

```bash
# 单元测试
forge test --match-path test/unit/TokenPresaleTest_Unit.t.sol -v

# 集成测试
forge test --match-path test/integration/TokenPresaleTest_Integration.t.sol -v
```

### 部署合约

```bash
# 设置环境变量
export PRIVATE_KEY=your_private_key
export RPC_URL=your_rpc_url

# 部署到目标网络
forge script script/DeployTokenPresale.s.sol:DeployTokenPresale --rpc-url $RPC_URL --broadcast --verify
```

## 合约架构

### TokenPresale.sol

主合约，实现预售功能、提现、代币计算和线性解锁。

### PriceConverter.sol

辅助库，使用Chainlink预言机将ETH转换为USD价值。

## 测试覆盖率

查看测试覆盖率报告：

```bash
forge coverage --report lcov
genhtml lcov.info --output-directory coverage
```

## 许可证

MIT

## Foundry Documentation

更多Foundry相关信息，请查看：https://book.getfoundry.sh/
