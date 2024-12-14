const savedEmail = sessionStorage.getItem('email');
if (savedEmail) {
    document.getElementById('email').value = savedEmail;
}

async function login() {
    // 獲取使用者輸入的值
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('請輸入電子郵件與密碼');
        return;
    }

    try {
        // 發送 POST 請求到後端
        const response = await fetch('http://54.150.30.200:5000/login', { // 替換成你的後端 API 地址
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            const { user_id, name, icon_url } = result.user;

            sessionStorage.setItem('user_id', user_id);
            sessionStorage.setItem('username', name);
            sessionStorage.setItem('icon_url', icon_url);

            alert(result.message);

            // 跳轉到 home.html
            window.location.href = 'home.html';
        } else {
            // 顯示錯誤訊息
            alert(result.error || '登入失敗，請重試');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('無法連接到伺服器，請稍後重試');
    }
}
