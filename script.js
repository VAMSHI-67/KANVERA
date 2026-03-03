const bookingForm = document.getElementById("bookingForm");
const bookNowButton = document.getElementById("bookNow");
const yearEl = document.getElementById("year");
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

const requiredFields = ["name", "phone", "address", "duration"];
const whatsappNumber = "918909239999";

function isBookingFormValid() {
  return requiredFields.every((id) => {
    const field = document.getElementById(id);
    return field && field.value.trim() && field.checkValidity();
  });
}

function toggleBookingButton() {
  if (!bookNowButton) return;
  bookNowButton.disabled = !isBookingFormValid();
}

requiredFields.forEach((id) => {
  const input = document.getElementById(id);
  input?.addEventListener("input", toggleBookingButton);
  input?.addEventListener("change", toggleBookingButton);
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isBookingFormValid()) {
    toggleBookingButton();
    return;
  }

  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const duration = document.getElementById("duration")?.value;

  const message = [
    "Hello KANVERA, I want to book a stay.",
    `Name: ${name}`,
    `Contact: ${phone}`,
    `Address: ${address}`,
    `Duration: ${duration}`,
  ].join("\n");

  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});

reviewForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const reviewer = document.getElementById("reviewer");
  const reviewText = document.getElementById("reviewText");

  if (!reviewer?.value.trim() || !reviewText?.value.trim() || !reviewList) return;

  const card = document.createElement("article");
  card.className = "review-card glass fade-up";

  const nameEl = document.createElement("h3");
  nameEl.textContent = reviewer.value.trim();

  const reviewEl = document.createElement("p");
  reviewEl.textContent = `“${reviewText.value.trim()}”`;

  card.append(nameEl, reviewEl);
  reviewList.prepend(card);

  reviewForm.reset();
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

toggleBookingButton();
