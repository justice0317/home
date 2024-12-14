const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
const menuButton = document.querySelector('.menu-btn');
const closeButton = document.querySelector('.close-btn');
const nextButton = document.querySelector('.next-btn');
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
// 建立遮罩元素
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// 彈跳視窗控制
menuButton.addEventListener('click', () => {
    sidebar.style.left = '0';
    overlay.classList.add('active');
});

closeButton.addEventListener('click', () => {
    sidebar.style.left = '-100%';
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    sidebar.style.left = '-100%';
    overlay.classList.remove('active');
});

// 按鈕跳轉功能
nextButton.addEventListener('click', () => {
    window.location.href = 'backClearDetection.html';
});