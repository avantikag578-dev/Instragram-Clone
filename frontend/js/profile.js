const posts = document.getElementById("posts");
const images = [
  "https://picsum.photos/600?1",
  "https://picsum.photos/600?2",
  "https://picsum.photos/600?3",
  "https://picsum.photos/600?4",
  "https://picsum.photos/600?5",
  "https://picsum.photos/600?6",
];
images.forEach(img => {
  posts.innerHTML += `
    <div class="post-item">
      <img src="${img}">
    </div>
  `;
});
