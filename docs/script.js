// 🔥 Firebase 설정 (자신의 Firebase 설정 정보로 교체)
const firebaseConfig = {
  apiKey: "AIzaSyDF4HvqyvdAtzxIfAVjbMYCXVWZagvR5J8",
  authDomain: "studysharing-board-db.firebaseapp.com",
  projectId: "studysharing-board-db",
  storageBucket: "studysharing-board-db.firebasestorage.app",
  messagingSenderId: "705246459520",
  appId: "1:705246459520:web:bc773a33cd61b1f3fcd865"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("post-form");
const postsDiv = document.getElementById("posts");
const categoryFilter = document.getElementById("category-filter");

// 글 작성
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;

  await db.collection("posts").add({
    title,
    content,
    author,
    category,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  form.reset();
});

// 글 삭제
async function deletePost(id) {
  await db.collection("posts").doc(id).delete();
}

// 글 수정
async function editPost(id, oldData) {
  const newTitle = prompt("새 제목:", oldData.title);
  const newContent = prompt("새 내용:", oldData.content);
  if (newTitle && newContent) {
    await db.collection("posts").doc(id).update({
      title: newTitle,
      content: newContent
    });
  }
}

// 댓글 작성
async function addComment(postId, author, content) {
  await db.collection("posts").doc(postId).collection("comments").add({
    author,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// 댓글 불러오기
function loadComments(postId, container) {
  db.collection("posts").doc(postId).collection("comments")
    .orderBy("timestamp", "asc")
    .onSnapshot(snapshot => {
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const comment = doc.data();
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `
          <div class="comment-author">${comment.author}</div>
          <div class="comment-content">${marked.parse(comment.content)}</div>
        `;
        container.appendChild(div);
      });
    });
}

// 글 목록 실시간 표시
db.collection("posts")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const post = doc.data();
      const id = doc.id;

      // 카테고리 필터 적용
      const selected = categoryFilter.value;
      if (selected !== "전체" && post.category !== selected) return;

      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <div class="post-title">${post.title}</div>
        <div class="post-meta">작성자: ${post.author} | 카테고리: ${post.category}</div>
        <div class="post-content">${marked.parse(post.content)}</div>
        <div class="post-actions">
          ${post.author === document.getElementById("author").value ? `
            <button onclick="editPost('${id}', {title: '${post.title}', content: '${post.content}'})">수정</button>
            <button onclick="deletePost('${id}')">삭제</button>
          ` : ""}
        </div>
        <div class="comment-section">
          <h4>댓글</h4>
          <div id="comments-${id}"></div>
          <form class="comment-form" onsubmit="handleComment(event, '${id}')">
            <input type="text" placeholder="작성자" required />
            <textarea placeholder="댓글 내용" required></textarea>
            <button type="submit">댓글 작성</button>
          </form>
        </div>
      `;

      postsDiv.appendChild(div);

      // 댓글 로딩
      const commentContainer = div.querySelector(`#comments-${id}`);
      loadComments(id, commentContainer);
    });
  });

// 댓글 폼 처리
window.handleComment = async function (e, postId) {
  e.preventDefault();
  const form = e.target;
  const author = form.querySelector("input").value;
  const content = form.querySelector("textarea").value;
  await addComment(postId, author, content);
  form.reset();
};

// 카테고리 필터 변경 시 다시 로딩
categoryFilter.addEventListener("change", () => {
  db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
    postsDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const post = doc.data();
      const id = doc.id;
      const selected = categoryFilter.value;
      if (selected !== "전체" && post.category !== selected) return;

      // (생략: 위와 동일한 렌더링 로직)
    });
  });
};
