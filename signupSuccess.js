// 按鈕功能：導向登入頁
function redirectToLogin() {
    const email = sessionStorage.getItem('email');
    sessionStorage.setItem('email', email);

    window.location.href = "login.html"; // 替換為您的登入頁面網址
}

// 按鈕功能：導向主頁
function redirectToHome() {
    
    window.location.href = "index.html"; // 替換為您的主頁網址
}
