
const STORAGE_KEYS = {
    CURRENT_PLAN: 'currentPlan',
    TRANSACTIONS: 'transactions',
    MOBILE_NUMBER: 'mobileNumber'
};


function handlePaymentSubmission(paymentType) {
   
    const planDetails = JSON.parse(localStorage.getItem('planDetails'));
    const mobileNumber = localStorage.getItem(STORAGE_KEYS.MOBILE_NUMBER);
    
    if (!planDetails || !mobileNumber) {
        alert('Plan details or mobile number not found');
        return;
    }

 
    const transaction = {
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        plan: planDetails.info,
        amount: planDetails.price,
        status: 'Success',
        id: Math.random().toString(36).substr(2, 9)
    };

   
    const currentPlan = {
        price: planDetails.price,
        info: planDetails.info,
        activationDate: new Date().toISOString(),
       
        expiryDate: calculateExpiryDate(planDetails.info)
    };
    
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_PLAN, JSON.stringify(currentPlan));
    
   
    const existingTransactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    existingTransactions.unshift(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(existingTransactions));

    
    showPaymentPopup(mobileNumber, planDetails);
}


function calculateExpiryDate(planInfo) {
    const validityMatch = planInfo.match(/(\d+)\s*Days/);
    const daysValidity = validityMatch ? parseInt(validityMatch[1]) : 28; 
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysValidity);
    return expiryDate.toISOString();
}


function loadProfilePageData() {
    const currentPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_PLAN));
    const transactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]');
    
    if (currentPlan) {
        updateCurrentPlanDisplay(currentPlan);
    }
    
    if (transactions.length > 0) {
        updateTransactionsTable(transactions);
    }
}

function updateCurrentPlanDisplay(plan) {
    const expiryDate = new Date(plan.expiryDate);
    const today = new Date();
    const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    
    document.querySelector('.plan-price').textContent = `${plan.price} - ${plan.info.split('|')[0].trim()}`;
    document.querySelector('.expiry-badge').textContent = `Expires in ${daysRemaining} days`;
    
   
    const features = plan.info.split('|');
    const featureElements = document.querySelectorAll('.feature-item p');
    features.forEach((feature, index) => {
        if (featureElements[index]) {
            featureElements[index].textContent = feature.trim();
        }
    });
}

function updateTransactionsTable(transactions) {
    const tbody = document.querySelector('.transactions-section table tbody');
    tbody.innerHTML = transactions.slice(0, 5).map(transaction => `
        <tr>
            <td>${transaction.date}</td>
            <td>${transaction.plan}</td>
            <td>${transaction.amount}</td>
            <td><span class="status-success">${transaction.status}</span></td>
            <td><i class="bi bi-file-earmark-arrow-down download-icon" onclick="downloadReceipt('${transaction.id}')"></i></td>
        </tr>
    `).join('');
}