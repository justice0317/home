// 設置倒數時間
let countdownTime = 180;
let countdownInterval;
let email = null;

// 初始化驗證頁面
function initVerificationPage() {
    // 從 sessionStorage 獲取 email
    email = sessionStorage.getItem('email');
    username = sessionStorage.getItem('username');

    if (!email) {
        alert('找不到 email，請重新進行註冊流程！');
        window.location.href = 'signup.html'; // 返回註冊頁面
    } else {
        console.log(`取得的 Email: ${email}`);
    }
}

// 初始化倒數計時
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    countdownElement.textContent = countdownTime; // 顯示初始倒數時間

    countdownInterval = setInterval(() => {
        countdownTime--;
        countdownElement.textContent = countdownTime;

        // 倒數時間結束
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "倒數結束，請重傳驗證碼！";
        }
    }, 1000); // 每秒執行一次
}

// 重置倒數計時
function resetCountdown() {
    clearInterval(countdownInterval); // 清除現有的倒數
    countdownTime = 180; // 重置時間
    startCountdown(); // 重新啟動倒數
}

let isSubmitting = false; // 防止重複提交
// 提交驗證碼
async function submitCode() {
    if (isSubmitting) return; // 如果正在提交，直接返回
    isSubmitting = true; // 標記為正在提交

    const verificationCode = getVerificationCode();

    if (!email || verificationCode.length !== 6) {
        alert('請輸入完整的驗證碼！');
        isSubmitting = false; // 重置標記
        return;
    }

    try {
        const response = await fetch('http://54.150.30.200:5000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verification_code: verificationCode }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            sessionStorage.setItem('user_id', result.user_id);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('username', username);
            window.location.href = 'signupSuccess.html'; // 跳轉至成功頁面
        } else {
            alert(`驗證失敗: ${result.error}`);
        }
    } catch (error) {
        console.error('驗證失敗：', error);
        alert('驗證過程中發生錯誤，請稍後再試！');
    } finally {
        isSubmitting = false; // 重置標記
    }
}

// 重傳驗證碼
async function retryCode() {
    if (!email) {
        alert('找不到 email，請重新進行註冊流程！');
        return;
    }

    try {
        const response = await fetch('http://54.150.30.200:5000/resend_verification_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            resetCountdown();
        } else {
            alert(`重傳驗證碼失敗: ${result.error}`);
        }
    } catch (error) {
        console.error('重傳驗證碼失敗：', error);
        alert('重傳過程中發生錯誤，請稍後再試！');
    }
}

// 成功驗證後跳轉（可根據實際需求修改此方法）
function verifySuccess() {
    alert('驗證成功！即將跳轉...');
    //window.location.href = 'https://signupsuccess.vercel.app'; // 跳轉至成功頁面
}

// 獲取驗證碼輸入值
function getVerificationCode() {
    const inputs = document.querySelectorAll(".code-input");
    let code = "";
    inputs.forEach(input => {
        code += input.value;
    });
    return code;
}


// 輸入框自動切換功能
function setupCodeInput() {
    const inputs = document.querySelectorAll(".code-input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus(); // 跳到下一個輸入框
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && input.value === "" && index > 0) {
                inputs[index - 1].focus(); // 回到上一個輸入框
            }
        });
    });
}

// 初始化事件監聽器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化驗證頁面
    initVerificationPage();

    // 啟動倒數計時
    startCountdown();

    // 設置驗證碼輸入框自動切換
    setupCodeInput();

    // 綁定重傳驗證碼按鈕事件
    document.querySelector('.btn-retry').addEventListener('click', retryCode);

    // 綁定確定送出按鈕事件
    document.querySelector('.btn-confirm').addEventListener('click', submitCode);
});
