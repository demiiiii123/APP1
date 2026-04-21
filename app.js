// 切換分頁邏輯
function switchTab(tabId, element) {
    // 隱藏所有分頁內容
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 移除導航列的 active 狀態
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 顯示指定分頁
    document.getElementById(`tab-${tabId}`).classList.add('active');
    // 設定當前按鈕為 active
    element.classList.add('active');
}

// 播放緊急語音廣播 (Web Speech API)
function playVoiceWarning() {
    if ('speechSynthesis' in window) {
        // 先停止之前的播放
        window.speechSynthesis.cancel();

        let textToSpeek = "";
        if (currentLang === 'zh') {
            textToSpeek = "緊急通知！土石流發生紅色警戒，為了您的安全，請即刻遠離河川，並往勢高處或避難所撤離！";
        } else {
            textToSpeek = "Emergency Warning! Red alert for mudslides. Please evacuate to higher ground or a shelter immediately for your safety!";
        }

        const msg = new SpeechSynthesisUtterance(textToSpeek);
        
        // 嘗試使用中文語音
        if (currentLang === 'zh') {
            msg.lang = 'zh-TW';
        } else {
            msg.lang = 'en-US';
        }
        
        msg.rate = 0.9; // 稍微放慢語速讓長者聽得清楚
        msg.pitch = 1.1;

        window.speechSynthesis.speak(msg);
    } else {
        alert("很抱歉，您的瀏覽器不支援語音功能。");
    }
}

// 模擬打卡/回報定位功能
function reportLocation() {
    const successBox = document.getElementById('location-success');
    
    // 如果瀏覽器支援地理定位 API
    if (navigator.geolocation) {
        // 先隱藏
        successBox.classList.add('hidden');
        
        // 模擬取得位置的延遲
        setTimeout(() => {
            // 此處我們模擬假資料，實務上可抓取 position.coords.latitude 等
            successBox.classList.remove('hidden');
            
            // 捲動畫面到底部讓使用者看到成功訊息
            successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
        
    } else {
        alert("您的瀏覽器不支援地理位置功能，將使用預設安全站點回報。");
        successBox.classList.remove('hidden');
    }
}

// 多國語言翻譯字典 (Mock)
const translations = {
    en: {
        "trans-alert-title": "Red Alert Zone",
        "trans-alert-desc": "Rainfall has reached the mudslide red alert level. Please follow instructions to evacuate to higher ground or a shelter immediately!",
        "trans-play-voice": "Play Emergency Broadcast",
        "trans-report-title": "Safety Check-in",
        "trans-report-desc": "If you are safe or need rescue, report your location here.",
        "trans-report-btn": "📍 Send My Location",
        "trans-report-success": "Location sent successfully! The Disaster Center has received your check-in.",
        "trans-search-placeholder": "🔍 Search for shelters...",
        "trans-route-title": "Evacuation Route",
        "trans-route-desc": "Walk towards higher ground. Nearest shelter is 850m away (12 mins walk).",
        "trans-contact-title": "Emergency Contacts",
        "trans-contact-desc": "Tap buttons to directly call from your phone.",
        "trans-family-btn": "👨‍👩‍👧 Call Family",
        "trans-sms-btn": "✉️ Send Safety SMS",
        "trans-memory-title": "Memory Corner",
        "trans-memory-desc": "Stories of our land and our shared effort to protect it.",
        "trans-nav-home": "Home",
        "trans-nav-map": "Map",
        "trans-nav-contact": "Contact",
        "trans-nav-memory": "Memories"
    },
    zh: {
        "trans-alert-title": "紅色警戒區",
        "trans-alert-desc": "觀測雨量已達土石流紅色警戒值，請依指示即刻往高處或避難所撤離！",
        "trans-play-voice": "播放緊急語音廣播",
        "trans-report-title": "安全回報與求救",
        "trans-report-desc": "若您已經在安全的地方，或受困需要救援，請發送您的位置。",
        "trans-report-btn": "📍 發送目前位置報平安",
        "trans-report-success": "已成功發送您的位置：24.151, 120.641 (台中市)。防災中心已收到您的報平安！",
        "trans-search-placeholder": "🔍 搜尋附近避難所或集集點名稱...",
        "trans-route-title": "建議撤離路線",
        "trans-route-desc": "請沿著勢高處行走，距離最近避難所 850 公尺，步行約 12 分鐘。",
        "trans-contact-title": "緊急聯絡與求救電話",
        "trans-contact-desc": "點擊以下按鈕將直接使用您的手機撥打。",
        "trans-family-btn": "👨‍👩‍👧 撥打給緊急聯絡人 (家人)",
        "trans-sms-btn": "✉️ 發送已安全簡訊",
        "trans-memory-title": "記憶角落與災防宣導",
        "trans-memory-desc": "這片土地的故事與我們共同守護的心",
        "trans-nav-home": "首頁",
        "trans-nav-map": "避難",
        "trans-nav-contact": "聯絡",
        "trans-nav-memory": "記憶"
    }
}

let currentLang = 'zh';

// 切換語言功能
function toggleLanguage() {
    const btn = document.getElementById('lang-btn');
    if (currentLang === 'zh') {
        currentLang = 'en';
        btn.innerHTML = '<i class="fa-solid fa-globe"></i> EN';
        applyTranslations('en');
    } else {
        currentLang = 'zh';
        btn.innerHTML = '<i class="fa-solid fa-globe"></i> 中文';
        applyTranslations('zh');
    }
}

// 替換畫面上的文字
function applyTranslations(lang) {
    const dict = translations[lang];
    for (const key in dict) {
        const elements = document.querySelectorAll(`.${key}`);
        elements.forEach(el => {
            // 如果是輸入框，改 placeholder
            if (el.tagName === 'INPUT') {
                el.placeholder = dict[key];
            } else {
                el.innerText = dict[key];
            }
        });
    }
}
