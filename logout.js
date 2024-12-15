// 側邊欄功能
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.style.left = '0'; // 展開側邊欄
});

closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-100%'; // 收起側邊欄
});

// 確認按鈕功能
const confirmBtn = document.querySelector('.confirm-btn');
confirmBtn.addEventListener('click', () => {
    // 跳轉到登出後的頁面
    window.location.href = '/logout-success.html';
});
