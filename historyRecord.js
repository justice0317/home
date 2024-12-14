const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
const menuButton = document.querySelector('.menu-btn');
const closeButton = document.querySelector('.close-btn');

const table = document.querySelector('.record-table');
const feedbackBox = document.querySelector('.feedback-box');
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


document.addEventListener('DOMContentLoaded', () => {
    const historyRecords = JSON.parse(sessionStorage.getItem('history_records')) || [];
    const tableBody = document.querySelector('.record-table tbody');
    const feedbackBox = document.querySelector('.feedback-box');

    const feedbackDate = document.querySelector('.feedback-left .date');
    const feedbackItem = document.querySelector('.feedback-left .item');
    const feedbackScore = document.querySelector('.feedback-left .score');
    const feedbackComment = document.querySelector('.feedback-left .comment');
    const feedbackVideo = document.querySelector('.feedback-right video source');
    const feedbackImage = document.querySelector('.feedback-right img');

    tableBody.innerHTML = ''; // 清除 tbody 的所有子元素

    // 日期格式化工具
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    // 動態生成表格內容
    historyRecords.forEach((record) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(record.upload_time)}</td>
            <td>${record.action_name}</td>
            <td>${record.total_score}</td>
        `;
        row.addEventListener('click', () => {
            // 點擊行後更新回饋框的內容
            feedbackDate.textContent = `偵測日期：${formatDate(record.upload_time)}`;
            feedbackItem.innerHTML = `偵測項目：<br>${record.action_name}`;
            feedbackScore.textContent = `分數：${record.total_score}`;
            feedbackComment.innerHTML = record.comment.replace(/\n/g, '<br>');

            feedbackVideo.src = record.video_url; // 使用完整的 `video_url`
            feedbackImage.src = record.img_url;

            // 確保影片正確加載
            const videoElement = document.querySelector('video');
            videoElement.load();

            // 顯示回饋框
            feedbackBox.style.display = 'block';
            table.style.display = 'none';
        });
        tableBody.appendChild(row);
    });
});

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

// 回饋框顯示
function showFeedback() {
    feedbackBox.style.display = 'block';
    table.style.display = 'none';
}

// 返回表格
function showTable() {
    feedbackBox.style.display = 'none';
    table.style.display = 'table';
}
