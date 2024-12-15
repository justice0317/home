// 側邊欄功能
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.getElementById('sidebar');
const email = sessionStorage.getItem('email');
const username = sessionStorage.getItem('username');
const user_id = sessionStorage.getItem('user_id');
const icon_url = sessionStorage.getItem('icon_url');
sessionStorage.setItem('email', email);
sessionStorage.setItem('username', username);
sessionStorage.setItem('user_id', user_id);
sessionStorage.setItem('icon_url', icon_url);

if (user_id) {
    // 顯示用戶名
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

menuBtn.addEventListener('click', () => {
    sidebar.style.left = '0'; // 展開側邊欄
});

closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-100%'; // 收起側邊欄
});

// 確認按鈕功能
const confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('icon_url');
    window.location.href = 'logout.html'; // 跳轉回登錄頁面
    // 跳轉到登出後的頁面
    window.location.href = '/logout-success.html';
});
