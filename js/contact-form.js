document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission
  
      // Send form data manually
      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      })
        .then(() => {
          // Show success popup even if there's no response
          alert("✅ Thank you! Your message has been sent successfully.");
          form.reset();
        })
        .catch(() => {
          // Show error popup only if something truly fails
          alert("⚠️ Message sent, but network error occurred.");
        });
    });
  });
  