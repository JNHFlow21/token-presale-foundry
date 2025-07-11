// 合约ABI
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_priceFeed",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ClaimDisabled",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "GoalReached",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PresaleEnded",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TooSmall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "notFinished",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "notOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "withdrawFailed",
        "type": "error"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "claimTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contributors",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fund",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getTokenClaimable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "goalInUsd",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasContributed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isClaimEnabled",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "presaleEndTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "priceFeed",
        "outputs": [
            {
                "internalType": "contract AggregatorV3Interface",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "tokenPerUsdRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tolerance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalUsdRaised",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unlockDuration",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unlockStartTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userClaimedTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userTotalToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userUsdContributed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

// 存储应用程序状态
const appState = {
    provider: null,
    signer: null,
    contract: null,
    contractAddress: null,
    currentAccount: null,
    isOwner: false,
    chainId: null,
    etherToUsdRate: 2000, // 默认ETH/USD汇率，仅作为初始显示
    refreshInterval: null
};

// 支持的链ID和它们的信息
const supportedChains = {
    // 使用本地Anvil
    "31337": {
        name: "Anvil 本地链",
        currencySymbol: "ETH",
        blockExplorer: ""
    },
    // Sepolia测试网
    "11155111": {
        name: "Sepolia测试网",
        currencySymbol: "ETH",
        blockExplorer: "https://sepolia.etherscan.io"
    }
};

// DOM 元素
const elements = {
    connectButton: document.getElementById("connectButton"),
    contractAddress: document.getElementById("contractAddress"),
    presaleStatus: document.getElementById("presaleStatus"),
    claimEnabled: document.getElementById("claimEnabled"),
    presaleEndTime: document.getElementById("presaleEndTime"),
    totalRaised: document.getElementById("totalRaised"),
    goalInUsd: document.getElementById("goalInUsd"),
    progressBar: document.getElementById("progressBar"),
    tokenRate: document.getElementById("tokenRate"),
    ethAmount: document.getElementById("ethAmount"),
    usdValue: document.getElementById("usdValue"),
    fundForm: document.getElementById("fundForm"),
    fundButton: document.getElementById("fundButton"),
    myContribution: document.getElementById("myContribution"),
    myClaimedTokens: document.getElementById("myClaimedTokens"),
    myClaimableTokens: document.getElementById("myClaimableTokens"),
    claimButton: document.getElementById("claimButton"),
    statusMessage: document.getElementById("statusMessage"),
    adminSection: document.getElementById("adminSection"),
    withdrawButton: document.getElementById("withdrawButton"),
    pauseButton: document.getElementById("pauseButton"),
    unpauseButton: document.getElementById("unpauseButton")
};

// 初始化应用
async function initApp() {
    // 检查是否有MetaMask
    if (window.ethereum) {
        try {
            // 监听钱包账户变化
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            // 监听链变化
            window.ethereum.on('chainChanged', () => window.location.reload());
            
            // 设置按钮监听器
            setupEventListeners();

            // 初始化ETH输入的USD预估
            elements.ethAmount.addEventListener('input', updateUsdValue);
            
            // 尝试获取之前的连接
            await checkPreviousConnection();
        } catch (error) {
            console.error("初始化应用程序时出错:", error);
            showStatus("初始化应用程序时出错: " + error.message, "danger");
        }
    } else {
        console.log("未检测到以太坊钱包");
        showStatus("请安装MetaMask或其他以太坊钱包以使用此应用", "warning");
        elements.connectButton.textContent = "请安装MetaMask";
        elements.connectButton.disabled = true;
    }
}

// 设置事件监听器
function setupEventListeners() {
    elements.connectButton.addEventListener('click', connectWallet);
    elements.fundForm.addEventListener('submit', handleFund);
    elements.claimButton.addEventListener('click', handleClaim);
    elements.withdrawButton.addEventListener('click', handleWithdraw);
    elements.pauseButton.addEventListener('click', handlePause);
    elements.unpauseButton.addEventListener('click', handleUnpause);
}

// 检查之前的连接
async function checkPreviousConnection() {
    try {
        // 检查是否已经授权
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    } catch (error) {
        console.error("检查之前连接时出错:", error);
    }
}

// 连接钱包
async function connectWallet() {
    try {
        // 请求账户访问
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await handleAccountsChanged(accounts);
    } catch (error) {
        console.error("连接钱包时出错:", error);
        showStatus("连接钱包时出错: " + error.message, "danger");
    }
}

// 处理账户变化
async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // 用户断开连接
        resetAppState();
        showStatus("请连接您的钱包", "warning");
    } else {
        // 设置新账户
        appState.currentAccount = accounts[0];
        elements.connectButton.textContent = `${appState.currentAccount.substring(0, 6)}...${appState.currentAccount.substring(38)}`;
        
        // 设置Provider和Signer
        await setupProviderAndContract();
        
        // 刷新数据
        await refreshContractData();
        
        // 设置定时刷新
        if (appState.refreshInterval) clearInterval(appState.refreshInterval);
        appState.refreshInterval = setInterval(refreshContractData, 10000);
    }
}

// 设置Provider和合约
async function setupProviderAndContract() {
    if (!window.ethereum) return;
    
    try {
        // 创建Provider - 修改为使用最新区块
        appState.provider = new ethers.providers.Web3Provider(window.ethereum, {
            polling: true,
            pollingInterval: 15000,
            blockTag: 'latest'  // 总是使用最新区块
        });
        
        // 获取Chain ID
        const network = await appState.provider.getNetwork();
        appState.chainId = network.chainId.toString();
        
        // 检查是否是支持的链
        if (!supportedChains[appState.chainId]) {
            showStatus(`不支持的网络。请切换到支持的网络: ${Object.values(supportedChains).map(c => c.name).join(', ')}`, "danger");
            return;
        }
        
        // 创建Signer
        appState.signer = appState.provider.getSigner();
        
        // 清除之前保存的合约地址，防止使用过期数据
        localStorage.removeItem('contractAddress');
        
        // 使用localStorage读取上次使用的合约地址
        appState.contractAddress = localStorage.getItem('contractAddress');
        
        if (!appState.contractAddress) {
            // 如果没有保存的地址，提示用户输入
            const userInput = prompt("请输入TokenPresale合约地址:");
            if (userInput && ethers.utils.isAddress(userInput)) {
                appState.contractAddress = userInput;
                localStorage.setItem('contractAddress', userInput);
            } else {
                showStatus("请提供有效的合约地址", "danger");
                return;
            }
        }
        
        // 创建合约实例
        appState.contract = new ethers.Contract(
            appState.contractAddress,
            contractABI,
            appState.signer
        );
        
        // 显示合约地址
        elements.contractAddress.textContent = appState.contractAddress;
        
        // 检查当前用户是否是合约拥有者
        const contractOwner = await appState.contract.owner({ blockTag: 'latest' });
        appState.isOwner = contractOwner.toLowerCase() === appState.currentAccount.toLowerCase();
        
        // 如果是拥有者，显示管理员部分
        elements.adminSection.style.display = appState.isOwner ? "block" : "none";
        
    } catch (error) {
        console.error("设置提供者和合约时出错:", error);
        showStatus("设置提供者和合约时出错: " + error.message, "danger");
    }
}

// 刷新合约数据
async function refreshContractData() {
    if (!appState.contract) return;
    
    try {
        // 获取预售结束时间 - 修改为使用最新区块
        const endTimeInSeconds = await appState.contract.presaleEndTime({ blockTag: 'latest' });
        const endTime = new Date(endTimeInSeconds.toNumber() * 1000);
        const now = new Date();
        
        // 计算剩余时间
        let timeDisplay;
        if (endTime > now) {
            const diff = Math.floor((endTime - now) / 1000);
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;
            timeDisplay = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            elements.presaleStatus.textContent = "进行中";
            elements.presaleStatus.className = "text-success";
        } else {
            timeDisplay = "已结束";
            elements.presaleStatus.textContent = "已结束";
            elements.presaleStatus.className = "text-danger";
        }
        elements.presaleEndTime.textContent = timeDisplay;
        
        // 获取目标金额 - 修改为使用最新区块
        const goalInUsd = ethers.utils.formatUnits(await appState.contract.goalInUsd({ blockTag: 'latest' }), 18);
        elements.goalInUsd.textContent = `${goalInUsd} USD`;
        
        // 获取总共募集的金额 - 修改为使用最新区块
        const totalRaised = ethers.utils.formatUnits(await appState.contract.totalUsdRaised({ blockTag: 'latest' }), 18);
        elements.totalRaised.textContent = `${parseFloat(totalRaised).toFixed(2)} USD`;
        
        // 更新进度条
        const progressPercentage = Math.min((parseFloat(totalRaised) / parseFloat(goalInUsd)) * 100, 100);
        elements.progressBar.style.width = `${progressPercentage}%`;
        
        // 获取代币兑换比率 - 修改为使用最新区块
        const tokenRate = await appState.contract.tokenPerUsdRate({ blockTag: 'latest' });
        elements.tokenRate.textContent = `${tokenRate.toString()} TOKEN / USD`;
        
        // 获取是否可以领取代币 - 修改为使用最新区块
        const isClaimEnabled = await appState.contract.isClaimEnabled({ blockTag: 'latest' });
        elements.claimEnabled.textContent = isClaimEnabled ? "是" : "否";
        elements.claimEnabled.className = isClaimEnabled ? "text-success" : "text-danger";
        
        // 如果有账户连接，获取用户信息 - 修改为使用最新区块
        if (appState.currentAccount) {
            try {
                const [contributed, claimed, claimable] = await appState.contract.getUserInfo(appState.currentAccount, { blockTag: 'latest' });
                elements.myContribution.textContent = `${contributed.toString()} USD`;
                elements.myClaimedTokens.textContent = `${claimed.toString()} TOKEN`;
                elements.myClaimableTokens.textContent = `${claimable.toString()} TOKEN`;
                
                // 如果没有可领取的代币，禁用领取按钮
                elements.claimButton.disabled = claimable.toString() === "0" || !isClaimEnabled;
            } catch (error) {
                console.error("获取用户信息时出错:", error);
            }
        }
        
        // 获取合约是否暂停 - 修改为使用最新区块
        const isPaused = await appState.contract.paused({ blockTag: 'latest' });
        if (isPaused) {
            elements.presaleStatus.textContent = "已暂停";
            elements.presaleStatus.className = "text-warning";
        }
        
        // 更新管理员按钮状态
        if (appState.isOwner) {
            elements.pauseButton.disabled = isPaused;
            elements.unpauseButton.disabled = !isPaused;
            
            // 检查是否可以提现（目标达成或时间结束）
            const canWithdraw = parseFloat(totalRaised) >= parseFloat(goalInUsd) || endTime <= now;
            elements.withdrawButton.disabled = !canWithdraw;
        }
        
    } catch (error) {
        console.error("刷新合约数据时出错:", error);
    }
}

// 更新USD预估值
function updateUsdValue() {
    const ethAmount = parseFloat(elements.ethAmount.value) || 0;
    const usdValue = (ethAmount * appState.etherToUsdRate).toFixed(2);
    elements.usdValue.textContent = usdValue;
}

// 处理捐赠
async function handleFund(event) {
    event.preventDefault();
    
    if (!appState.contract || !appState.currentAccount) {
        showStatus("请先连接钱包", "warning");
        return;
    }
    
    const ethAmount = elements.ethAmount.value;
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
        showStatus("请输入有效的ETH金额", "warning");
        return;
    }
    
    try {
        // 添加调试信息
        console.log("合约地址:", appState.contractAddress);
        console.log("账户:", appState.currentAccount);
        console.log("ETH金额:", ethAmount);
        
        // 禁用按钮防止重复点击
        elements.fundButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 发送交易 - 添加固定gas限制
        const tx = await appState.contract.fund({
            value: ethers.utils.parseEther(ethAmount),
            gasLimit: 500000  // 设置固定gas限制
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        await tx.wait();
        
        showStatus("成功参与预售！", "success");
        
        // 刷新数据
        await refreshContractData();
        
        // 清空输入
        elements.ethAmount.value = "";
        elements.usdValue.textContent = "0";
        
    } catch (error) {
        console.error("完整错误信息:", error);
        let errorMessage = "参与预售时出错";
        
        // 处理特定错误
        if (error.message.includes("PresaleEnded")) {
            errorMessage = "预售已结束";
        } else if (error.message.includes("GoalReached")) {
            errorMessage = "募集目标已达成";
        } else if (error.message.includes("TooSmall")) {
            errorMessage = "捐赠金额太小，最低需要等值10 USD的ETH";
        } else if (error.message.includes("user rejected")) {
            errorMessage = "用户取消了交易";
        } else {
            errorMessage += ": " + error.message;
        }
        
        showStatus(errorMessage, "danger");
        
        // 如果错误持续，尝试使用低级调用
        if (error.message.includes("cannot estimate gas")) {
            showStatus("尝试使用备用方法发送交易...", "info");
            try {
                const signer = appState.provider.getSigner();
                const tx = await signer.sendTransaction({
                    to: appState.contractAddress,
                    value: ethers.utils.parseEther(ethAmount),
                    gasLimit: 1000000
                });
                await tx.wait();
                showStatus("成功参与预售！", "success");
                await refreshContractData();
            } catch (fallbackError) {
                console.error("备用方法也失败:", fallbackError);
                showStatus("备用方法也失败: " + fallbackError.message, "danger");
            }
        }
    } finally {
        // 启用按钮
        elements.fundButton.disabled = false;
    }
}

// 处理领取代币
async function handleClaim() {
    if (!appState.contract || !appState.currentAccount) {
        showStatus("请先连接钱包", "warning");
        return;
    }
    
    try {
        // 禁用按钮防止重复点击
        elements.claimButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 发送交易 - 添加固定gas限制
        const tx = await appState.contract.claimTokens({
            gasLimit: 500000
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        await tx.wait();
        
        showStatus("成功领取代币！", "success");
        
        // 刷新数据
        await refreshContractData();
        
    } catch (error) {
        console.error("领取代币时出错:", error);
        let errorMessage = "领取代币时出错";
        
        // 处理特定错误
        if (error.message.includes("ClaimDisabled")) {
            errorMessage = "代币领取功能未启用";
        } else if (error.message.includes("user rejected")) {
            errorMessage = "用户取消了交易";
        } else {
            errorMessage += ": " + error.message;
        }
        
        showStatus(errorMessage, "danger");
    } finally {
        // 启用按钮
        elements.claimButton.disabled = false;
    }
}

// 管理员功能：提取ETH
async function handleWithdraw() {
    if (!appState.contract || !appState.isOwner) {
        showStatus("只有合约拥有者可以提取ETH", "warning");
        return;
    }
    
    try {
        // 禁用按钮防止重复点击
        elements.withdrawButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 发送交易 - 添加固定gas限制
        const tx = await appState.contract.withdrawETH({
            gasLimit: 500000
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        await tx.wait();
        
        showStatus("成功提取ETH！", "success");
        
        // 刷新数据
        await refreshContractData();
        
    } catch (error) {
        console.error("提取ETH时出错:", error);
        let errorMessage = "提取ETH时出错";
        
        // 处理特定错误
        if (error.message.includes("notOwner")) {
            errorMessage = "只有合约拥有者可以提取ETH";
        } else if (error.message.includes("notFinished")) {
            errorMessage = "预售尚未结束或未达到目标";
        } else if (error.message.includes("user rejected")) {
            errorMessage = "用户取消了交易";
        } else {
            errorMessage += ": " + error.message;
        }
        
        showStatus(errorMessage, "danger");
    } finally {
        // 启用按钮
        elements.withdrawButton.disabled = false;
    }
}

// 管理员功能：暂停预售
async function handlePause() {
    if (!appState.contract || !appState.isOwner) {
        showStatus("只有合约拥有者可以暂停预售", "warning");
        return;
    }
    
    try {
        // 禁用按钮防止重复点击
        elements.pauseButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 发送交易 - 添加固定gas限制
        const tx = await appState.contract.pause({
            gasLimit: 500000
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        await tx.wait();
        
        showStatus("成功暂停预售！", "success");
        
        // 刷新数据
        await refreshContractData();
        
    } catch (error) {
        console.error("暂停预售时出错:", error);
        let errorMessage = "暂停预售时出错";
        
        // 处理特定错误
        if (error.message.includes("notOwner")) {
            errorMessage = "只有合约拥有者可以暂停预售";
        } else if (error.message.includes("user rejected")) {
            errorMessage = "用户取消了交易";
        } else {
            errorMessage += ": " + error.message;
        }
        
        showStatus(errorMessage, "danger");
    } finally {
        // 启用按钮
        elements.pauseButton.disabled = false;
    }
}

// 管理员功能：恢复预售
async function handleUnpause() {
    if (!appState.contract || !appState.isOwner) {
        showStatus("只有合约拥有者可以恢复预售", "warning");
        return;
    }
    
    try {
        // 禁用按钮防止重复点击
        elements.unpauseButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 发送交易 - 添加固定gas限制
        const tx = await appState.contract.unpause({
            gasLimit: 500000
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        await tx.wait();
        
        showStatus("成功恢复预售！", "success");
        
        // 刷新数据
        await refreshContractData();
        
    } catch (error) {
        console.error("恢复预售时出错:", error);
        let errorMessage = "恢复预售时出错";
        
        // 处理特定错误
        if (error.message.includes("notOwner")) {
            errorMessage = "只有合约拥有者可以恢复预售";
        } else if (error.message.includes("user rejected")) {
            errorMessage = "用户取消了交易";
        } else {
            errorMessage += ": " + error.message;
        }
        
        showStatus(errorMessage, "danger");
    } finally {
        // 启用按钮
        elements.unpauseButton.disabled = false;
    }
}

// 显示状态消息
function showStatus(message, type) {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `alert alert-${type}`;
    elements.statusMessage.classList.remove('d-none');
    
    // 5秒后自动隐藏（除非是info类型）
    if (type !== 'info') {
        setTimeout(() => {
            elements.statusMessage.classList.add('d-none');
        }, 5000);
    }
}

// 重置应用状态
function resetAppState() {
    appState.currentAccount = null;
    appState.isOwner = false;
    if (appState.refreshInterval) {
        clearInterval(appState.refreshInterval);
        appState.refreshInterval = null;
    }
    
    elements.connectButton.textContent = "连接钱包";
    elements.adminSection.style.display = "none";
    elements.myContribution.textContent = "0 USD";
    elements.myClaimedTokens.textContent = "0 TOKEN";
    elements.myClaimableTokens.textContent = "0 TOKEN";
}

// 当页面加载完成时初始化应用
window.addEventListener('DOMContentLoaded', initApp); 