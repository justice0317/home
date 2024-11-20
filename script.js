// 按鈕點擊導向
function redirectTo(action) {
    if (action === 'login') {
        window.location.href = 'https://login-phi-amber.vercel.app'; // 替換成你的登入頁面網址
    } else if (action === 'signup') {
        window.location.href = 'https://signin-black.vercel.app'; // 替換成你的註冊頁面網址
    }
}
