// 彈跳視窗功能
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

// 影片預覽功能
function triggerUpload() {
    document.getElementById('videoUpload').click(); // 當點擊影片框時，觸發影片上傳選擇
}

function previewVideo() {
    const videoFile = document.getElementById('videoUpload').files[0];
    const preview = document.getElementById('previewVideo');
    
    // 移除提示文字
    document.getElementById('uploadText').style.display = 'none';

    if (videoFile) {
        const objectURL = URL.createObjectURL(videoFile);
        preview.src = objectURL;
        preview.style.display = 'block';
    }
}

// 重選影片
function resetUpload() {
    document.getElementById('videoUpload').value = ''; // 清除上傳影片
    const preview = document.getElementById('previewVideo');
    preview.style.display = 'none'; // 隱藏預覽

    // 顯示提示文字
    document.getElementById('uploadText').style.display = 'block';
    document.getElementById('uploadButtons').style.display = 'flex'; // 顯示上傳與重選按鈕
    document.getElementById('resultBox').style.display = 'none'; // 隱藏結果區
    document.getElementById('loading').style.display = 'none'; // 隱藏載入中
}

// 上傳影片
function uploadVideo() {
    const videoFile = document.getElementById('videoUpload').files[0];

    // 檢查是否有選擇影片檔案
    if (!videoFile) {
        alert('請選擇影片檔案後再進行上傳。');
        resetUpload(); // 如果沒選擇檔案，回到原始畫面
        return; // 結束函式，防止繼續上傳
    }

    // 顯示載入中
    document.getElementById('loading').style.display = 'block';
    document.getElementById('uploadButtons').style.display = 'none';

    // 開始動畫效果
    const loadingText = document.getElementById('loading');
    loadingText.classList.add('dots'); // 啟動動畫

    const formData = new FormData();
    formData.append('video', videoFile);

    // 使用 Fetch API 將影片上傳到 Flask API
    fetch(`http://54.150.30.200:5000/upload_video_forehand_smash?user_id=${user_id}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // 處理 API 回傳的結果
        document.getElementById('loading').style.display = 'none';
        loadingText.classList.remove('dots'); // 停止動畫
        document.getElementById('resultBox').style.display = 'flex';

        // 顯示分數、評論與圖片
        document.getElementById('score').textContent = data.score;
        document.getElementById('comment').innerHTML = data.comment.replace(/\n/g, '<br>');
        document.getElementById('resultImage').src = data.img_url;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
        loadingText.classList.remove('dots');

        // 上傳失敗時重設頁面
        resetUpload(); // 重新設置初始畫面讓使用者重新上傳
        alert('影片上傳失敗，請再試一次。');
    });
}

// 儲存結果
function saveResult() {
    alert('結果已儲存！');
}
