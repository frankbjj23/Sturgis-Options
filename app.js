const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/2/20/2008_Sturgis_Motorcycle_Rally%2C_street_at_night.jpg";

const properties = [
  {
    id: "black-hills-cabin-central-location",
    name: "Black Hills Cabin - Great Central Location",
    provider: "Rapid City, SD",
    beds: "5 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 10",
    distance: "~30 mi",
    price: "$2,728 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Spacious cabin with open-concept living area and deck; good value for large groups.",
    link: "https://www.airbnb.com/rooms/608738340241221768?source_impression_id=p3_1769370088_P3g7yR4VYjYA2n6M",
    image: "assets/airbnb/Blackhills-cabin.png",
    score: { distance: 30, capacity: 10, value: 1 },
  },
  {
    id: "green-mountain-lodge",
    name: "Green Mountain Lodge",
    provider: "Hill City, SD",
    beds: "4 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 10",
    distance: "~59 mi",
    price: "$2,250 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "A-frame lodge with wrap-around deck; quiet location near Hill City attractions.",
    link: "https://www.airbnb.com/rooms/1345840493378714779?source_impression_id=p3_1769370240_P3rZ4jjFaB681GrT",
    image: "assets/airbnb/green-mountain-lodge.png",
    score: { distance: 59, capacity: 10, value: 2 },
  },
  {
    id: "moose-haven-lake-pactola",
    name: "Moose Haven Home near Lake Pactola",
    provider: "Rapid City, SD",
    beds: "6 bedrooms",
    baths: "3 baths",
    sleeps: "Sleeps 12",
    distance: "~35 mi",
    price: "$3,858 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Large cabin with game room, firepit, and secluded setting near Lake Pactola.",
    link: "https://www.airbnb.com/rooms/23914211?source_impression_id=p3_1769370309_P3zjb8XkeStslLe7",
    image: "assets/airbnb/moose-haven-home.png",
    score: { distance: 35, capacity: 12, value: 0 },
  },
  {
    id: "aspen-creek-aframe",
    name: "Aspen Creek A-Frame Cabin",
    provider: "Rapid City, SD",
    beds: "5 bedrooms",
    baths: "2.5 baths",
    sleeps: "Sleeps 10",
    distance: "~30 mi",
    price: "$3,082 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Modern A-frame with vaulted ceilings and large deck; quiet wooded surroundings.",
    link: "https://www.airbnb.com/rooms/1192806552556460360?source_impression_id=p3_1769370344_P3gulyGz-bJFVpht",
    image: "assets/airbnb/aspen-creek.png",
    score: { distance: 30, capacity: 10, value: 1 },
  },
  {
    id: "kojak-mountain-retreat",
    name: "The Kojak - Mountain Retreat by Lake Pactola",
    provider: "Rapid City, SD",
    beds: "5 bedrooms",
    baths: "2.5 baths",
    sleeps: "Sleeps 10",
    distance: "~30 mi",
    price: "$3,532 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Lake-adjacent lodge with two decks and vaulted living room; private yet close to water.",
    link: "https://www.airbnb.com/rooms/23409854?source_impression_id=p3_1769370402_P3CqGJ8BwvTQ7QQr",
    image: "assets/airbnb/the-kojak.png",
    score: { distance: 30, capacity: 10, value: 0 },
  },
  {
    id: "excellent-black-hills-location",
    name: "Excellent Black Hills Location",
    provider: "Deadwood, SD",
    beds: "4 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 10",
    distance: "~17 mi",
    price: "$2,796 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Split-level home with large kitchen/dining area; garage and trailer parking.",
    link: "https://www.airbnb.com/rooms/998463137489915757?source_impression_id=p3_1769370468_P3Pm-m75kljmGovJ",
    image: "assets/airbnb/excellent-blackhills.png",
    score: { distance: 17, capacity: 10, value: 2 },
  },
  {
    id: "cabin-nestled-in-pines",
    name: "Cabin Nestled in the Pines by Mount Rushmore",
    provider: "Rapid City, SD",
    beds: "3 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 10",
    distance: "~30 mi",
    price: "$2,443 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Rustic cabin with wrap-around porch and firepit; tranquil setting near Mount Rushmore.",
    link: "https://www.airbnb.com/rooms/597727012166219923?source_impression_id=p3_1769370522_P31yN1GwVp-43Moy",
    image: "assets/airbnb/cabin-nestled-in-the-pines.png",
    score: { distance: 30, capacity: 10, value: 2 },
  },
  {
    id: "hidden-haven-terry-peak",
    name: "Hidden Haven in Terry Peak with Hot Tub",
    provider: "Lead, SD",
    beds: "4 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 13",
    distance: "~22 mi",
    price: "$3,825 (5 nights)",
    availability: "Aug 6-11 (5 nights)",
    notes:
      "Log cabin with hot tub and stone fireplace; located at the Terry Peak ski resort.",
    link: "https://www.airbnb.com/rooms/797569111240095777?source_impression_id=p3_1769370579_P3cTsWlNG0FBJfro",
    image: "assets/airbnb/hidden-haven.png",
    score: { distance: 22, capacity: 13, value: 0 },
  },
  {
    id: "royal-straight-cabin",
    name: "Royal Straight Cabin",
    provider: "Lead, SD",
    beds: "6 bedrooms",
    baths: "3 baths",
    sleeps: "Sleeps 16+",
    distance: "~20 mi",
    price: "$3,390 (4 nights)",
    availability: "Aug 5-9 (4 nights)",
    notes:
      "Large forest cabin with plenty of beds and parking; available Aug 5-9.",
    link: "https://www.airbnb.com/rooms/54345076?source_impression_id=p3_1769370618_P3tlWy83PzksMDFr",
    image: "assets/airbnb/royal-straight.png",
    score: { distance: 20, capacity: 16, value: 1 },
  },
  {
    id: "ten-person-cabin-rushmore",
    name: "10 Person Cabin near Mount Rushmore",
    provider: "Rapid City, SD",
    beds: "5 bedrooms",
    baths: "2 baths",
    sleeps: "Sleeps 10",
    distance: "~30 mi",
    price: "$1,630 (3 nights)",
    availability: "Aug 7-10 (3 nights)",
    notes:
      "Part of Silver Mountain Resort; roomy cabin in quiet country setting.",
    link: "https://www.airbnb.com/rooms/48850162?source_impression_id=p3_1769370676_P3SUf1AXgP1auEZL",
    image: "assets/airbnb/10-person-cabin.png",
    score: { distance: 30, capacity: 10, value: 2 },
  },
];

const container = document.getElementById("property-cards");
const chips = document.querySelectorAll(".chip");

const API_BASE = (() => {
  if (window.location.origin === "null") {
    return "http://localhost:3000";
  }
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "";
  }
  return "https://sturgis-api.onrender.com";
})();
const visitorId = (() => {
  const key = "sturgis_visitor_id";
  const stored = localStorage.getItem(key);
  if (stored) {
    return stored;
  }
  const id =
    (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
    `visitor-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  localStorage.setItem(key, id);
  return id;
})();

const toShortDate = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const apiFetch = async (path, options = {}) => {
  const headers = {
    "x-visitor-id": visitorId,
    ...options.headers,
  };
  const hasBody = options.body !== undefined;
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};


const renderCards = (items) => {
  container.innerHTML = "";
  if (items.length === 0) {
  }
  items.forEach((property) => {
    const card = document.createElement("article");
    card.className = "card";
    const linkMarkup = property.link
      ? `<a class="cta" href="${property.link}" target="_blank" rel="noreferrer">View Listing</a>`
      : `<span class="cta is-disabled">Listing link pending</span>`;
    card.innerHTML = `
      <div class="card-header">
        <button type="button" class="image-zoom" data-image="${property.image}" data-title="${property.name}">
          <img src="${property.image}" alt="${property.name}" loading="lazy" />
        </button>
        <div class="badge-stack">
          <span class="badge">${property.distance}</span>
          <span class="badge">${property.sleeps}</span>
          <span class="badge">${property.price}</span>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title">${property.name}</h2>
        <p class="card-subtitle">${property.provider}</p>
        <div class="detail-grid">
          <div class="detail"><span>Bedrooms</span>${property.beds}</div>
          <div class="detail"><span>Bathrooms</span>${property.baths}</div>
          <div class="detail"><span>Distance</span>${property.distance}</div>
          <div class="detail"><span>Price</span>${property.price}</div>
          <div class="detail"><span>Availability</span>${property.availability}</div>
        </div>
        <p class="notes">${property.notes}</p>
        <div class="card-actions">
          ${linkMarkup}
          <div>
            <div class="vote-box" data-votes="${property.id}">
              <button class="vote-btn" data-vote="up">👍 <span>0</span></button>
              <button class="vote-btn" data-vote="down">👎 <span>0</span></button>
            </div>
            <div class="vote-meta">Votes are shared across visitors.</div>
          </div>
        </div>
        <div class="comments" data-comments="${property.id}">
          <h3>Comments</h3>
          <div class="comment-list"></div>
          <form class="comment-form">
            <input type="text" name="name" placeholder="Name (optional)" maxlength="32" />
            <textarea name="message" rows="3" placeholder="Share your thoughts..." required></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    `;
    container.appendChild(card);
    hydrateVotes(property.id);
    hydrateComments(property.id);
  });

  revealCards();
};

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
};

lightbox.addEventListener("click", (event) => {
  if (event.target.matches("[data-lightbox-close]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

const hydrateVotes = (id) => {
  const wrapper = container.querySelector(`[data-votes="${id}"]`);
  const upBtn = wrapper.querySelector('[data-vote="up"]');
  const downBtn = wrapper.querySelector('[data-vote="down"]');
  const meta = wrapper.parentElement.querySelector(".vote-meta");
  let data = { up: 0, down: 0, choice: null };

  const updateDisplay = () => {
    upBtn.querySelector("span").textContent = data.up;
    downBtn.querySelector("span").textContent = data.down;
    upBtn.classList.toggle("is-active", data.choice === "up");
    downBtn.classList.toggle("is-active", data.choice === "down");
  };

  const loadVotes = async () => {
    try {
      const payload = await apiFetch(`/api/properties/${id}/votes`);
      data = {
        up: payload.up,
        down: payload.down,
        choice: payload.userVote,
      };
      updateDisplay();
    } catch (err) {
      meta.textContent = "Votes unavailable right now.";
    }
  };

  const handleVote = async (choice) => {
    const nextVote = data.choice === choice ? null : choice;
    try {
      const payload = await apiFetch(`/api/properties/${id}/votes`, {
        method: "POST",
        body: JSON.stringify({ vote: nextVote }),
      });
      data = {
        up: payload.up,
        down: payload.down,
        choice: payload.userVote,
      };
      updateDisplay();
    } catch (err) {
      meta.textContent = "Vote failed. Try again.";
    }
  };

  upBtn.addEventListener("click", () => handleVote("up"));
  downBtn.addEventListener("click", () => handleVote("down"));

  updateDisplay();
  loadVotes();
};

const hydrateComments = (id) => {
  const wrapper = container.querySelector(`[data-comments="${id}"]`);
  const list = wrapper.querySelector(".comment-list");
  const form = wrapper.querySelector(".comment-form");
  const comments = [];

  const render = () => {
    list.innerHTML = "";
    if (comments.length === 0) {
      const empty = document.createElement("div");
      empty.className = "comment";
      empty.textContent = "Be the first to comment on this property.";
      list.appendChild(empty);
      return;
    }
    comments.forEach((comment) => {
      const item = document.createElement("div");
      item.className = "comment";
      item.textContent = comment.message;
      const meta = document.createElement("small");
      const createdAt = comment.created_at || comment.date;
      meta.textContent = `${comment.name || "Anonymous"} - ${toShortDate(
        createdAt
      )}`;
      item.appendChild(meta);
      list.appendChild(item);
    });
  };

  const loadComments = async () => {
    try {
      const payload = await apiFetch(`/api/properties/${id}/comments`);
      comments.length = 0;
      payload.forEach((comment) => comments.push(comment));
      render();
    } catch (err) {
      const empty = document.createElement("div");
      empty.className = "comment";
      empty.textContent = "Comments unavailable right now.";
      list.innerHTML = "";
      list.appendChild(empty);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name").toString().trim();
    const message = formData.get("message").toString().trim();
    if (!message) {
      return;
    }
    try {
      const payload = await apiFetch(`/api/properties/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ name, message }),
      });
      comments.unshift(payload);
      form.reset();
      render();
    } catch (err) {
      form.reset();
    }
  });

  render();
  loadComments();
};

const revealCards = () => {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((card) => observer.observe(card));
};

const applyFilter = (filter) => {
  let items = [...properties];
  if (filter === "closest") {
    items.sort((a, b) => a.score.distance - b.score.distance);
  } else if (filter === "largest") {
    items.sort((a, b) => b.score.capacity - a.score.capacity);
  } else if (filter === "value") {
    items.sort((a, b) => b.score.value - a.score.value);
  }
  renderCards(items);
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((btn) => btn.classList.remove("is-active"));
    chip.classList.add("is-active");
    applyFilter(chip.dataset.filter);
  });
});

renderCards(properties);

document.addEventListener("click", (event) => {
  const button = event.target.closest(".image-zoom");
  if (!button) {
    return;
  }
  const src = button.dataset.image;
  const title = button.dataset.title || "Listing image";
  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
});
