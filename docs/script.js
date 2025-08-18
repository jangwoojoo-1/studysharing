// 🔥 Firebase 설정 (여기에 본인의 Firebase 설정 정보 넣기)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("post-form");
const postsDiv = document.getElementById("posts");

// 글 작성
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await db.collection("posts").add({
    title,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  form.reset();
});

// 글 목록 실시간 업데이트
db.collection("posts")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    postsDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const post = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <div class="post-title">${post.title}</div>
        <div class="post-content">${post.content}</div>
      `;
      postsDiv.appendChild(div);
    });
  });
