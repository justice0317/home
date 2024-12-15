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
