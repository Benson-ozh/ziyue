const SALT = "zaji";
const PW = "a5ac7d6739c6369ead93f0ef7c12a41a863615fdba4ff85ba28130556ccdcb70";
const PW2 = "86d41748bfb7b14d14bb291797a7192a5e8d4b7ce240e783daf00f5078ab892b";
const pw1 = "zaji.html";
const pw3 = "yishi.html";
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

  if (h === PW) {
    location.href = pw1;
  } else if (h === PW2) {
    location.href = pw3;
  } else {
    document.getElementById('msg').textContent = "密碼錯誤";
    document.getElementById('pwd').value = "";
  }
}
