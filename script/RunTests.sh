#!/bin/bash

# 颜色变量
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===================================================${NC}"
echo -e "${YELLOW}           运行代币预售项目测试套件                 ${NC}"
echo -e "${YELLOW}===================================================${NC}"

# 安装依赖
echo -e "\n${GREEN}正在安装依赖...${NC}"
forge install smartcontractkit/chainlink --no-commit

# 运行单元测试
echo -e "\n${GREEN}运行单元测试...${NC}"
forge test --match-path test/unit/TokenPresaleTest_Unit.t.sol -v || {
    echo -e "${RED}单元测试失败${NC}"
    exit 1
}

# 运行集成测试
echo -e "\n${GREEN}运行集成测试...${NC}"
forge test --match-path test/integration/TokenPresaleTest_Integration.t.sol -v || {
    echo -e "${RED}集成测试失败${NC}"
    exit 1
}

# 检查是否提供了RPC_URL
if [ -z "$SEPOLIA_RPC_URL" ]; then
    echo -e "\n${YELLOW}警告: 未设置SEPOLIA_RPC_URL环境变量，跳过分叉测试${NC}"
else
    # 运行分叉测试
    echo -e "\n${GREEN}运行分叉测试...${NC}"
    forge test --match-path test/forked/TokenPresaleTest_Forked.t.sol --fork-url $SEPOLIA_RPC_URL -v || {
        echo -e "${RED}分叉测试失败${NC}"
        exit 1
    }
fi

# 检查是否提供了MAINNET_RPC_URL
if [ -z "$MAINNET_RPC_URL" ]; then
    echo -e "\n${YELLOW}警告: 未设置MAINNET_RPC_URL环境变量，跳过阶段测试${NC}"
else
    # 运行阶段测试
    echo -e "\n${GREEN}运行阶段测试...${NC}"
    forge test --match-path test/staging/TokenPresaleTest_Staging.t.sol --fork-url $MAINNET_RPC_URL -v || {
        echo -e "${RED}阶段测试失败${NC}"
        exit 1
    }
fi

echo -e "\n${GREEN}所有测试完成!${NC}"
echo -e "${YELLOW}===================================================${NC}"

# 输出测试覆盖率报告
echo -e "\n${GREEN}生成测试覆盖率报告...${NC}"
forge coverage --report lcov

# 如果安装了lcov，则生成HTML报告
if command -v genhtml &> /dev/null; then
    genhtml lcov.info --output-directory coverage
    echo -e "${GREEN}HTML覆盖率报告已生成在 './coverage' 目录中${NC}"
else
    echo -e "${YELLOW}未安装genhtml，跳过HTML覆盖率报告生成${NC}"
fi 