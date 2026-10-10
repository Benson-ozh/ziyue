// ====== 設定區 ======
const SALT      = "ziyue";        // 換密碼時可一起換
const REAL_HASH = "ffe7664cd43fdf495193d59424377369b8748e4353b9dcd5f70fe935d30a44af";           // 真密碼 → 真頁面
const FAKE_HASH = "86d41748bfb7b14d14bb291797a7192a5e8d4b7ce240e783daf00f5078ab892b";           // 假密碼 → 誘餌頁
const REAL_PAGE = "zaji.html";            // 真頁面
const FAKE_PAGE = "yishi.html";            // 誘餌頁（要做得像正常頁面）
// ===================

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPassword() {
  const v = document.getElementById('pwd').value;
  if (!v) return;
  const h = await sha256(SALT + v);

  if (h === REAL_HASH) {
    location.href = REAL_PAGE;
  } else if (h === FAKE_HASH) {
    location.href = FAKE_PAGE;
  } else {
    document.getElementById('msg').textContent = "密碼錯誤";
    document.getElementById('pwd').value = "";
  }
}