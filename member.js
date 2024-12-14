// 大頭貼上傳功能
const profileInput = document.getElementById('profile-picture');
const profileCircle = document.querySelector('.circle');
const userIcon = document.querySelector('.userIcon');
let username = sessionStorage.getItem('username');
let user_id = sessionStorage.getItem('user_id');
let email = sessionStorage.getItem('email');
let icon_url = sessionStorage.getItem('icon_url');
sessionStorage.setItem('email', email);
sessionStorage.setItem('username', username);
sessionStorage.setItem('user_id', user_id);
sessionStorage.setItem('icon_url', icon_url);

if (!user_id) {
    alert('未登入或會話已過期');
    window.location.href = 'index.html';
}

if(icon_url!="default"){
    userIcon.src = icon_url;
}

profileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileCircle.style.backgroundImage = `url(${e.target.result})`;
            profileCircle.style.backgroundSize = 'cover';
            profileCircle.style.backgroundPosition = 'center';
            profileCircle.style.color = 'transparent'; // 隱藏提示文字
        };
        reader.readAsDataURL(file);

        // 上傳大頭貼至後端
        const formData = new FormData();
        formData.append('icon', file);
        formData.append('user_id', user_id);

        try {
            const response = await fetch('http://localhost:5000/update_user_icon', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                alert('大頭貼更新成功！');
                userIcon.src = result.icon_url; // 將新的 icon_url 套用到 img 標籤
                sessionStorage.setItem('icon_url', result.icon_url);
                location.reload();
            } else {
                alert(`更新失敗：${result.error}`);
            }
        } catch (error) {
            console.error('大頭貼更新失敗：', error);
            alert('大頭貼更新時發生錯誤，請稍後再試！');
        }
    }
});

// 確認按鈕點擊功能
document.querySelectorAll('.btn-confirm').forEach((button, index) => {
    button.addEventListener('click', async () => {
        let inputField;
        let endpoint;
        let bodyData = { user_id: user_id };

        if (index === 0) {
            inputField = document.getElementById('username').value;
            endpoint = 'http://localhost:5000/update_user_name';
            bodyData.name = inputField;
        } else if (index === 1) {
            inputField = document.getElementById('email').value;
            endpoint = 'http://localhost:5000/update_user_email';
            bodyData.email = inputField;
        } else if (index === 2) {
            alert('密碼更新功能尚未實作！');
            return; // 停止處理
        }

        if (!inputField) {
            alert('輸入欄位不能為空！');
            return;
        }

        // 發送更新請求至後端
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });
            const result = await response.json();

            if (response.ok) {
                alert('更新成功！');

                // 根據更新的字段同步更新 sessionStorage
                if (index === 0) {
                    sessionStorage.setItem('username', inputField); // 更新 username
                } else if (index === 1) {
                    sessionStorage.setItem('email', inputField); // 更新 email
                }
            } else {
                alert(`更新失敗：${result.error}`);
            }
        } catch (error) {
            console.error('更新失敗：', error);
            alert('更新時發生錯誤，請稍後再試！');
        }
    });
});
