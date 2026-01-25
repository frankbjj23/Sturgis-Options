const properties = [
  {
    id: "pillar-peak-perch",
    name: "Pillar Peak Perch",
    provider: "Vacasa",
    beds: "5 BR",
    baths: "4.5 BA",
    sleeps: "Up to 14 guests",
    distance: "~9 mi west (Boulder Canyon)",
    price: "$562/night; ~$2.8k for 5 nights",
    notes:
      "Luxury lodge in a quiet wooded setting with hot tub, pool table, spacious deck, and fire pit.",
    link: "https://www.vacasa.com/unit/84998",
    image:
      "https://vacasa-units.imgix.net/4763037.jpg?w=1280&fit=max&q=40&auto=format",
    score: { distance: 9, capacity: 14, value: 1 },
  },
  {
    id: "belissima-lala",
    name: "Belissima Lala",
    provider: "Vacasa",
    beds: "7 BR",
    baths: "5.5 BA",
    sleeps: "Up to 20 guests",
    distance: "Near Sturgis (quiet subdivision)",
    price: "$691/night avg; ~$3.5k for 5 nights",
    notes:
      "Spacious home with private hot tub and wrap-around deck. Noise monitoring enforces quiet hours.",
    link: "https://www.vacasa.com/unit/81554",
    image:
      "https://vacasa-units.imgix.net/4537428.jpg?w=1280&fit=max&q=40&auto=format",
    score: { distance: 5, capacity: 20, value: 2 },
  },
  {
    id: "high-country-pool-house",
    name: "High Country Pool House",
    provider: "Vacasa",
    beds: "10 BR",
    baths: "8.5 BA",
    sleeps: "Up to 24 guests",
    distance: "~10 mi via Boulder Canyon",
    price: "$1,366/night; ~$6.8k for 5 nights",
    notes:
      "Expansive estate with an indoor pool, multiple hot tubs, game room, and theatre.",
    link: "https://www.vacasa.com/unit/81545",
    image:
      "https://vacasa-units.imgix.net/4449986.jpg?w=1280&fit=max&q=40&auto=format",
    score: { distance: 10, capacity: 24, value: 0 },
  },
  {
    id: "quiet-country-home",
    name: "Quiet Country Home",
    provider: "Frawley Ranch Estates (Rally Rentals)",
    beds: "5 BR",
    baths: "3.5 BA",
    sleeps: "Sleeps 10",
    distance: "10 mi",
    price: "$7,800/week (~$1,114/night)",
    notes:
      "Single-family home on 2+ acres with deck, garage, Wi-Fi, and a gas fireplace.",
    link:
      "https://www.rally-rentals.com/home/quiet-country-home-near-whitewood-in-frawley-ranch-estates",
    image: "https://rally-rentals.com/home-photos/280/whole_house__large.jpg",
    score: { distance: 10, capacity: 10, value: 0 },
  },
  {
    id: "split-level-lead",
    name: "Split-Level Home",
    provider: "Lead (Rally Rentals)",
    beds: "4 BR",
    baths: "2 BA",
    sleeps: "Sleeps 10",
    distance: "15 mi",
    price: "$5,500/week (~$785/night)",
    notes:
      "Open-plan house with extra queen/full beds and a hide-a-bed. Includes trailer parking, gas grill, and Wi-Fi.",
    link:
      "https://www.rally-rentals.com/home/split-level-home-with-room-for-larger-group-in-quiet-area-of-lead",
    image: "https://rally-rentals.com/home-photos/757/front__large.jpeg",
    score: { distance: 15, capacity: 10, value: 1 },
  },
  {
    id: "rapid-city-renovated",
    name: "Large Spacious Renovated Home",
    provider: "Rapid City (Rally Rentals)",
    beds: "5 BR",
    baths: "3.5 BA",
    sleeps: "Sleeps 10",
    distance: "30 mi",
    price: "$6,500/week (~$928/night)",
    notes:
      "Renovated home near Rapid City hospital with office and nursery rooms, plus a large patio, gas grill, and two-car garage.",
    link:
      "https://www.rally-rentals.com/home/large-spacious-renovated-home-in-south-central-rapid-city",
    image:
      "https://rally-rentals.com/home-photos/687/front_corner-2__large.jpg",
    score: { distance: 30, capacity: 10, value: 0 },
  },
];

const container = document.getElementById("property-cards");
const chips = document.querySelectorAll(".chip");

const API_BASE =
  window.location.origin === "null"
    ? "http://localhost:3000"
    : "https://sturgis-api.onrender.com";
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
  items.forEach((property) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <img src="${property.image}" alt="${property.name}" loading="lazy" />
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
        </div>
        <p class="notes">${property.notes}</p>
        <div class="card-actions">
          <a class="cta" href="${property.link}" target="_blank" rel="noreferrer">View Listing</a>
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
