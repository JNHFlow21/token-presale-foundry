-include .env
export

.PHONY: all clean install update build test anvil deploy-anvil deploy-sepolia format help

# 默认私钥
DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# ========== 私钥与 RPC 自动判断 ==========
ifeq ($(strip $(SEPOLIA)),true)
	PRIVATE_KEY := $(SEPOLIA_PRIVATE_KEY)
	RPC_URL := $(SEPOLIA_RPC_URL)
else
	PRIVATE_KEY := $(DEFAULT_ANVIL_KEY)
	RPC_URL := http://localhost:8545
endif

# ========== 通用命令 ==========
all: clean install update build

clean: ; forge clean

install: ; forge install

update: ; forge update

build: ; forge build

# ========================
# 测试分组 - Unit / Integration / Forked
# ========================
test: test-unit test-integration

test-unit:
	@echo "🧪 Running Unit Tests..."
	forge test --match-path 'test/unit/**.t.sol' -vvvv

test-integration:
	@echo "🔗 Running Integration Tests..."
	forge test --match-path 'test/integration/**.t.sol' -vvvv

test-forked:
	@echo "🌍 Running Forked Tests with fork-url = $(SEPOLIA_RPC_URL)"
	forge test --match-path 'test/forked/**.t.sol' --fork-url $(SEPOLIA_RPC_URL) -vvvv

format: ; forge fmt

# --block-time 12 模拟以太坊的出块速度 12秒
anvil:
	anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 12

check-balance:
	@echo "🔍 正在获取钱包地址..."
	@ADDRESS=$$(cast wallet address --private-key $(SEPOLIA_PRIVATE_KEY)) && \
	echo "📮 钱包地址: $$ADDRESS" && \
	echo "💰 Sepolia ETH 余额: " && \
	cast balance $$ADDRESS --rpc-url $(SEPOLIA_RPC_URL)

# ========== 脚本路径 ==========
DEPLOY_SCRIPT := script/DeployTokenPresale.s.sol:DeployTokenPresale

# ========== 部署命令 ==========
deploy:
	@forge script $(DEPLOY_SCRIPT) \
		--rpc-url $(RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		--legacy \
		-vvvv

deploy-verify:
	@forge script $(DEPLOY_SCRIPT) \
		--rpc-url $(RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--etherscan-api-key $(ETHERSCAN_API_KEY) \
		--verify \
		--broadcast \
		--legacy \
		-vvvv

# ========== 启动方式说明 ==========
help:
	@echo "✅ Makefile 命令指南:"
	@echo "make build              # 编译项目"
	@echo "make test               # 执行测试"
	@echo "make test-unit          # 执行单元测试"
	@echo "make test-integration   # 执行集成测试"
	@echo "make test-forked        # 执行 forked 测试"
	@echo "make deploy             # 默认部署到本地 (Anvil)"
	@echo "make deploy SEPOLIA=true# 部署到 Sepolia"
	@echo "make deploy-verify SEPOLIA=true # 部署到 Sepolia + 验证合约"
	@echo "make format             # 格式化代码"