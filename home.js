const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
const menuButton = document.querySelector('.menu-btn');
const closeButton = document.querySelector('.close-btn');
const email = sessionStorage.getItem('email');
const username = sessionStorage.getItem('username');
const user_id = sessionStorage.getItem('user_id');
const icon_url = sessionStorage.getItem('icon_url');
sessionStorage.setItem('email', email);
sessionStorage.setItem('username', username);
sessionStorage.setItem('user_id', user_id);
sessionStorage.setItem('icon_url', icon_url);


if (user_id) {
    // 將用戶名顯示在頁面上
    const userNameElement = document.querySelector('.userName');
    userNameElement.textContent = username;
} else {
    // 如果沒有用戶信息，跳轉到登錄頁
    alert('未登入或會話已過期');
    window.location.href = 'index.html';
}

if(icon_url!="default"){
    const userIcon = document.querySelector('.userIcon');
    userIcon.src = icon_url;
}

function redirectToActionDetection() {
    if (user_id) {
        window.location.href = 'actionDetection.html';
    } else {
        alert('未登入或會話已過期');
        window.location.href = 'index.html';
    }
}

async function historyRecord() {
    try {
        const response = await fetch('http://localhost:5000//query_history_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_id }),
        });

        if (response.ok) {
            const data = await response.json();

            console.log('後端返回的數據:', data); // 確認返回的數據結構

            // 將後端返回的數據存入 sessionStorage
            sessionStorage.setItem('history_records', JSON.stringify(data.history_records)); // 這裡假設返回的數據中有 `history_records`

            // 跳轉到下一個頁面
            window.location.href = 'historyRecord.html';
        } else {
            const errorData = await response.json();
            console.log('後端錯誤數據:', errorData);
            alert(`獲取紀錄失敗: ${errorData.error}`);
        }
    } catch (error) {
        console.error('獲取紀錄過程中發生錯誤:', error);
        alert('伺服器連接失敗，請稍後再試！');
    }
}

// 建立遮罩元素
overlay.classList.add('overlay');
document.body.appendChild(overlay);

menuButton.addEventListener('click', () => {
    sidebar.style.left = '0'; // 彈跳視窗展開
    overlay.classList.add('active'); // 顯示遮罩
    document.body.classList.add('dimmed'); // 彈跳視窗以外區域透明
});

closeButton.addEventListener('click', () => {
    sidebar.style.left = '-100%'; // 彈跳視窗收回
    overlay.classList.remove('active'); // 隱藏遮罩
    document.body.classList.remove('dimmed'); // 恢復正常透明度
});

overlay.addEventListener('click', () => {
    sidebar.style.left = '-100%'; // 彈跳視窗收回
    overlay.classList.remove('active'); // 隱藏遮罩
    document.body.classList.remove('dimmed'); // 恢復正常透明度
});

function logout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    window.location.href = 'index.html'; // 跳轉回登錄頁面
}
