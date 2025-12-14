const feed = document.getElementById("feed");
const posts = [
  {
    username: "_mansikhare_",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    image: "https://picsum.photos/600/800?1",
    caption: "Confidence looks good ✨",
    liked: false,
    likes: 124,
    followed: false,
    comments: []
  },
  {
    username: "_nehaaa_",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    image: "https://picsum.photos/600/800?2",
    caption: "Weekend mood 💖",
    liked: false,
    likes: 89,
    followed: false,
    comments: []
  }
];
feed.innerHTML = "";
posts.forEach((post, index) => {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <div class="post-header">
      <img src="${post.avatar}">
      <b>${post.username}</b>
      <button class="follow-btn">${post.followed ? "Unfollow" : "Follow"}</button>
    </div>
    <img src="${post.image}">
    <div class="post-actions">
      <span class="like-btn">${post.liked ? "❤️" : "🤍"}</span>
      <span class="comment-icon">💬</span>
    </div>
    <div class="likes-count">${post.likes} likes</div>
    <div class="caption">
      <b>${post.username}</b> ${post.caption}
    </div>
    <div class="comments"></div>
    <input class="comment-input" placeholder="Add a comment...">
  `;
  const followBtn = div.querySelector(".follow-btn");
  followBtn.onclick = () => {
    post.followed = !post.followed;
    followBtn.textContent = post.followed ? "Unfollow" : "Follow";
    followBtn.classList.toggle("unfollow", post.followed);
  };
  const likeBtn = div.querySelector(".like-btn");
  const likesCount = div.querySelector(".likes-count");
  likeBtn.onclick = () => {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    likeBtn.textContent = post.liked ? "❤️" : "🤍";
    likesCount.textContent = `${post.likes} likes`;
  };
  const commentInput = div.querySelector(".comment-input");
  const commentsDiv = div.querySelector(".comments");
  commentInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      const p = document.createElement("p");
      p.innerHTML = `<b>You</b> ${commentInput.value}`;
      commentsDiv.appendChild(p);
      commentInput.value = "";
    }
  });
  feed.appendChild(div);
});
