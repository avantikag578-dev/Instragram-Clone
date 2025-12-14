document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log("Signup clicked", username, email);
    const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert(data.error || "Signup failed");
    }
  });
});
