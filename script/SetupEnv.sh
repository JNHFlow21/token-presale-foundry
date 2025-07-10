#!/bin/bash

# 颜色变量
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===================================================${NC}"
echo -e "${YELLOW}           设置环境变量                             ${NC}"
echo -e "${YELLOW}===================================================${NC}"

# 创建.env文件
cat > .env << EOL
PRIVATE_KEY=0xd0ba15d184173a16531bc6c6ade860d0bd3d49db8e20b853dc967f646bf7a129
MYWALLET_ADDRESS=0x44def25bb730c585b58e7fbbfa862b1a6a11a6c5
RPC_URL=http://127.0.0.1:8545
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/bf4ba2eb7d734cd38959b6cede494029
ETHERSCAN_API_KEY=XIBRXFSE3D13QJYUU16J2J4G973RWUU8JS
EOL

echo -e "${GREEN}.env文件已创建${NC}"

# 设置当前终端的环境变量
export PRIVATE_KEY=0xd0ba15d184173a16531bc6c6ade860d0bd3d49db8e20b853dc967f646bf7a129
export MYWALLET_ADDRESS=0x44def25bb730c585b58e7fbbfa862b1a6a11a6c5
export RPC_URL=http://127.0.0.1:8545
export SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/bf4ba2eb7d734cd38959b6cede494029
export ETHERSCAN_API_KEY=XIBRXFSE3D13QJYUU16J2J4G973RWUU8JS

echo -e "${GREEN}环境变量已设置到当前终端${NC}"
echo -e "${YELLOW}===================================================${NC}"
echo -e "${RED}安全提醒：${NC}"
echo -e "${RED}1. 请勿在公共场合分享您的私钥${NC}"
echo -e "${RED}2. .env文件已被添加到.gitignore，不会提交到仓库${NC}"
echo -e "${RED}3. 定期更换您的API密钥和私钥${NC}"
echo -e "${YELLOW}===================================================${NC}"

echo -e "${GREEN}使用方法：${NC}"
echo -e "要将环境变量加载到当前终端，请运行：${YELLOW}source ./script/SetupEnv.sh${NC}" 