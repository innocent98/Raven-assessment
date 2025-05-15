// Trading Platform JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTradingPairsSearch();
    initOrderFormCalculations();
    initTimeIntervalSwitching();
});

// ========== 1. Trading Pairs Search Functionality ==========

function initTradingPairsSearch() {
    // Create a search input in the trading pair section
    const tradingPairContainer = document.querySelector('.trading-pair__container');
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'trading-pair__search';
    searchContainer.innerHTML = `
        <div class="trading-pair__search-wrapper">
            <input type="text" class="trading-pair__search-input" placeholder="Search pairs...">
            <i class="fas fa-search trading-pair__search-icon"></i>
        </div>
        <div class="trading-pair__search-results"></div>
    `;
    
    // Insert after trading pair selector
    tradingPairContainer.appendChild(searchContainer);
    
    // Add styles for search
    const style = document.createElement('style');
    style.textContent = `
        .trading-pair__search {
            position: relative;
            margin-left: 20px;
            
        }
        .trading-pair__search-wrapper {
            position: relative;
        }
        .trading-pair__search-input {
            padding: 8px 12px 8px 30px;
            background-color: var(--color-input-background);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-sm);
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            width: 180px;
        }
        .trading-pair__search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-secondary);
            font-size: 12px;
        }
        .trading-pair__search-results {
            position: absolute;
            top: 100%;
            left: 0;
            width: 120%;
            background-color: var(--color-background-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-sm);
            margin-top: 4px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 10;
            display: none;
        }
        .trading-pair__search-results.active {
            display: block;
        }
        .trading-pair__search-item {
            padding: 8px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        .trading-pair__search-item:hover {
            background-color: var(--color-background);
        }
        .trading-pair__search-icons {
            display: flex;
            margin-right: 8px;
        }
        .trading-pair__search-icon-coin {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
        }
        .trading-pair__search-name {
            font-weight: 500;
        }
        .trading-pair__search-price {
            margin-left: auto;
            font-size: 12px;
            color: var(--color-text-secondary);
        }
    `;
    document.head.appendChild(style);
    
    // Sample trading pairs data
    const tradingPairs = [
        { base: 'BTC', quote: 'USDT', baseColor: '#f7931a', quoteColor: '#26a17b', price: 20634.00, change: 1.25 },
        { base: 'ETH', quote: 'USDT', baseColor: '#627eea', quoteColor: '#26a17b', price: 1789.45, change: 0.75 },
        { base: 'SOL', quote: 'USDT', baseColor: '#00ffbd', quoteColor: '#26a17b', price: 43.21, change: -2.15 },
        { base: 'BNB', quote: 'USDT', baseColor: '#f3ba2f', quoteColor: '#26a17b', price: 243.87, change: 0.32 },
        { base: 'XRP', quote: 'USDT', baseColor: '#23292f', quoteColor: '#26a17b', price: 0.5123, change: -0.45 },
        { base: 'ADA', quote: 'USDT', baseColor: '#0033ad', quoteColor: '#26a17b', price: 0.4321, change: 1.05 },
        { base: 'DOGE', quote: 'USDT', baseColor: '#c3a634', quoteColor: '#26a17b', price: 0.0876, change: 3.45 },
        { base: 'DOT', quote: 'USDT', baseColor: '#e6007a', quoteColor: '#26a17b', price: 6.78, change: -0.23 },
        { base: 'MATIC', quote: 'USDT', baseColor: '#8247e5', quoteColor: '#26a17b', price: 0.9876, change: 2.34 },
        { base: 'AVAX', quote: 'USDT', baseColor: '#e84142', quoteColor: '#26a17b', price: 21.43, change: 1.12 },
        { base: 'BTC', quote: 'USD', baseColor: '#f7931a', quoteColor: '#6b8aff', price: 20635.50, change: 1.27 },
        { base: 'ETH', quote: 'USD', baseColor: '#627eea', quoteColor: '#6b8aff', price: 1790.12, change: 0.78 }
    ];
    
    const searchInput = document.querySelector('.trading-pair__search-input');
    const searchResults = document.querySelector('.trading-pair__search-results');
    
    // Handle search input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (query.length < 1) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Filter pairs based on search
        const filteredPairs = tradingPairs.filter(pair => {
            const pairName = `${pair.base}${pair.quote}`.toLowerCase();
            const pairWithSlash = `${pair.base}/${pair.quote}`.toLowerCase();
            return pairName.includes(query) || pairWithSlash.includes(query);
        });
        
        // Display results
        if (filteredPairs.length > 0) {
            searchResults.innerHTML = '';
            filteredPairs.forEach(pair => {
                const changeClass = pair.change >= 0 ? 'positive' : 'negative';
                const changeSymbol = pair.change >= 0 ? '+' : '';
                
                const resultItem = document.createElement('div');
                resultItem.className = 'trading-pair__search-item';
                resultItem.innerHTML = `
                    <div class="trading-pair__search-icons">
                        <div class="trading-pair__search-icon-coin" style="background-color: ${pair.baseColor}; color: white; z-index: 2;">${pair.base.charAt(0)}</div>
                        <div class="trading-pair__search-icon-coin" style="background-color: ${pair.quoteColor}; color: white; margin-left: -8px;">${pair.quote.charAt(0)}</div>
                    </div>
                    <div class="trading-pair__search-name">${pair.base}/${pair.quote}</div>
                    <div class="trading-pair__search-price" style="color: ${pair.change >= 0 ? 'var(--color-accent)' : 'var(--color-negative)'}">
                        $${pair.price.toFixed(2)} (${changeSymbol}${pair.change}%)
                    </div>
                `;
                
                // Handle click on search result
                resultItem.addEventListener('click', function() {
                    selectTradingPair(pair);
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                });
                
                searchResults.appendChild(resultItem);
            });
            
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="trading-pair__search-item">No results found</div>';
            searchResults.classList.add('active');
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.trading-pair__search')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Function to select a trading pair
    function selectTradingPair(pair) {
        // Update trading pair display
        const pairName = document.querySelector('.trading-pair__name');
        const pairPrice = document.querySelector('.trading-pair__current-price');
        const pairIcons = document.querySelectorAll('.trading-pair__icon');
        
        pairName.textContent = `${pair.base}/${pair.quote}`;
        pairPrice.textContent = `$${pair.price.toFixed(2)}`;
        
        // Update icons
        if (pairIcons.length >= 2) {
            pairIcons[0].textContent = pair.base.charAt(0);
            pairIcons[0].style.backgroundColor = pair.baseColor;
            
            pairIcons[1].textContent = pair.quote.charAt(0);
            pairIcons[1].style.backgroundColor = pair.quoteColor;
        }
        
        // Update chart title
        const chartPair = document.querySelector('.chart-area__pair');
        if (chartPair) {
            chartPair.textContent = `${pair.base}/${pair.quote}`;
        }
        
        // Update order form
        const orderFormPrice = document.querySelector('.order-form__input[value="0.00"]');
        if (orderFormPrice) {
            orderFormPrice.value = pair.price.toFixed(2);
            // Trigger calculation update
            orderFormPrice.dispatchEvent(new Event('input'));
        }
    }
}

// ========== 2. Order Form Calculations ==========

function initOrderFormCalculations() {
    // Get form elements
    const orderForm = document.querySelector('.order-form');
    const buyTab = document.querySelector('.order-form__tab-btn:nth-child(1)');
    const sellTab = document.querySelector('.order-form__tab-btn:nth-child(2)');
    const priceInput = document.querySelector('.order-form__input-group:nth-child(1) .order-form__input');
    const amountInput = document.querySelector('.order-form__input-group:nth-child(2) .order-form__input');
    const totalValue = document.querySelector('.order-form__total-value');
    const submitButton = document.querySelector('.order-form__submit-btn');
    
    // Set initial values
    priceInput.value = '36641.20';
    amountInput.value = '0.00';
    totalValue.textContent = '0.00';
    
    // Current order type (buy or sell)
    let currentOrderType = 'buy';
    
    // Handle tab switching
    buyTab.addEventListener('click', function() {
        buyTab.classList.add('order-form__tab-btn--active');
        sellTab.classList.remove('order-form__tab-btn--active');
        submitButton.textContent = 'Buy BTC';
        submitButton.style.background = 'linear-gradient(to right, var(--color-button-gradient-start), var(--color-button-gradient-end))';
        currentOrderType = 'buy';
    });
    
    sellTab.addEventListener('click', function() {
        sellTab.classList.add('order-form__tab-btn--active');
        buyTab.classList.remove('order-form__tab-btn--active');
        submitButton.textContent = 'Sell BTC';
        submitButton.style.backgroundColor = 'var(--color-negative)';
        submitButton.style.background = 'var(--color-negative)';
        currentOrderType = 'sell';
    });
    
    // Calculate total when price or amount changes
    function calculateTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const amount = parseFloat(amountInput.value) || 0;
        const total = price * amount;
        
        totalValue.textContent = total.toFixed(2);
    }
    
    // Add event listeners for input changes
    priceInput.addEventListener('input', calculateTotal);
    amountInput.addEventListener('input', calculateTotal);
    
    // Handle clicks on order book prices
    const orderBookPrices = document.querySelectorAll('.order-book__price');
    orderBookPrices.forEach(priceElement => {
        priceElement.addEventListener('click', function() {
            const price = this.textContent;
            priceInput.value = price;
            calculateTotal();
        });
    });
    
    // Add percentage buttons for amount selection
    const inputGroup = document.querySelector('.order-form__input-group:nth-child(2)');
    const percentageButtons = document.createElement('div');
    percentageButtons.className = 'order-form__percentage-buttons';
    percentageButtons.innerHTML = `
        <button type="button" data-percentage="25">25%</button>
        <button type="button" data-percentage="50">50%</button>
        <button type="button" data-percentage="75">75%</button>
        <button type="button" data-percentage="100">100%</button>
    `;
    
    inputGroup.appendChild(percentageButtons);
    
    // Add styles for percentage buttons
    const style = document.createElement('style');
    style.textContent = `
        .order-form__percentage-buttons {
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }
        .order-form__percentage-buttons button {
            flex: 1;
            padding: 4px;
            font-size: 12px;
            background-color: var(--color-button-background);
            border-radius: var(--border-radius-sm);
            color: var(--color-text-secondary);
            transition: all 0.2s;
        }
        .order-form__percentage-buttons button:hover {
            background-color: var(--color-button-hover);
            color: var(--color-text-primary);
        }
    `;
    document.head.appendChild(style);
    
    // Handle percentage button clicks
    const buttons = percentageButtons.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const percentage = parseInt(this.dataset.percentage);
            // In a real app, this would be based on available balance
            // For demo purposes, we'll use a fixed value of 1 BTC
            const availableBalance = 1; // 1 BTC
            const calculatedAmount = (availableBalance * percentage / 100).toFixed(6);
            
            amountInput.value = calculatedAmount;
            calculateTotal();
        });
    });
    
    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const price = parseFloat(priceInput.value);
        const amount = parseFloat(amountInput.value);
        const total = price * amount;
        
        if (price <= 0 || amount <= 0) {
            alert('Please enter valid price and amount values.');
            return;
        }
        
        // In a real app, this would send the order to the server
        alert(`Order placed: ${currentOrderType.toUpperCase()} ${amount} BTC at $${price} for a total of $${total.toFixed(2)}`);
    });
    
    // Make the submit button work
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const price = parseFloat(priceInput.value);
        const amount = parseFloat(amountInput.value);
        const total = price * amount;
        
        if (price <= 0 || amount <= 0) {
            alert('Please enter valid price and amount values.');
            return;
        }
        
        // In a real app, this would send the order to the server
        alert(`Order placed: ${currentOrderType.toUpperCase()} ${amount} BTC at $${price} for a total of $${total.toFixed(2)}`);
    });
}

// ========== 3. Time Interval Switching ==========

function initTimeIntervalSwitching() {
    // Get time interval buttons
    const timeButtons = document.querySelectorAll('.chart-controls__time-btn');
    
    // Sample chart data for different time intervals
    const chartData = {
        '1H': generateChartData(60, 0.2),
        '2H': generateChartData(30, 0.3),
        '4H': generateChartData(15, 0.5),
        '1D': generateChartData(24, 1),
        '1W': generateChartData(7, 2),
        '1M': generateChartData(30, 3)
    };
    
    // Add more time intervals
    const timeFramesContainer = document.querySelector('.chart-controls__time-frames');
    const dropdownButton = document.querySelector('.chart-controls__time-btn--dropdown');
    
    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'chart-controls__dropdown-menu';
    dropdownMenu.innerHTML = `
        <button class="chart-controls__dropdown-item" data-interval="5m">5m</button>
        <button class="chart-controls__dropdown-item" data-interval="15m">15m</button>
        <button class="chart-controls__dropdown-item" data-interval="30m">30m</button>
        <button class="chart-controls__dropdown-item" data-interval="3D">3D</button>
    `;
    
    // Insert dropdown after the dropdown button
    if (dropdownButton) {
        dropdownButton.parentNode.insertBefore(dropdownMenu, dropdownButton.nextSibling);
    }
    
    // Add styles for dropdown
    const style = document.createElement('style');
    style.textContent = `
        .chart-controls__time-frames {
            position: relative;
        }
        .chart-controls__dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: var(--color-background-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius-sm);
            padding: 4px;
            margin-top: 4px;
            z-index: 10;
            display: none;
        }
        .chart-controls__dropdown-menu.active {
            display: block;
        }
        .chart-controls__dropdown-item {
            display: block;
            width: 100%;
            text-align: left;
            padding: 6px 12px;
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            border-radius: var(--border-radius-sm);
        }
        .chart-controls__dropdown-item:hover {
            background-color: var(--color-button-background);
            color: var(--color-text-primary);
        }
    `;
    document.head.appendChild(style);
    
    // Toggle dropdown menu
    dropdownButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.chart-controls__time-btn--dropdown') && 
            !event.target.closest('.chart-controls__dropdown-menu')) {
            dropdownMenu.classList.remove('active');
        }
    });
    
    // Handle time interval button clicks
    timeButtons.forEach(button => {
        if (!button.classList.contains('chart-controls__time-btn--dropdown')) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                timeButtons.forEach(btn => btn.classList.remove('chart-controls__time-btn--active'));
                
                // Add active class to clicked button
                this.classList.add('chart-controls__time-btn--active');
                
                // Get interval from button text
                const interval = this.textContent.trim();
                
                // Update chart with new interval data
                updateChart(interval);
            });
        }
    });
    
    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll('.chart-controls__dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('chart-controls__time-btn--active'));
            
            // Get interval from data attribute
            const interval = this.dataset.interval;
            
            // Create new button for the selected interval
            const newButton = document.createElement('button');
            newButton.className = 'chart-controls__time-btn chart-controls__time-btn--active';
            newButton.textContent = interval;
            
            // Replace the last button before dropdown with the new one
            const lastButton = timeButtons[timeButtons.length - 2];
            timeFramesContainer.insertBefore(newButton, lastButton.nextSibling);
            timeFramesContainer.removeChild(lastButton);
            
            // Update chart with new interval data
            updateChart(interval);
            
            // Close dropdown
            dropdownMenu.classList.remove('active');
            
            // Add event listener to the new button
            newButton.addEventListener('click', function() {
                timeButtons.forEach(btn => btn.classList.remove('chart-controls__time-btn--active'));
                this.classList.add('chart-controls__time-btn--active');
                updateChart(this.textContent.trim());
            });
        });
    });
    
    // Function to update chart with new interval data
    function updateChart(interval) {
        // Get chart container
        const chartContainer = document.querySelector('.chart-area__placeholder');
        
        // Clear existing chart
        chartContainer.innerHTML = '';
        
        // Get data for the selected interval
        const data = chartData[interval] || generateChartData(20, 0.5);
        
        // Create candles
        data.forEach((candle, index) => {
            const candleElement = document.createElement('div');
            candleElement.className = `chart-area__candle chart-area__candle--${candle.type}`;
            candleElement.style.height = `${candle.height}px`;
            
            // Add wick lines
            const wickTop = document.createElement('div');
            wickTop.className = 'chart-area__candle-wick-top';
            wickTop.style.height = `${candle.wickTop}px`;
            
            const wickBottom = document.createElement('div');
            wickBottom.className = 'chart-area__candle-wick-bottom';
            wickBottom.style.height = `${candle.wickBottom}px`;
            
            candleElement.appendChild(wickTop);
            candleElement.appendChild(wickBottom);
            
            chartContainer.appendChild(candleElement);
        });
        
        // Add price line
        const priceLine = document.createElement('div');
        priceLine.className = 'chart-area__price-line';
        priceLine.textContent = '36,641.20';
        chartContainer.appendChild(priceLine);
        
        // Update chart info
        updateChartInfo(interval);
    }
    
    // Function to update chart info based on interval
    function updateChartInfo(interval) {
        const open = document.querySelector('.chart-area__stat--open');
        const high = document.querySelector('.chart-area__stat--high');
        const low = document.querySelector('.chart-area__stat--low');
        const close = document.querySelector('.chart-area__stat--close');
        const change = document.querySelector('.chart-area__stat--change');
        
        // Generate random values based on interval
        const basePrice = 36641.20;
        const randomFactor = interval === '1M' ? 0.1 : interval === '1W' ? 0.05 : interval === '1D' ? 0.02 : 0.01;
        
        const openPrice = (basePrice * (1 + (Math.random() - 0.5) * randomFactor)).toFixed(2);
        const highPrice = (basePrice * (1 + Math.random() * randomFactor)).toFixed(2);
        const lowPrice = (basePrice * (1 - Math.random() * randomFactor)).toFixed(2);
        const closePrice = (basePrice * (1 + (Math.random() - 0.5) * randomFactor)).toFixed(2);
        const changePercent = ((closePrice - openPrice) / openPrice * 100).toFixed(2);
        
        // Update text content
        if (open) open.textContent = `O ${openPrice}`;
        if (high) high.textContent = `H ${highPrice}`;
        if (low) low.textContent = `L ${lowPrice}`;
        if (close) close.textContent = `C ${closePrice}`;
        if (change) change.textContent = `Change: ${changePercent}%`;
    }
    
    // Function to generate random chart data
    function generateChartData(count, volatility) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const isUp = Math.random() > 0.5;
            data.push({
                type: isUp ? 'up' : 'down',
                height: 30 + Math.random() * 40,
                wickTop: 5 + Math.random() * 20,
                wickBottom: 5 + Math.random() * 20
            });
        }
        return data;
    }
    
    // Add styles for candle wicks
    const wickStyle = document.createElement('style');
    wickStyle.textContent = `
        .chart-area__candle {
            position: relative;
            width: 8px;
        }
        .chart-area__candle-wick-top,
        .chart-area__candle-wick-bottom {
            position: absolute;
            left: 50%;
            width: 1px;
            transform: translateX(-50%);
        }
        .chart-area__candle-wick-top {
            top: -1px;
            transform-origin: bottom;
        }
        .chart-area__candle-wick-bottom {
            bottom: -1px;
            transform-origin: top;
        }
        .chart-area__candle--up .chart-area__candle-wick-top,
        .chart-area__candle--up .chart-area__candle-wick-bottom {
            background-color: var(--color-accent);
        }
        .chart-area__candle--down .chart-area__candle-wick-top,
        .chart-area__candle--down .chart-area__candle-wick-bottom {
            background-color: var(--color-negative);
        }
    `;
    document.head.appendChild(wickStyle);
}