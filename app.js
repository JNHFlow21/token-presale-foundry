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
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256"
            }
        ],
        "name": "getEthUsdPrice",
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
    setContractButton: document.getElementById("setContractButton"), // 添加设置合约按钮
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
    unpauseButton: document.getElementById("unpauseButton"),
    reconnectButton: document.getElementById("reconnectButton")  // 添加重连按钮
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
    elements.setContractButton.addEventListener('click', setContractAddress); // 添加设置合约地址监听器
    elements.fundForm.addEventListener('submit', handleFund);
    elements.claimButton.addEventListener('click', handleClaim);
    elements.withdrawButton.addEventListener('click', handleWithdraw);
    elements.pauseButton.addEventListener('click', handlePause);
    elements.unpauseButton.addEventListener('click', handleUnpause);
    elements.reconnectButton.addEventListener('click', reconnectContract);  // 添加重连按钮监听器
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

// 重新连接合约
async function reconnectContract() {
    try {
        // 清除localStorage中保存的合约地址
        localStorage.removeItem('contractAddress');
        
        showStatus("已断开合约连接，请输入新的合约地址", "info");
        
        // 直接提示用户输入新合约地址
        const userInput = prompt("请输入TokenPresale合约地址:");
        console.log("用户输入的合约地址:", userInput);
        
        if (userInput && ethers.utils.isAddress(userInput)) {
            appState.contractAddress = userInput;
            localStorage.setItem('contractAddress', userInput);
            showStatus("正在连接到新合约地址...", "info");
            
            // 如果当前有账户连接，则重新设置合约
            if (appState.currentAccount) {
                // 直接创建新合约实例
                appState.contract = new ethers.Contract(
                    appState.contractAddress,
                    contractABI,
                    appState.signer
                );
                
                // 显示合约地址
                elements.contractAddress.textContent = appState.contractAddress;
                
                // 刷新合约数据
                await refreshContractData();
            }
        } else {
            showStatus("提供的合约地址无效，请重试", "danger");
        }
    } catch (error) {
        console.error("重新连接合约时出错:", error);
        showStatus("重新连接合约时出错: " + error.message, "danger");
    }
}

// 设置Provider和合约
async function setupProviderAndContract() {
    if (!window.ethereum) return;
    
    try {
        console.log("开始设置Provider和合约...");
        // 创建Provider - 修复这里的初始化方式，移除错误的polling选项
        appState.provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // 获取Chain ID
        const network = await appState.provider.getNetwork();
        appState.chainId = network.chainId.toString();
        console.log("当前网络ID:", appState.chainId);
        
        // 检查是否是支持的链
        if (!supportedChains[appState.chainId]) {
            showStatus(`不支持的网络。请切换到支持的网络: ${Object.values(supportedChains).map(c => c.name).join(', ')}`, "danger");
            return;
        }
        
        // 创建Signer
        appState.signer = appState.provider.getSigner();
        console.log("成功创建Signer");
        
        // 获取合约地址
        appState.contractAddress = localStorage.getItem('contractAddress');
        console.log("从localStorage获取的合约地址:", appState.contractAddress);
        
        if (!appState.contractAddress) {
            // 如果没有保存的地址，直接提示用户输入
            const userInput = prompt("请输入TokenPresale合约地址:");
            console.log("用户输入的合约地址:", userInput);
            
            if (userInput && ethers.utils.isAddress(userInput)) {
                appState.contractAddress = userInput;
                try {
                    localStorage.setItem('contractAddress', userInput);
                    console.log("合约地址已保存到localStorage");
                } catch (storageError) {
                    console.error("保存到localStorage失败:", storageError);
                    // 继续执行，即使localStorage失败
                }
            } else {
                showStatus("请提供有效的合约地址", "danger");
                return;
            }
        }
        
        // 创建合约实例
        try {
            console.log("正在创建合约实例，地址:", appState.contractAddress);
            appState.contract = new ethers.Contract(
                appState.contractAddress,
                contractABI,
                appState.signer
            );
            console.log("合约实例创建成功");
            
            // 显示合约地址
            elements.contractAddress.textContent = appState.contractAddress;
            
            // 检查当前用户是否是合约拥有者
            try {
                console.log("正在检查合约拥有者...");
                // 使用明确的blockTag参数确保获取最新状态
                const contractOwner = await appState.contract.owner({ blockTag: 'latest' });
                console.log("合约拥有者:", contractOwner);
                console.log("当前账户:", appState.currentAccount);
                
                appState.isOwner = contractOwner.toLowerCase() === appState.currentAccount.toLowerCase();
                console.log("当前用户是合约拥有者:", appState.isOwner);
                
                // 如果是拥有者，显示管理员部分
                elements.adminSection.style.display = appState.isOwner ? "block" : "none";
                
                showStatus("合约连接成功", "success");
                
                // 获取实时ETH/USD价格用于预估
                try {
                    const oneEth = ethers.utils.parseEther("1.0");
                    const usdValue = await appState.contract.getEthUsdPrice(oneEth, { blockTag: 'latest' });
                    appState.etherToUsdRate = parseFloat(ethers.utils.formatUnits(usdValue, 18));
                    console.log("已更新ETH/USD汇率:", appState.etherToUsdRate);
                } catch (priceError) {
                    console.error("获取ETH/USD价格失败:", priceError);
                    // 保持默认值
                }
            } catch (ownerError) {
                console.error("获取合约拥有者时出错:", ownerError);
                showStatus("获取合约信息失败，合约地址可能无效", "warning");
            }
        } catch (contractError) {
            console.error("创建合约实例时出错:", contractError);
            showStatus("创建合约实例失败，请检查合约地址是否正确", "danger");
        }
        
    } catch (error) {
        console.error("设置提供者和合约时出错:", error);
        showStatus("设置提供者和合约时出错: " + error.message, "danger");
    }
}

// 刷新合约数据
async function refreshContractData() {
    if (!appState.contract) return;
    
    try {
        // 获取目标金额
        const goalInUsd = ethers.utils.formatUnits(await appState.contract.goalInUsd({ blockTag: 'latest' }), 18);
        elements.goalInUsd.textContent = `${goalInUsd} USD`;
        
        // 获取总共募集的金额
        const totalRaised = ethers.utils.formatUnits(await appState.contract.totalUsdRaised({ blockTag: 'latest' }), 18);
        elements.totalRaised.textContent = `${parseFloat(totalRaised).toFixed(2)} USD`;
        
        // 更新进度条
        const progressPercentage = Math.min((parseFloat(totalRaised) / parseFloat(goalInUsd)) * 100, 100);
        elements.progressBar.style.width = `${progressPercentage}%`;
        
        // 检查目标是否已达成
        const goalReached = parseFloat(totalRaised) >= parseFloat(goalInUsd);
        
        // 获取预售结束时间 - 修改为使用最新区块
        const endTimeInSeconds = await appState.contract.presaleEndTime({ blockTag: 'latest' });
        const endTime = new Date(endTimeInSeconds.toNumber() * 1000);
        const now = new Date();
        
        // 计算剩余时间或检查是否目标已达成/时间已结束
        let timeDisplay;
        if (goalReached) {
            // 如果目标已达成，显示"目标达成"
            timeDisplay = "目标达成";
            elements.presaleStatus.textContent = "已结束";
            elements.presaleStatus.className = "text-success";
        } else if (endTime > now) {
            // 如果时间未结束且目标未达成，显示倒计时
            const diff = Math.floor((endTime - now) / 1000);
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;
            timeDisplay = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            elements.presaleStatus.textContent = "进行中";
            elements.presaleStatus.className = "text-success";
        } else {
            // 如果时间已结束，显示"已结束"
            timeDisplay = "已结束";
            elements.presaleStatus.textContent = "已结束";
            elements.presaleStatus.className = "text-danger";
        }
        elements.presaleEndTime.textContent = timeDisplay;
        
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
                // 分别获取用户信息，避免getUserInfo函数的canClaim修饰符限制
                // 获取用户贡献
                const userContributed = await appState.contract.userUsdContributed(appState.currentAccount, { blockTag: 'latest' });
                elements.myContribution.textContent = `${ethers.utils.formatUnits(userContributed, 18)} USD`;
                
                // 获取已领取代币
                const userClaimedTokens = await appState.contract.userClaimedTokens(appState.currentAccount, { blockTag: 'latest' });
                elements.myClaimedTokens.textContent = `${userClaimedTokens.toString()} TOKEN`;
                
                // 尝试获取可领取代币，如果失败则显示为0
                let claimable = 0;
                if (isClaimEnabled) {
                    try {
                        // 检查用户是否有贡献
                        const hasContributed = await appState.contract.hasContributed(appState.currentAccount, { blockTag: 'latest' });
                        
                        if (hasContributed) {
                            try {
                                claimable = await appState.contract.getTokenClaimable(appState.currentAccount, { blockTag: 'latest' });
                            } catch (claimError) {
                                console.log("获取可领取代币时出错，可能是代币领取尚未启用:", claimError);
                                // 如果出现错误，尝试通过计算估算可领取代币
                                try {
                                    // 用户总代币 = 用户贡献 * 代币兑换比率
                                    const userTotalToken = await appState.contract.userTotalToken(appState.currentAccount, { blockTag: 'latest' });
                                    claimable = userTotalToken.sub(userClaimedTokens);
                                    if (claimable.lt(0)) claimable = ethers.BigNumber.from(0);
                                } catch (calcError) {
                                    console.log("计算可领取代币失败:", calcError);
                                    claimable = 0;
                                }
                            }
                        }
                    } catch (error) {
                        console.log("检查用户贡献状态失败:", error);
                        claimable = 0;
                    }
                }
                elements.myClaimableTokens.textContent = `${claimable.toString()} TOKEN`;
                
                // 如果没有可领取的代币，禁用领取按钮
                elements.claimButton.disabled = claimable.toString() === "0" || !isClaimEnabled;
            } catch (error) {
                console.error("获取用户信息时出错:", error);
                // 错误处理 - 显示默认值或错误提示
                elements.myContribution.textContent = "无法获取";
                elements.myClaimedTokens.textContent = "无法获取";
                elements.myClaimableTokens.textContent = "无法获取";
                elements.claimButton.disabled = true;
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
            const canWithdraw = goalReached || endTime <= now;
            elements.withdrawButton.disabled = !canWithdraw;
        }
        
        // 更新ETH/USD汇率
        try {
            const oneEth = ethers.utils.parseEther("1.0");
            const usdValue = await appState.contract.getEthUsdPrice(oneEth, { blockTag: 'latest' });
            appState.etherToUsdRate = parseFloat(ethers.utils.formatUnits(usdValue, 18));
            // 如果当前有ETH输入，更新USD估值显示
            if (elements.ethAmount.value) {
                updateUsdValue();
            }
        } catch (priceError) {
            console.log("更新ETH/USD汇率失败:", priceError);
            // 保持当前汇率
        }
        
    } catch (error) {
        console.error("刷新合约数据时出错:", error);
        showStatus("刷新数据时出错，请检查合约连接", "warning");
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
        
        // 确保使用最新区块状态
        await refreshContractData();
        
        // 预先检查可能的失败条件
        try {
            // 检查预售是否已结束
            const presaleEndTime = await appState.contract.presaleEndTime({ blockTag: 'latest' });
            const now = Math.floor(Date.now() / 1000); // 当前时间（秒）
            if (now > presaleEndTime) {
                showStatus("预售已结束，无法参与", "warning");
                elements.fundButton.disabled = false;
                return;
            }
            
            // 检查目标是否已达成
            const goalInUsd = await appState.contract.goalInUsd({ blockTag: 'latest' });
            const totalRaised = await appState.contract.totalUsdRaised({ blockTag: 'latest' });
            if (totalRaised.gte(goalInUsd)) {
                showStatus("募集目标已达成，无法参与", "warning");
                elements.fundButton.disabled = false;
                return;
            }
            
            // 检查合约是否暂停
            const isPaused = await appState.contract.paused({ blockTag: 'latest' });
            if (isPaused) {
                showStatus("预售已暂停，无法参与", "warning");
                elements.fundButton.disabled = false;
                return;
            }
            
            // 获取当前ETH/USD价格
            const provider = appState.provider;
            const network = await provider.getNetwork();
            // 尝试直接从合约获取最新的ETH/USD价格估算
            let minUsdAmount = 0;
            try {
                // 使用call直接调用合约的估值逻辑（无需实际执行交易）
                const callData = appState.contract.interface.encodeFunctionData("getEthUsdPrice", [ethers.utils.parseEther(ethAmount)]);
                const result = await provider.call({
                    to: appState.contractAddress,
                    data: callData
                });
                const decodedUsdAmount = ethers.utils.defaultAbiCoder.decode(['uint256'], result)[0];
                minUsdAmount = parseFloat(ethers.utils.formatUnits(decodedUsdAmount, 18));
                
                // 合约可能要求最低10美元贡献
                if (minUsdAmount < 10) {
                    showStatus(`当前ETH金额(${ethAmount})价值约${minUsdAmount.toFixed(2)}美元，低于最低要求的10美元`, "warning");
                    elements.fundButton.disabled = false;
                    return;
                }
            } catch (priceError) {
                console.log("无法通过合约获取ETH/USD价格估算:", priceError);
                // 继续执行，因为我们可能无法直接调用getEthUsdPrice
            }
            
            // 通过模拟交易检测潜在错误
            try {
                // 首先刷新Provider确保使用最新状态 - 修复错误的Provider初始化
                // 移除错误的polling选项
                appState.provider = new ethers.providers.Web3Provider(window.ethereum);
                appState.signer = appState.provider.getSigner();
                
                // 创建交易对象
                const tx = {
                    from: appState.currentAccount,
                    to: appState.contractAddress,
                    value: ethers.utils.parseEther(ethAmount),
                    data: appState.contract.interface.encodeFunctionData("fund", [])
                };
                
                // 模拟交易
                const callResult = await appState.provider.call(tx, 'latest');
                console.log("模拟调用成功，交易可能会成功", callResult);
            } catch (callError) {
                console.error("模拟调用详细错误:", callError);
                
                // 解析合约错误
                if (typeof callError.message === 'string') {
                    if (callError.data) {
                        // 尝试解码错误数据
                        try {
                            const errorData = callError.data;
                            
                            // 检查常见错误签名
                            if (errorData.includes("TooSmall")) {
                                showStatus("捐赠金额太小，最低需要等值10 USD的ETH", "danger");
                                elements.fundButton.disabled = false;
                                return;
                            } else if (errorData.includes("PresaleEnded")) {
                                showStatus("预售已结束", "danger");
                                elements.fundButton.disabled = false;
                                return;
                            } else if (errorData.includes("GoalReached")) {
                                showStatus("募集目标已达成", "danger");
                                elements.fundButton.disabled = false;
                                return;
                            } else {
                                // 显示通用错误
                                showStatus(`交易预检失败: ${callError.message}`, "danger");
                                elements.fundButton.disabled = false;
                                return;
                            }
                        } catch (decodeError) {
                            console.error("无法解码错误数据:", decodeError);
                        }
                    } else if (callError.message.includes("TooSmall")) {
                        showStatus("捐赠金额太小，最低需要等值10 USD的ETH", "danger");
                        elements.fundButton.disabled = false;
                        return;
                    } else if (callError.message.includes("PresaleEnded")) {
                        showStatus("预售已结束", "danger");
                        elements.fundButton.disabled = false;
                        return;
                    } else if (callError.message.includes("GoalReached")) {
                        showStatus("募集目标已达成", "danger");
                        elements.fundButton.disabled = false;
                        return;
                    } else {
                        // 显示通用错误
                        console.log("未识别的预检错误，将尝试执行交易:", callError.message);
                    }
                } else {
                    console.log("无法解析的预检错误，将尝试执行交易");
                }
            }
        } catch (checkError) {
            console.error("预先检查时出错:", checkError);
            // 继续执行，因为预检查可能不准确
        }
        
        // 发送交易 - 使用低级交易对象以获得更好的控制
        try {
            const signer = appState.provider.getSigner();
            // 创建交易对象
            const txData = appState.contract.interface.encodeFunctionData("fund", []);
            const gasEstimate = await signer.estimateGas({
                to: appState.contractAddress,
                value: ethers.utils.parseEther(ethAmount),
                data: txData
            }).catch(err => {
                console.error("Gas估算失败:", err);
                return ethers.BigNumber.from(1000000); // 备用gas限制
            });
            
            // 增加20%的gas以确保足够
            const gasLimit = gasEstimate.mul(120).div(100);
            
            console.log("估算的gas限制:", gasLimit.toString());
            
            const tx = await signer.sendTransaction({
                to: appState.contractAddress,
                value: ethers.utils.parseEther(ethAmount),
                data: txData,
                gasLimit: gasLimit
            });
            
            showStatus("交易已提交，等待确认...", "info");
            console.log("交易哈希:", tx.hash);
            
            // 等待交易确认
            const receipt = await tx.wait();
            console.log("交易收据:", receipt);
            
            // 检查交易状态
            if (receipt.status === 0) {
                throw new Error("交易执行失败，但没有提供具体错误信息");
            }
            
            showStatus("成功参与预售！", "success");
            
            // 刷新数据
            await refreshContractData();
            
            // 清空输入
            elements.ethAmount.value = "";
            elements.usdValue.textContent = "0";
        } catch (txError) {
            console.error("交易执行错误:", txError);
            
            // 尝试分析错误
            if (txError.receipt) {
                console.log("交易收据详情:", txError.receipt);
                
                // 交易被回滚但没有明确的错误信息，尝试获取更多信息
                try {
                    // 检查链上状态来推断可能的原因
                    const isPaused = await appState.contract.paused({ blockTag: 'latest' });
                    const presaleEndTime = await appState.contract.presaleEndTime({ blockTag: 'latest' });
                    const now = Math.floor(Date.now() / 1000);
                    const goalInUsd = await appState.contract.goalInUsd({ blockTag: 'latest' });
                    const totalRaised = await appState.contract.totalUsdRaised({ blockTag: 'latest' });
                    
                    if (isPaused) {
                        showStatus("交易失败: 预售已暂停", "danger");
                    } else if (now > presaleEndTime) {
                        showStatus("交易失败: 预售已结束", "danger");
                    } else if (totalRaised.gte(goalInUsd)) {
                        showStatus("交易失败: 募集目标已达成", "danger");
                    } else {
                        showStatus("交易失败: 金额可能太小或合约出现其他问题", "danger");
                    }
                } catch (stateError) {
                    console.error("检查合约状态失败:", stateError);
                    showStatus("交易执行失败，但无法确定具体原因", "danger");
                }
            } else if (txError.message.includes("user rejected")) {
                showStatus("用户取消了交易", "warning");
            } else {
                // 尝试从错误消息中提取有用信息
                let errorMessage = "交易失败";
                if (txError.message.includes("TooSmall")) {
                    errorMessage = "捐赠金额太小，最低需要等值10 USD的ETH";
                } else if (txError.message.includes("PresaleEnded")) {
                    errorMessage = "预售已结束";
                } else if (txError.message.includes("GoalReached")) {
                    errorMessage = "募集目标已达成";
                } else {
                    errorMessage += ": " + txError.message;
                }
                showStatus(errorMessage, "danger");
            }
        }
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
        // 检查合约余额
        const contractBalance = await appState.provider.getBalance(appState.contractAddress);
        if (contractBalance.isZero()) {
            showStatus("合约余额为0，没有ETH可提取", "warning");
            return;
        }
        
        console.log("合约余额:", ethers.utils.formatEther(contractBalance), "ETH");
        
        // 检查预售是否结束（目标达成或时间结束）
        const goalInUsd = ethers.utils.formatUnits(await appState.contract.goalInUsd({ blockTag: 'latest' }), 18);
        const totalRaised = ethers.utils.formatUnits(await appState.contract.totalUsdRaised({ blockTag: 'latest' }), 18);
        const goalReached = parseFloat(totalRaised) >= parseFloat(goalInUsd);
        
        const endTimeInSeconds = await appState.contract.presaleEndTime({ blockTag: 'latest' });
        const endTime = new Date(endTimeInSeconds.toNumber() * 1000);
        const now = new Date();
        const timeEnded = now >= endTime;
        
        if (!goalReached && !timeEnded) {
            showStatus("预售尚未结束且未达到目标，无法提取ETH", "warning");
            return;
        }
        
        // 禁用按钮防止重复点击
        elements.withdrawButton.disabled = true;
        showStatus("处理中...", "info");
        
        // 检查是否有预估Gas错误
        try {
            await appState.contract.estimateGas.withdrawETH();
        } catch (gasError) {
            console.error("预估Gas失败:", gasError);
            if (gasError.message.includes("notFinished")) {
                showStatus("预售尚未结束或未达到目标，无法提取ETH", "danger");
                elements.withdrawButton.disabled = false;
                return;
            }
        }
        
        // 发送交易 - 添加合适的gas限制和错误处理
        const tx = await appState.contract.withdrawETH({
            gasLimit: 1000000 // 提高gas限制
        });
        
        showStatus("交易已提交，等待确认...", "info");
        
        // 等待交易确认
        const receipt = await tx.wait();
        
        // 检查交易是否成功
        if (receipt.status === 1) {
            console.log("提取ETH交易成功，交易哈希:", tx.hash);
            
            // 验证ETH是否已转移到管理员账户
            const newContractBalance = await appState.provider.getBalance(appState.contractAddress);
            
            if (newContractBalance.lt(contractBalance)) {
                showStatus("成功提取ETH！", "success");
            } else {
                showStatus("交易成功但合约余额未变化，请检查智能合约逻辑", "warning");
            }
        } else {
            showStatus("交易失败，请检查智能合约", "danger");
        }
        
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
        } else if (error.message.includes("withdrawFailed")) {
            errorMessage = "ETH提取失败，转账出错";
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

// 设置合约地址
async function setContractAddress() {
    try {
        // 检查钱包是否连接
        if (!appState.provider || !appState.signer) {
            // 先尝试连接钱包
            try {
                await connectWallet();
                
                // 如果连接后仍然没有provider或signer，提示错误
                if (!appState.provider || !appState.signer) {
                    showStatus("请先连接钱包，然后再设置合约地址", "warning");
                    return;
                }
            } catch (walletError) {
                console.error("连接钱包失败:", walletError);
                showStatus("请先连接钱包，然后再设置合约地址", "warning");
                return;
            }
        }
        
        const userInput = prompt("请输入TokenPresale合约地址:");
        console.log("用户输入的合约地址:", userInput);
        
        if (!userInput) {
            showStatus("未提供合约地址", "warning");
            return;
        }
        
        if (!ethers.utils.isAddress(userInput)) {
            showStatus("提供的合约地址无效，请重试", "danger");
            return;
        }
        
        // 清除之前的合约地址
        localStorage.removeItem('contractAddress');
        
        // 保存新的合约地址
        appState.contractAddress = userInput;
        try {
            localStorage.setItem('contractAddress', userInput);
            console.log("合约地址已保存到localStorage");
        } catch (storageError) {
            console.error("保存到localStorage失败:", storageError);
            // 继续执行，即使localStorage失败
        }
        
        showStatus("正在连接到新合约地址...", "info");
        
        try {
            // 创建合约实例
            appState.contract = new ethers.Contract(
                appState.contractAddress,
                contractABI,
                appState.signer
            );
            console.log("合约实例创建成功");
            
            // 显示合约地址
            elements.contractAddress.textContent = appState.contractAddress;
            
            // 检查当前用户是否是合约拥有者
            const contractOwner = await appState.contract.owner({ blockTag: 'latest' });
            appState.isOwner = contractOwner.toLowerCase() === appState.currentAccount.toLowerCase();
            
            // 如果是拥有者，显示管理员部分
            elements.adminSection.style.display = appState.isOwner ? "block" : "none";
            
            // 获取实时ETH/USD价格用于预估
            try {
                const oneEth = ethers.utils.parseEther("1.0");
                const usdValue = await appState.contract.getEthUsdPrice(oneEth, { blockTag: 'latest' });
                appState.etherToUsdRate = parseFloat(ethers.utils.formatUnits(usdValue, 18));
                console.log("已更新ETH/USD汇率:", appState.etherToUsdRate);
            } catch (priceError) {
                console.error("获取ETH/USD价格失败:", priceError);
                // 保持默认值
            }
            
            // 刷新合约数据
            await refreshContractData();
            
            showStatus("合约连接成功", "success");
        } catch (error) {
            console.error("创建合约实例时出错:", error);
            showStatus("创建合约实例失败: " + error.message, "danger");
        }
    } catch (error) {
        console.error("设置合约地址时出错:", error);
        showStatus("设置合约地址时出错: " + error.message, "danger");
    }
} 