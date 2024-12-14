async function registerSuccess() {
    // 收集表單輸入值
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 驗證必填欄位
    if (!email || !username || !password) {
        alert('所有欄位皆為必填，請確認輸入資料！');
        return;
    }

    // 準備要發送的資料
    const formData = {
        email: email,
        username: username,
        password: password
    };

    try {
        // 使用 fetch 發送 POST 請求
        const response = await fetch('https://54.150.30.200:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // 指定傳遞 JSON
            },
            body: JSON.stringify(formData)
        });

        // 處理後端回應
        if (response.ok) {
            const result = await response.json();
            alert(result.message); // 提示成功訊息

            // 將 email 存入 sessionStorage
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('username', username);

            // 導向驗證畫面
            window.location.href = 'verification.html';
        } else {
            const error = await response.json();
            alert(`錯誤: ${error.error}`); // 顯示錯誤訊息
        }
    } catch (error) {
        console.error('提交表單時發生錯誤:', error);
        alert('提交表單失敗，請稍後再試！');
    }
}
