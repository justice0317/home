// 按鈕點擊導向
function redirectTo(action) {
    if (action === 'login') {
        window.location.href = '你的登入網址'; // 替換成你的登入頁面網址
    } else if (action === 'signup') {
        window.location.href = '你的註冊網址'; // 替換成你的註冊頁面網址
    }
}
