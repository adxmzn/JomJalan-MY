/* ==========================================
   JOMJALAN MALAYSIA - RENDERER.JS
   9 Destinations | Weather | Wikipedia
   Budget Calculator | Travel Plans CRUD
========================================== */

const el = id => document.getElementById(id);

const money = amount => `RM ${amount.toFixed(2)}`;


/* ==========================================
   1. DESTINATION INFORMATION
========================================== */

const destinations = {

  langkawi: {
    name: "Langkawi",
    state: "Kedah",
    type: "Beach",
    description:
      "Explore beautiful beaches, enjoy island hopping and discover the natural beauty of Langkawi.",
    summary: "Island hopping, beaches and relaxing sunsets.",
    image: "images/langkawi.jpg",
    latitude: 6.35,
    longitude: 99.80
  },

  cameron: {
    name: "Cameron Highlands",
    state: "Pahang",
    type: "Nature",
    description:
      "Enjoy cool weather, visit tea plantations and explore the beautiful green hills of Cameron Highlands.",
    summary: "Tea plantations, cool weather and scenic hills.",
    image: "images/cameron.jpg",
    latitude: 4.47,
    longitude: 101.38
  },

  penang: {
    name: "George Town",
    state: "Penang",
    type: "Heritage",
    description:
      "Discover heritage buildings, colourful street art and delicious local food in George Town.",
    summary: "Heritage streets, local food and cultural spots.",
    image: "images/penang.jpg",
    latitude: 5.414,
    longitude: 100.329
  },

  kualalumpur: {
    name: "Kuala Lumpur",
    state: "Kuala Lumpur",
    type: "City",
    description:
      "Discover iconic skyscrapers, shopping streets and delicious local food in Malaysia's capital.",
    summary: "City skyline, shopping and local food.",
    image: "images/kualalumpur.jpg",
    latitude: 3.1390,
    longitude: 101.6869
  },

  melaka: {
    name: "Melaka City",
    state: "Melaka",
    type: "Heritage",
    description:
      "Explore historical buildings, colourful streets and the famous Jonker Walk in Melaka.",
    summary: "Heritage buildings, Jonker Walk and river views.",
    image: "images/melaka.jpg",
    latitude: 2.1896,
    longitude: 102.2501
  },

  sabah: {
    name: "Kota Kinabalu",
    state: "Sabah",
    type: "Beach",
    description:
      "Enjoy coastal scenery, island adventures and the vibrant city of Kota Kinabalu.",
    summary: "Island trips, sea views and local markets.",
    image: "images/sabah.jpg",
    latitude: 5.9804,
    longitude: 116.0735
  },

  sarawak: {
    name: "Kuching",
    state: "Sarawak",
    type: "Heritage",
    description:
      "Discover Kuching's charming waterfront, fascinating museums and Sarawak culture.",
    summary: "Waterfront views, museums and local culture.",
    image: "images/sarawak.jpg",
    latitude: 1.5535,
    longitude: 110.3593
  },

  johor: {
    name: "Johor Bahru",
    state: "Johor",
    type: "City",
    description:
      "Explore city attractions, family-friendly activities and food spots around Johor Bahru.",
    summary: "Family attractions, city sights and cafes.",
    image: "images/johor.jpg",
    latitude: 1.4927,
    longitude: 103.7414
  },

  perak: {
    name: "Ipoh",
    state: "Perak",
    type: "Heritage",
    description:
      "Visit Ipoh's old town, enjoy local food and discover scenic limestone hills.",
    summary: "Old town, local food and limestone scenery.",
    image: "images/perak.jpg",
    latitude: 4.5975,
    longitude: 101.0901
  }

};


/* ==========================================
   2. SAMPLE TRAVEL PACKAGES
   These are estimated student-project prices.
========================================== */

const travelPackages = {

  langkawi: [
    {
      name: "Langkawi Relax",
      dailyPrice: 150,
      includes: "Estimated stay, meals and basic sightseeing"
    },
    {
      name: "Langkawi Explorer",
      dailyPrice: 230,
      includes: "Estimated stay, meals and extra activities"
    }
  ],

  cameron: [
    {
      name: "Highland Escape",
      dailyPrice: 120,
      includes: "Estimated stay, meals and local sightseeing"
    },
    {
      name: "Tea & Nature Trip",
      dailyPrice: 190,
      includes: "Estimated stay, meals and nature activities"
    }
  ],

  penang: [
    {
      name: "Penang City Break",
      dailyPrice: 130,
      includes: "Estimated stay, meals and city exploration"
    },
    {
      name: "Heritage Discovery",
      dailyPrice: 200,
      includes: "Estimated stay, meals and heritage activities"
    }
  ],

  kualalumpur: [
    {
      name: "KL City Break",
      dailyPrice: 170,
      includes: "Estimated stay, meals and city sightseeing"
    },
    {
      name: "KL Explorer",
      dailyPrice: 250,
      includes: "Estimated stay, meals and extra city activities"
    }
  ],

  melaka: [
    {
      name: "Melaka Heritage",
      dailyPrice: 120,
      includes: "Estimated stay, meals and heritage sightseeing"
    },
    {
      name: "Melaka Discovery",
      dailyPrice: 190,
      includes: "Estimated stay, meals and extra activities"
    }
  ],

  sabah: [
    {
      name: "Sabah City Escape",
      dailyPrice: 180,
      includes: "Estimated stay, meals and city sightseeing"
    },
    {
      name: "Sabah Island Adventure",
      dailyPrice: 270,
      includes: "Estimated stay, meals and extra island activities"
    }
  ],

  sarawak: [
    {
      name: "Kuching Culture Trip",
      dailyPrice: 150,
      includes: "Estimated stay, meals and city sightseeing"
    },
    {
      name: "Sarawak Explorer",
      dailyPrice: 230,
      includes: "Estimated stay, meals and extra cultural activities"
    }
  ],

  johor: [
    {
      name: "Johor City Break",
      dailyPrice: 160,
      includes: "Estimated stay, meals and basic sightseeing"
    },
    {
      name: "Johor Family Explorer",
      dailyPrice: 240,
      includes: "Estimated stay, meals and extra attractions"
    }
  ],

  perak: [
    {
      name: "Ipoh Food & Heritage",
      dailyPrice: 130,
      includes: "Estimated stay, meals and old-town sightseeing"
    },
    {
      name: "Perak Nature Trip",
      dailyPrice: 200,
      includes: "Estimated stay, meals and nature activities"
    }
  ]

};


/* ==========================================
   3. CREATE SIX EXTRA DESTINATION CARDS
========================================== */

// The first three cards already exist in index.html.

const newDestinationIds = [
  "kualalumpur",
  "melaka",
  "sabah",
  "sarawak",
  "johor",
  "perak"
];


// Add dropdown option only if it does not exist.
function addOptionIfMissing(select, value, text) {

  const exists = Array.from(select.options).some(
    option => option.value === value
  );

  if (exists) {
    return;
  }

  const option = document.createElement("option");

  option.value = value;
  option.textContent = text;

  select.appendChild(option);

}


// Placeholder for missing local images.
function createPlacePlaceholder(name) {

  const safeName = name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="760"
         height="420">

      <rect width="760"
            height="420"
            fill="#86a38e"/>

      <text x="380"
            y="200"
            font-family="Arial"
            font-size="38"
            font-weight="bold"
            text-anchor="middle"
            fill="white">
        ${safeName}
      </text>

      <text x="380"
            y="245"
            font-family="Arial"
            font-size="20"
            text-anchor="middle"
            fill="white">
        EXPLORE MALAYSIA
      </text>

    </svg>
  `;

  return (
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg)
  );

}


function addImageFallback(image, place) {

  image.addEventListener("error", () => {

    image.src = createPlacePlaceholder(place.name);

  }, { once: true });

}


// Create destination cards automatically.
function addNewDestinationCards() {

  const grid = document.querySelector(".card-grid");

  for (const id of newDestinationIds) {

    const place = destinations[id];

    // Update State filter.
    addOptionIfMissing(
      el("stateFilter"),
      place.state,
      place.state
    );

    // Update Travel Type filter.
    addOptionIfMissing(
      el("typeFilter"),
      place.type,
      place.type
    );

    // Update My Travel Plans dropdown.
    addOptionIfMissing(
      el("planDestination"),
      id,
      place.name
    );

    // Create destination card.
    const card = document.createElement("article");

    card.className = "card";
    card.dataset.state = place.state;
    card.dataset.type = place.type;

    // Destination image.
    const image = document.createElement("img");

    addImageFallback(image, place);

    image.src = place.image;
    image.alt = place.name;

    // Card information.
    const info = document.createElement("div");

    info.className = "card-info";

    const category = document.createElement("small");

    category.textContent =
      `${place.state.toUpperCase()} · ${place.type.toUpperCase()}`;

    const heading = document.createElement("h3");

    heading.textContent = place.name;

    const summary = document.createElement("p");

    summary.textContent = place.summary;

    // View Details button.
    const button = document.createElement("button");

    button.type = "button";
    button.className = "details-btn";
    button.dataset.destination = id;
    button.textContent = "View Details";

    button.addEventListener("click", () => {
      openDetails(id);
    });

    // Put everything together.
    info.append(
      category,
      heading,
      summary,
      button
    );

    card.append(image, info);

    grid.appendChild(card);

  }

}


/* ==========================================
   4. SEARCH AND FILTER
========================================== */

function filterDestinations() {

  const search =
    el("searchInput").value.toLowerCase().trim();

  const state = el("stateFilter").value;
  const type = el("typeFilter").value;

  let count = 0;

  document.querySelectorAll(".card").forEach(card => {

    const match =
      card.textContent.toLowerCase().includes(search) &&
      (state === "all" || card.dataset.state === state) &&
      (type === "all" || card.dataset.type === type);

    card.hidden = !match;

    if (match) {
      count++;
    }

  });

  el("resultCount").textContent =
    `${count} destination${count === 1 ? "" : "s"}`;

  el("noResults").hidden = count !== 0;

}


// Create additional cards when application loads.
addNewDestinationCards();

el("searchInput").addEventListener(
  "input",
  filterDestinations
);

el("stateFilter").addEventListener(
  "change",
  filterDestinations
);

el("typeFilter").addEventListener(
  "change",
  filterDestinations
);

// Initial count should show 9 destinations.
filterDestinations();


/* ==========================================
   5. SHARED BUDGET CALCULATION
========================================== */

// Both Explore and My Travel Plans use this function.

function calculateTrip(
  destinationId,
  packageValue,
  daysValue,
  peopleValue,
  transportValue
) {

  const packages =
    travelPackages[destinationId] || [];

  if (packageValue === "") {
    return null;
  }

  const index = Number(packageValue);
  const selectedPackage = packages[index];

  const days = Number(daysValue);
  const people = Number(peopleValue);
  const transport = Number(transportValue);

  // Validate trip information.
  if (
    !selectedPackage ||
    !Number.isInteger(index) ||
    String(daysValue).trim() === "" ||
    String(peopleValue).trim() === "" ||
    String(transportValue).trim() === "" ||
    !Number.isInteger(days) ||
    days < 1 ||
    days > 30 ||
    !Number.isInteger(people) ||
    people < 1 ||
    people > 20 ||
    !Number.isFinite(transport) ||
    transport < 0
  ) {
    return null;
  }

  // Package price per person per day.
  const packageCost =
    selectedPackage.dailyPrice * days * people;

  // One-time transport cost per person.
  const transportTotal =
    transport * people;

  // Return all calculated trip information.
  return {
    destination: destinationId,
    packageIndex: index,
    packageName: selectedPackage.name,
    days: days,
    people: people,
    transportPerPerson: transport,
    packageCost: packageCost,
    transportTotal: transportTotal,
    budget: packageCost + transportTotal
  };

}


/* ==========================================
   6. DESTINATION POPUP
========================================== */

const modal = el("detailsModal");

let selectedDestinationId = null;
let lastCalculatedTrip = null;

let weatherController = null;
let attractionsRequestId = 0;

let previousFocus = null;


function openDetails(id) {

  const destination = destinations[id];

  if (!destination) {
    return;
  }

  // Cancel previous weather request.
  if (weatherController) {
    weatherController.abort();
  }

  selectedDestinationId = id;
  lastCalculatedTrip = null;

  previousFocus = document.activeElement;

  // Display destination information.
  el("modalTitle").textContent = destination.name;

  el("modalCategory").textContent =
    `${destination.state.toUpperCase()} · ${destination.type.toUpperCase()}`;

  el("modalDescription").textContent =
    destination.description;

  // Display destination image.
  const modalImage = el("modalImage");

  modalImage.onerror = () => {

    modalImage.onerror = null;

    modalImage.src =
      createPlacePlaceholder(destination.name);

  };

  modalImage.src = destination.image;
  modalImage.alt = destination.name;

  // Reset weather information.
  el("weatherStatus").textContent =
    "Loading weather...";

  el("weatherStatus").hidden = false;
  el("weatherData").hidden = true;
  el("weatherCondition").textContent = "";

  // Hide old suggestions.
  el("activitySection").hidden = true;

  // Load selected packages.
  loadPackages(id);

  // Open popup.
  modal.hidden = false;
  el("closeModal").focus();

  // Retrieve information from external APIs.
  getWeather(destination);
  getAttractions(destination);

}


function closeDetails() {

  // Stop the weather request.
  if (weatherController) {
    weatherController.abort();
  }

  weatherController = null;

  // Ignore old Wikipedia responses.
  attractionsRequestId++;

  modal.hidden = true;

  // Return focus to the View Details button.
  if (
    previousFocus &&
    typeof previousFocus.focus === "function"
  ) {
    previousFocus.focus();
  }

  previousFocus = null;

}


// Existing three destination buttons from HTML.
document.querySelectorAll(".details-btn").forEach(button => {

  button.addEventListener("click", () => {
    openDetails(button.dataset.destination);
  });

});


// Close button.
el("closeModal").addEventListener(
  "click",
  closeDetails
);


// Close when clicking outside popup.
modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeDetails();
  }

});


// Close using Escape key.
document.addEventListener("keydown", event => {

  if (event.key === "Escape" && !modal.hidden) {
    closeDetails();
  }

});


/* ==========================================
   7. WEATHER DESCRIPTION
========================================== */

function getWeatherDescription(code) {

  if (code === 0) {
    return "Clear sky";
  }

  if (code >= 1 && code <= 3) {
    return "Partly cloudy or overcast";
  }

  if (code === 45 || code === 48) {
    return "Foggy";
  }

  if (code >= 51 && code <= 67) {
    return "Drizzle or rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snowy conditions";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }

  if (code >= 95 && code <= 99) {
    return "Thunderstorm";
  }

  return "Weather condition unavailable";

}


/* ==========================================
   8. OPEN-METEO WEATHER API
========================================== */

async function getWeather(destination) {

  const controller = new AbortController();

  weatherController = controller;

  const url = new URL(
    "https://api.open-meteo.com/v1/forecast"
  );

  url.searchParams.set(
    "latitude",
    destination.latitude
  );

  url.searchParams.set(
    "longitude",
    destination.longitude
  );

  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
  );

  url.searchParams.set(
    "timezone",
    "Asia/Kuala_Lumpur"
  );

  try {

    const response = await fetch(url.toString(), {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();
    const weather = data.current;

    // Check API data.
    if (
      !weather ||
      !Number.isFinite(weather.temperature_2m) ||
      !Number.isFinite(weather.relative_humidity_2m) ||
      !Number.isFinite(weather.wind_speed_10m) ||
      !Number.isFinite(weather.weather_code)
    ) {
      throw new Error("Invalid weather data");
    }

    // Ignore outdated responses.
    if (
      controller.signal.aborted ||
      weatherController !== controller ||
      modal.hidden
    ) {
      return;
    }

    // Temperature.
    el("temperature").textContent =
      `${weather.temperature_2m.toFixed(1)} °C`;

    // Humidity.
    el("humidity").textContent =
      `${weather.relative_humidity_2m} %`;

    // Wind speed.
    el("windSpeed").textContent =
      `${weather.wind_speed_10m.toFixed(1)} km/h`;

    // Weather description.
    el("weatherCondition").textContent =
      `Condition: ${getWeatherDescription(weather.weather_code)}`;

    el("weatherStatus").hidden = true;
    el("weatherData").hidden = false;

    // Generate activities based on weather.
    showSuggestedActivities(destination, weather);

  } catch (error) {

    if (
      error.name === "AbortError" ||
      weatherController !== controller
    ) {
      return;
    }

    el("weatherStatus").textContent =
      "Unable to load weather. Check your internet connection.";

    el("weatherStatus").hidden = false;
    el("weatherData").hidden = true;
    el("weatherCondition").textContent = "";
    el("activitySection").hidden = true;

    console.error("Weather error:", error);

  } finally {

    if (weatherController === controller) {
      weatherController = null;
    }

  }

}


/* ==========================================
   9. ACTIVITIES FOR NINE DESTINATIONS
========================================== */

const activityIdeas = {

  langkawi: {
    indoor: [
      "Visit Underwater World Langkawi",
      "Explore indoor duty-free shops",
      "Relax at a local café"
    ],
    hot: [
      "Visit an indoor aquarium",
      "Enjoy lunch at a shaded restaurant",
      "Explore local shopping areas"
    ],
    outdoor: [
      "Enjoy a walk along the beach",
      "Explore scenic island viewpoints",
      "Visit local attractions around Langkawi"
    ]
  },

  cameron: {
    indoor: [
      "Enjoy tea at a sheltered café",
      "Visit indoor strawberry farm shops",
      "Explore covered local markets"
    ],
    hot: [
      "Relax at a tea café",
      "Explore shaded garden areas",
      "Visit local produce markets"
    ],
    outdoor: [
      "Visit a tea plantation viewpoint",
      "Explore flower gardens",
      "Enjoy a nature walk"
    ]
  },

  penang: {
    indoor: [
      "Explore indoor art galleries",
      "Try local food at covered eateries",
      "Visit indoor heritage exhibitions"
    ],
    hot: [
      "Visit an air-conditioned museum",
      "Explore indoor heritage galleries",
      "Enjoy Penang's local food"
    ],
    outdoor: [
      "Explore George Town heritage streets",
      "Discover colourful street art",
      "Visit historical landmarks"
    ]
  },

  kualalumpur: {
    indoor: [
      "Visit Aquaria KLCC",
      "Explore local museums",
      "Enjoy food at an indoor market"
    ],
    outdoor: [
      "Take photos at KLCC Park",
      "Explore Merdeka Square",
      "Walk around the city centre"
    ]
  },

  melaka: {
    indoor: [
      "Visit heritage museums",
      "Browse covered shops at Jonker Walk",
      "Try local food indoors"
    ],
    outdoor: [
      "Explore Dutch Square",
      "Walk along the Melaka River",
      "Discover historic streets"
    ]
  },

  sabah: {
    indoor: [
      "Visit Sabah State Museum",
      "Try local food at a sheltered cafe",
      "Explore indoor markets"
    ],
    outdoor: [
      "Explore the waterfront",
      "Visit Tunku Abdul Rahman Marine Park",
      "Enjoy the seaside scenery"
    ]
  },

  sarawak: {
    indoor: [
      "Visit a museum in Kuching",
      "Explore cultural exhibitions",
      "Try Sarawak local food indoors"
    ],
    outdoor: [
      "Walk along Kuching Waterfront",
      "Explore old-town streets",
      "Visit local landmarks"
    ]
  },

  johor: {
    indoor: [
      "Explore indoor shopping areas",
      "Visit a city gallery",
      "Try Johor local food"
    ],
    outdoor: [
      "See city landmarks",
      "Explore parks in Johor Bahru",
      "Visit waterfront viewpoints"
    ]
  },

  perak: {
    indoor: [
      "Enjoy Ipoh white coffee",
      "Explore indoor heritage galleries",
      "Try famous Ipoh local food"
    ],
    outdoor: [
      "Walk around Ipoh Old Town",
      "Explore heritage street art",
      "Admire limestone hill scenery"
    ]
  }

};


/* ==========================================
   10. WEATHER-BASED SUGGESTION LOGIC
   IF ELSE AND SWITCH
========================================== */

function suggestActivities(destination, weather) {

  const code = weather.weather_code;

  const rainy =
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82) ||
    (code >= 95 && code <= 99);

  const foggy =
    code === 45 || code === 48;

  const windy =
    weather.wind_speed_10m >= 30;

  let situation;
  let reason;

  // Select activity type based on weather.
  if (!Number.isFinite(code)) {

    return {
      reason: "Weather information unavailable.",
      activities: []
    };

  } else if (
    rainy ||
    foggy ||
    windy ||
    (code >= 71 && code <= 77)
  ) {

    situation = "indoor";

    reason =
      "The weather may not be suitable for outdoor activities. Try these sheltered places instead.";

  } else if (weather.temperature_2m >= 32) {

    situation = "hot";

    reason =
      "It's quite hot today! Consider these places where you can stay cool.";

  } else {

    situation = "outdoor";

    reason =
      "The weather looks suitable for exploring. Here are some activities you might enjoy.";

  }

  // Choose destination activities using switch.
  let ideas;

  switch (destination.name) {

    case "Langkawi":
      ideas = activityIdeas.langkawi;
      break;

    case "Cameron Highlands":
      ideas = activityIdeas.cameron;
      break;

    case "George Town":
      ideas = activityIdeas.penang;
      break;

    case "Kuala Lumpur":
      ideas = activityIdeas.kualalumpur;
      break;

    case "Melaka City":
      ideas = activityIdeas.melaka;
      break;

    case "Kota Kinabalu":
      ideas = activityIdeas.sabah;
      break;

    case "Kuching":
      ideas = activityIdeas.sarawak;
      break;

    case "Johor Bahru":
      ideas = activityIdeas.johor;
      break;

    case "Ipoh":
      ideas = activityIdeas.perak;
      break;

    default:
      return {
        reason: "No suggestions for this destination.",
        activities: []
      };

  }

  // Choose indoor, hot or outdoor activities.
  const activities =
    situation === "outdoor"
      ? ideas.outdoor
      : (ideas[situation] || ideas.indoor);

  return {
    reason: reason,
    activities: activities
  };

}


/* ==========================================
   11. DISPLAY AND SAVE ACTIVITIES
========================================== */

function showSuggestedActivities(destination, weather) {

  const result =
    suggestActivities(destination, weather);

  el("activityReason").textContent = result.reason;

  const list = el("activityList");

  list.replaceChildren();

  const activitiesToDisplay = result.activities.length
    ? result.activities
    : ["No suitable activities found."];

  activitiesToDisplay.forEach(activity => {

    const li = document.createElement("li");

    li.textContent = activity;

    list.appendChild(li);

  });

  el("activitySection").hidden = false;

  // Save recommendations in Local Storage.
  try {

    const saved = JSON.parse(
      localStorage.getItem("jomjalanSuggestions") || "{}"
    );

    saved[destination.name] = {

      country: "Malaysia",
      destination: destination.name,
      state: destination.state,
      weatherCode: weather.weather_code,
      reason: result.reason,
      activities: result.activities,
      updatedAt: new Date().toISOString()

    };

    localStorage.setItem(
      "jomjalanSuggestions",
      JSON.stringify(saved)
    );

  } catch (error) {

    console.warn(
      "Unable to save suggestions:",
      error
    );

  }

}



/* ==========================================
   RECOMMENDED TOURIST ATTRACTIONS
   WITH WIKIPEDIA API
========================================== */

const recommendedAttractions = {

  langkawi: [
    "Langkawi Sky Bridge",
    "Langkawi Cable Car",
    "Langkawi"
  ],

  cameron: [
    "Cameron Highlands",
    "BOH Plantations"
  ],

  penang: [
    "Penang Hill",
    "Kek Lok Si",
    "Fort Cornwallis"
  ],

  kualalumpur: [
    "Petronas Towers",
    "Batu Caves",
    "Merdeka Square, Kuala Lumpur"
  ],

  melaka: [
    "A Famosa",
    "Stadthuys",
    "Jonker Street"
  ],

  sabah: [
    "Tunku Abdul Rahman National Park",
    "Kota Kinabalu City Mosque"
  ],

  sarawak: [
    "Sarawak Cultural Village",
    "Bako National Park"
  ],

  johor: [
    "Legoland Malaysia Resort",
    "Sultan Abu Bakar State Mosque"
  ],

  perak: [
    "Kellie's Castle",
    "Lost World of Tambun"
  ]

};


async function getAttractions(destination) {

  const requestId = ++attractionsRequestId;

  const status = el("attractionsStatus");
  const list = el("attractionsList");

  list.replaceChildren();

  status.textContent = "Loading travel attractions...";

  // Get the list for selected destination
  const titles =
    recommendedAttractions[selectedDestinationId] || [];

  if (titles.length === 0) {
    status.textContent = "No attractions available.";
    return;
  }

  const url = new URL(
    "https://en.wikipedia.org/w/api.php"
  );

  url.searchParams.set("action", "query");
  url.searchParams.set("titles", titles.join("|"));
  url.searchParams.set("redirects", "1");

  url.searchParams.set("prop", "extracts|info");
  url.searchParams.set("inprop", "url");

  url.searchParams.set("exintro", "1");
  url.searchParams.set("explaintext", "1");
  url.searchParams.set("exsentences", "2");

  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");

  try {

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Wikipedia API failed");
    }

    const data = await response.json();

    // Ignore outdated requests
    if (
      requestId !== attractionsRequestId ||
      modal.hidden
    ) {
      return;
    }

    // Skip articles that do not exist
    const pages = Object.values(
      data.query?.pages || {}
    ).filter(page => {
      return !Object.prototype.hasOwnProperty.call(
        page,
        "missing"
      );
    });

    if (pages.length === 0) {
      status.textContent =
        "Travel information is currently unavailable.";
      return;
    }

    status.textContent = "";

    pages.forEach(page => {

      const card = document.createElement("div");
      card.className = "attraction-item";

      const heading = document.createElement("h4");
      heading.textContent = page.title;

      const description = document.createElement("p");

      const fullText = page.extract ||
        "Learn more about this attraction on Wikipedia.";

      description.textContent =
        fullText.slice(0, 170) +
        (fullText.length > 170 ? "..." : "");

      card.append(heading, description);

      if (page.fullurl) {

        const button = document.createElement("a");

        button.href = page.fullurl;
        button.target = "_blank";
        button.rel = "noopener noreferrer";

        button.className = "attraction-link";
        button.textContent = "Read More ↗";

        card.appendChild(button);

      }

      list.appendChild(card);

    });

  } catch (error) {

    if (
      requestId !== attractionsRequestId ||
      modal.hidden
    ) {
      return;
    }

    status.textContent =
      "Unable to load attractions. Check your internet connection.";

    console.error("Travel information error:", error);

  }

}

/* ==========================================
   13. TRAVEL PACKAGE SELECTION
========================================== */

const packageSelect = el("packageSelect");
const budgetResult = el("budgetResult");
const budgetMessage = el("budgetMessage");


// Reset old budget calculation.
function clearPreviousCalculation() {

  lastCalculatedTrip = null;

  budgetResult.hidden = true;

  budgetMessage.textContent = "";

}


// Load packages for chosen destination.
function loadPackages(id) {

  selectedDestinationId = id;

  clearPreviousCalculation();

  el("packageIncludes").textContent = "";

  packageSelect.replaceChildren();

  const first = document.createElement("option");

  first.value = "";
  first.textContent = "Select a package";

  packageSelect.appendChild(first);

  const packages = travelPackages[id] || [];

  packages.forEach((pkg, index) => {

    const option = document.createElement("option");

    option.value = String(index);

    option.textContent =
      `${pkg.name} - RM ${pkg.dailyPrice} / person / day`;

    packageSelect.appendChild(option);

  });

}


// Display selected package details.
packageSelect.addEventListener("change", () => {

  clearPreviousCalculation();

  const packages =
    travelPackages[selectedDestinationId] || [];

  const pkg = packageSelect.value === ""
    ? null
    : packages[Number(packageSelect.value)];

  el("packageIncludes").textContent =
    pkg ? pkg.includes : "";

});


// If input changes, require recalculation.
[
  "tripDays",
  "travellers",
  "transportCost"
].forEach(id => {

  el(id).addEventListener(
    "input",
    clearPreviousCalculation
  );

});


/* ==========================================
   14. TRAVEL BUDGET CALCULATOR
========================================== */

function calculateTravelBudget() {

  clearPreviousCalculation();

  if (packageSelect.value === "") {

    budgetMessage.textContent =
      "Please select a travel package.";

    return;
  }

  const trip = calculateTrip(

    selectedDestinationId,

    packageSelect.value,

    el("tripDays").value,

    el("travellers").value,

    el("transportCost").value

  );

  if (!trip) {

    budgetMessage.textContent =
      "Enter valid days (1-30), travellers (1-20) and transport cost.";

    return;
  }

  // Store calculation temporarily.
  lastCalculatedTrip = trip;

  // Display calculated price.
  el("packageTotal").textContent =
    money(trip.packageCost);

  el("transportTotal").textContent =
    money(trip.transportTotal);

  el("estimatedTotal").textContent =
    money(trip.budget);

  el("perPersonTotal").textContent =
    `Estimated cost per person: ${money(trip.budget / trip.people)}`;

  budgetResult.hidden = false;

}


el("calculateBudget").addEventListener(
  "click",
  calculateTravelBudget
);


/* ==========================================
   15. PAGE NAVIGATION
========================================== */

function showPage(page) {

  const showPlans = page === "plans";

  // Show selected page.
  document.querySelector(".layout").hidden =
    showPlans;

  el("plansPage").hidden = !showPlans;

  // Update navigation.
  el("navExplore").classList.toggle(
    "active",
    !showPlans
  );

  el("navPlans").classList.toggle(
    "active",
    showPlans
  );

  if (showPlans) {
    displayTravelPlans();
  }

  window.scrollTo(0, 0);

}


// Explore page.
el("navExplore").addEventListener("click", () => {
  showPage("explore");
});


// My Travel Plans page.
el("navPlans").addEventListener("click", () => {
  showPage("plans");
});


/* ==========================================
   16. MY TRAVEL PLANS
   AUTOMATIC BUDGET
========================================== */

const STORAGE_KEY = "jomjalanTravelPlans";

const planForm = el("planForm");
const savedPlansList = el("savedPlansList");
const planMessage = el("planMessage");

const planPackage = el("planPackage");
const planTransport = el("planTransport");

let editingPlanId = null;


// Load packages in the second page.
function loadPlanPackages(id, chosenIndex = "") {

  planPackage.replaceChildren();

  const first = document.createElement("option");

  first.value = "";
  first.textContent = "Select a package";

  planPackage.appendChild(first);

  const packages = travelPackages[id] || [];

  packages.forEach((pkg, index) => {

    const option = document.createElement("option");

    option.value = String(index);

    option.textContent =
      `${pkg.name} - RM ${pkg.dailyPrice} / person / day`;

    planPackage.appendChild(option);

  });

  planPackage.value =
    chosenIndex === ""
      ? ""
      : String(chosenIndex);

}


// Automatically update readonly budget.
function updatePlanBudget() {

  const trip = calculateTrip(

    el("planDestination").value,

    planPackage.value,

    el("planDays").value,

    el("planPeople").value,

    planTransport.value

  );

  el("planBudget").value =
    trip ? trip.budget.toFixed(2) : "";

  return trip;

}


// Change destination.
el("planDestination").addEventListener(
  "change",
  () => {

    loadPlanPackages(
      el("planDestination").value
    );

    updatePlanBudget();

  }
);


// Recalculate when information changes.
[
  "planPackage",
  "planDays",
  "planPeople",
  "planTransport"
].forEach(id => {

  el(id).addEventListener(
    "input",
    updatePlanBudget
  );

});


// Initial package dropdown.
loadPlanPackages("");


/* ==========================================
   17. LOCAL STORAGE
========================================== */

// READ saved travel plans.
function getTravelPlans() {

  try {

    const plans = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(plans)) {
      throw new Error("Invalid travel plans data");
    }

    return plans;

  } catch (error) {

    planMessage.textContent =
      "Unable to read saved travel plans.";

    console.error(error);

    return null;

  }

}


// SAVE travel plans.
function saveToStorage(plans) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(plans)
    );

    return true;

  } catch (error) {

    planMessage.textContent =
      "Unable to save travel plans.";

    console.error(error);

    return false;

  }

}

/* ==========================================
   18. DISPLAY SAVED TRIPS WITH IMAGES
========================================== */

function displayTravelPlans() {

  const plans = getTravelPlans();

  savedPlansList.replaceChildren();

  if (plans === null) {
    savedPlansList.textContent =
      "Saved trips could not be loaded.";
    return;
  }

  if (plans.length === 0) {

    const empty = document.createElement("p");

    empty.className = "empty-plans";

    empty.textContent =
      "No travel plans yet. Start planning your first trip!";

    savedPlansList.appendChild(empty);

    return;
  }

  plans.forEach(plan => {

    // Get destination information
    const destination = destinations[plan.destination];

    const destinationName = destination
      ? destination.name
      : "Unknown Destination";


    /* ======================================
       CREATE SAVED TRIP CARD
    ====================================== */

    const card = document.createElement("div");

    card.className = "saved-plan-card";


    /* ======================================
       DESTINATION IMAGE
    ====================================== */

    const imageWrapper = document.createElement("div");

    imageWrapper.className = "saved-plan-image-wrap";

    const image = document.createElement("img");

    image.className = "saved-plan-image";

    image.alt = destinationName;

    image.loading = "lazy";

    if (destination) {

      addImageFallback(image, destination);

      image.src = destination.image;

    } else {

      image.src = createPlacePlaceholder(
        destinationName
      );

    }


    /* ======================================
       DARK GRADIENT OVER IMAGE
    ====================================== */

    const imageOverlay = document.createElement("div");

    imageOverlay.className = "saved-plan-image-overlay";

    // Destination category
    const category = document.createElement("span");

    category.className = "saved-plan-category";

    category.textContent = destination
      ? `${destination.state} · ${destination.type}`
      : "Malaysia";


    // Destination title
    const imageTitle = document.createElement("h3");

    imageTitle.textContent = destinationName;


    imageOverlay.append(
      category,
      imageTitle
    );

    imageWrapper.append(
      image,
      imageOverlay
    );


    /* ======================================
       SAVED TRIP INFORMATION
    ====================================== */

    const body = document.createElement("div");

    body.className = "saved-plan-body";


    // Date, days and travellers
    const details = document.createElement("p");

    details.textContent =
      `${plan.date} · ${plan.days} days · ${plan.people} travellers`;


    // Package
    const pkg = document.createElement("p");

    pkg.textContent = plan.packageName
      ? `Package: ${plan.packageName}`
      : "Package: Not recorded";


    // Estimated budget
    const budget = document.createElement("p");

    const savedBudget = Number(plan.budget);

    budget.className = "saved-plan-budget";

    budget.textContent = Number.isFinite(savedBudget)
      ? `Estimated Budget: ${money(savedBudget)}`
      : "Estimated Budget: Not recorded";


    // Travel notes
    const notes = document.createElement("p");

    notes.className = "saved-plan-notes";

    notes.textContent =
      plan.notes || "No notes added.";


    /* ======================================
       EDIT AND DELETE BUTTONS
    ====================================== */

    const buttons = document.createElement("div");

    buttons.className = "plan-actions";


    // Edit button
    const edit = document.createElement("button");

    edit.type = "button";

    edit.className = "edit-plan-btn";

    edit.textContent = "Edit";

    edit.addEventListener("click", () => {

      editPlan(plan.id);

    });


    // Delete button
    const remove = document.createElement("button");

    remove.type = "button";

    remove.className = "delete-plan-btn";

    remove.textContent = "Delete";

    remove.addEventListener("click", () => {

      deletePlan(plan.id);

    });


    buttons.append(
      edit,
      remove
    );


    /* ======================================
       PUT EVERYTHING TOGETHER
    ====================================== */

    body.append(
      details,
      pkg,
      budget,
      notes,
      buttons
    );

    card.append(
      imageWrapper,
      body
    );

    savedPlansList.appendChild(card);

  });

}

/* ==========================================
   19. CREATE AND UPDATE TRAVEL PLAN
========================================== */

planForm.addEventListener("submit", event => {

  event.preventDefault();

  // Recalculate budget before saving.
  const trip = updatePlanBudget();

  const date = el("planDate").value;

  const notes = el("planNotes").value.trim();

  // Validate travel date.
  if (!date) {

    planMessage.textContent =
      "Please select your travel date.";

    return;
  }

  // Validate package and budget.
  if (!trip) {

    planMessage.textContent =
      "Select a package and enter valid trip details.";

    return;
  }

  const plans = getTravelPlans();

  if (plans === null) {
    return;
  }

  const wasEditing = editingPlanId !== null;

  const data = {
    ...trip,
    date: date,
    notes: notes
  };

  if (wasEditing) {

    // UPDATE an existing plan.
    const index = plans.findIndex(
      plan => plan.id === editingPlanId
    );

    if (index < 0) {

      planMessage.textContent =
        "Travel plan not found.";

      return;
    }

    plans[index] = {
      ...plans[index],
      ...data
    };

  } else {

    // CREATE a new plan.
    const newPlan = {

      id:
        `${Date.now()}${Math.random().toString(36).slice(2)}`,

      ...data

    };

    plans.push(newPlan);

  }

  // Save to Local Storage.
  if (saveToStorage(plans)) {

    resetPlanForm();

    planMessage.textContent = wasEditing
      ? "Travel plan updated successfully!"
      : "Travel plan saved successfully!";

    displayTravelPlans();

  }

});


/* ==========================================
   20. EDIT SAVED TRAVEL PLAN
========================================== */

function editPlan(id) {

  const plans = getTravelPlans();

  if (!plans) {
    return;
  }

  const plan = plans.find(
    item => item.id === id
  );

  if (!plan) {
    return;
  }

  editingPlanId = id;

  // Fill form with existing details.
  el("planDestination").value =
    plan.destination;

  el("planDate").value =
    plan.date;

  el("planDays").value =
    plan.days;

  el("planPeople").value =
    plan.people;

  el("planNotes").value =
    plan.notes || "";


  // Find the saved package.
  const packages =
    travelPackages[plan.destination] || [];

  let packageIndex = "";

  if (
    Number.isInteger(plan.packageIndex) &&
    packages[plan.packageIndex]?.name === plan.packageName
  ) {

    packageIndex = plan.packageIndex;

  } else {

    // Support older saved travel plans.
    const found = packages.findIndex(pkg =>

      pkg.name === plan.packageName ||
      (plan.notes || "").includes(pkg.name)

    );

    if (found >= 0) {
      packageIndex = found;
    }

  }

  loadPlanPackages(
    plan.destination,
    packageIndex
  );

  // Older plans may not contain transport details.
  planTransport.value =
    plan.transportPerPerson !== undefined
      ? String(plan.transportPerPerson)
      : "";

  // Recalculate budget.
  updatePlanBudget();

  // Change form into Edit mode.
  el("planFormTitle").textContent =
    "Edit Travel Plan";

  el("savePlanBtn").textContent =
    "Update Travel Plan";

  el("cancelEditBtn").hidden = false;

  if (
    packageIndex === "" ||
    planTransport.value === ""
  ) {

    planMessage.textContent =
      "Older plan: choose a package and transport cost before updating.";

  } else {

    planMessage.textContent =
      "Editing selected travel plan.";

  }

  // Scroll to form.
  document.querySelector(".plan-form-box")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}


/* ==========================================
   21. DELETE TRAVEL PLAN
========================================== */

function deletePlan(id) {

  const plans = getTravelPlans();

  if (!plans) {
    return;
  }

  const confirmed = confirm(
    "Are you sure you want to delete this travel plan?"
  );

  if (!confirmed) {
    return;
  }

  const remaining = plans.filter(
    plan => plan.id !== id
  );

  if (remaining.length === plans.length) {
    return;
  }

  if (saveToStorage(remaining)) {

    if (editingPlanId === id) {
      resetPlanForm();
    }

    displayTravelPlans();

    planMessage.textContent =
      "Travel plan deleted successfully!";

  }

}


/* ==========================================
   22. RESET TRAVEL PLAN FORM
========================================== */

function resetPlanForm() {

  planForm.reset();

  editingPlanId = null;

  loadPlanPackages("");

  el("planBudget").value = "";

  el("planFormTitle").textContent =
    "Plan a Trip";

  el("savePlanBtn").textContent =
    "Save Travel Plan";

  el("cancelEditBtn").hidden = true;

}


// Cancel Edit button.
el("cancelEditBtn").addEventListener("click", () => {

  resetPlanForm();

  planMessage.textContent =
    "Editing cancelled.";

});


/* ==========================================
   23. CONNECT EXPLORE TO MY TRAVEL PLANS
========================================== */

el("continueToPlan").addEventListener("click", () => {

  if (!lastCalculatedTrip) {

    budgetMessage.textContent =
      "Please calculate your budget first.";

    return;
  }

  const trip = lastCalculatedTrip;

  // Close popup.
  closeDetails();

  // Open second page.
  showPage("plans");

  // Clear previous form.
  resetPlanForm();

  // Transfer destination.
  el("planDestination").value =
    trip.destination;

  // Transfer selected package.
  loadPlanPackages(
    trip.destination,
    trip.packageIndex
  );

  // Transfer travel days.
  el("planDays").value =
    trip.days;

  // Transfer travellers.
  el("planPeople").value =
    trip.people;

  // Transfer transport cost.
  planTransport.value =
    trip.transportPerPerson;

  // Calculate automatic budget.
  updatePlanBudget();

  // User still selects a travel date.
  el("planDate").value = "";

  // Save package information in notes.
  el("planNotes").value =
    `Selected Package: ${trip.packageName}\nPackage price is an estimate.`;

  planMessage.textContent =
    "Trip details transferred! Choose a date, then Save Travel Plan.";

  el("planDate").focus();

});


/* ==========================================
   24. LOAD SAVED PLANS ON STARTUP
========================================== */

displayTravelPlans();

/* ==========================================
   HERO IMAGE SLIDER
========================================== */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrev = document.getElementById("heroPrev");
const heroNext = document.getElementById("heroNext");

let currentHeroSlide = 0;
let heroInterval = null;

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  if (index < 0) {
    currentHeroSlide = heroSlides.length - 1;
  } else if (index >= heroSlides.length) {
    currentHeroSlide = 0;
  } else {
    currentHeroSlide = index;
  }

  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentHeroSlide);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentHeroSlide);
  });
}

function nextHeroSlide() {
  showHeroSlide(currentHeroSlide + 1);
}

function prevHeroSlide() {
  showHeroSlide(currentHeroSlide - 1);
}

function startHeroSlider() {
  stopHeroSlider();
  heroInterval = setInterval(nextHeroSlide, 4000);
}

function stopHeroSlider() {
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }
}

if (heroPrev && heroNext && heroSlides.length) {
  heroPrev.addEventListener("click", () => {
    prevHeroSlide();
    startHeroSlider();
  });

  heroNext.addEventListener("click", () => {
    nextHeroSlide();
    startHeroSlider();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroSlider();
    });
  });

  showHeroSlide(0);
  startHeroSlider();
}

/* ==========================================
   25. CINEMATIC IMAGE SLIDER
========================================== */

const heroSlider =
  document.getElementById("destinationSlider");

if (heroSlider) {

  const heroTrack =
    document.getElementById("heroSliderTrack");

  const heroSlides =
    Array.from(heroTrack.querySelectorAll(".hero-slide"));

  const heroDots =
    Array.from(document.querySelectorAll(".hero-dot"));

  const heroPrev =
    document.getElementById("heroPrev");

  const heroNext =
    document.getElementById("heroNext");

  const totalSlides = heroSlides.length;

  let currentSlide = 1;
  let heroTimer = null;
  let isSliding = false;
  let isPaused = false;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (totalSlides > 1) {

    // Clone first and last images for seamless looping
    const firstClone = heroSlides[0].cloneNode(true);
    const lastClone = heroSlides[totalSlides - 1].cloneNode(true);

    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");

    heroTrack.appendChild(firstClone);
    heroTrack.insertBefore(lastClone, heroSlides[0]);

    // Start at the real first image
    heroTrack.style.transition = "none";
    heroTrack.style.transform = "translateX(-100%)";

    // Update active navigation dot
    function updateHeroDots() {

      const activeIndex =
        (currentSlide - 1 + totalSlides) % totalSlides;

      heroDots.forEach((dot, index) => {

        const active = index === activeIndex;

        dot.classList.toggle("active", active);

        dot.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );

      });

    }

    // Move to the selected image
    function moveHeroTo(index) {

      if (isSliding) {
        return;
      }

      isSliding = true;

      currentSlide = index;

      heroTrack.style.transition = reducedMotion
        ? "none"
        : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";

      heroTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;

      updateHeroDots();

      if (reducedMotion) {
        finishHeroSlide();
      }

    }

    // Reset position after reaching a cloned image
    function finishHeroSlide() {

      if (currentSlide === totalSlides + 1) {
        currentSlide = 1;
      }

      if (currentSlide === 0) {
        currentSlide = totalSlides;
      }

      heroTrack.style.transition = "none";

      heroTrack.style.transform =
        `translateX(-${currentSlide * 100}%)`;

      // Apply reset before the next animation
      void heroTrack.offsetWidth;

      isSliding = false;

      updateHeroDots();

    }

    // Listen for the end of sliding animation
    heroTrack.addEventListener("transitionend", event => {

      if (
        event.target !== heroTrack ||
        event.propertyName !== "transform"
      ) {
        return;
      }

      finishHeroSlide();

    });

    function nextHero() {
      moveHeroTo(currentSlide + 1);
    }

    function previousHero() {
      moveHeroTo(currentSlide - 1);
    }

    // Stop automatic sliding
    function stopHeroAutoplay() {

      if (heroTimer !== null) {
        clearInterval(heroTimer);
        heroTimer = null;
      }

    }

    // Start automatic sliding
    function startHeroAutoplay() {

      stopHeroAutoplay();

      if (reducedMotion || isPaused || document.hidden) {
        return;
      }

      heroTimer = setInterval(() => {

        const explorePage =
          document.querySelector(".layout");

        if (explorePage && !explorePage.hidden) {
          nextHero();
        }

      }, 5000);

    }

    // Previous button
    heroPrev.addEventListener("click", () => {

      previousHero();
      startHeroAutoplay();

    });

    // Next button
    heroNext.addEventListener("click", () => {

      nextHero();
      startHeroAutoplay();

    });

    // Navigation dots
    heroDots.forEach((dot, index) => {

      dot.addEventListener("click", () => {

        moveHeroTo(index + 1);
        startHeroAutoplay();

      });

    });

    // Pause on mouse hover
    heroSlider.addEventListener("mouseenter", () => {

      isPaused = true;
      stopHeroAutoplay();

    });

    heroSlider.addEventListener("mouseleave", () => {

      isPaused = false;
      startHeroAutoplay();

    });

    // Pause when keyboard controls are focused
    heroSlider.addEventListener("focusin", () => {

      isPaused = true;
      stopHeroAutoplay();

    });

    heroSlider.addEventListener("focusout", event => {

      if (!heroSlider.contains(event.relatedTarget)) {

        isPaused = false;
        startHeroAutoplay();

      }

    });

    // Keyboard arrow navigation
    heroSlider.addEventListener("keydown", event => {

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousHero();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextHero();
      }

    });

    // Pause when application is not visible
    document.addEventListener("visibilitychange", () => {

      if (document.hidden) {
        stopHeroAutoplay();
      } else {
        startHeroAutoplay();
      }

    });

    updateHeroDots();
    startHeroAutoplay();

  }

}
/* ==========================================
   SAVED TRIP IMAGE MAP
========================================== */

const savedTripImages = {
  "Langkawi": "images/langkawi.jpg",
  "Cameron Highlands": "images/cameron.jpg",
  "George Town": "images/penang.jpg",
  "Kuala Lumpur": "images/kualalumpur.jpg",
  "Melaka City": "images/melaka.jpg",
  "Kota Kinabalu": "images/sabah.jpg",
  "Kuching": "images/sarawak.jpg",
  "Johor Bahru": "images/johor.jpg",
  "Ipoh": "images/perak.jpg"
};

function getSavedTripImage(destination) {
  return savedTripImages[destination] || "images/langkawi.jpg";
}