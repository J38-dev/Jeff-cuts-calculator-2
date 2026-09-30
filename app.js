// =========================================================
// JEFF CUTS
// MAIN APPLICATION JAVASCRIPT
// =========================================================


// =========================================================
// SUPABASE CONNECTION
// =========================================================

const SUPABASE_URL =
  "https://qrqgwhmsbodvminpfrus.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_lIiwPuX_4IdxqciNfHea5Q_G7-ykX2X";


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );


// =========================================================
// PRICING
// =========================================================

const PRICING = {

  "Adult Pricing": {

    "Normal Haircut": 85,

    "Haircut & Shave": 100,

    "Enhancer": 140,

    "Beard Enhancer": 150,

    "Head Shave Blade & Hot Towel": 100,

    "Enhancer, Haircut & Wash": 160,

    "Line-Design": 50,

    "Haircut & Wash": 95,

    "Eyebrows": 0

  },


  "Student Pricing": {

    "Haircut": 75,

    "Enhancer": 110,

    "Line Up": 20,

    "Line Up Enhancer": 25,

    "Eyebrows": 0,

    "Line-Design": 30,

    "Haircut & Wash": 85

  },


  "Kids Pricing": {

    "Normal Haircut": 60,

    "Line-Designs": 25,

    "Enhancer": 80,

    "Haircut & Wash": 70,

    "Eyebrows": 80

  },


  "Papa's At The Jeff's": {

    "Wave Butter (Pomade)": 140,

    "Razor Bump": 100,

    "Beard Oil": 140,

    "Beard Butter": 110,

    "All in One Wash": 120

  }

};


// =========================================================
// DOM ELEMENTS
// =========================================================

const dateEl =
  document.getElementById("date");

const categoryEl =
  document.getElementById("category");

const serviceEl =
  document.getElementById("service");

const priceEl =
  document.getElementById("price");

const addBtn =
  document.getElementById("addBtn");

const listEl =
  document.getElementById("list");

const totalEl =
  document.getElementById("total");

const countEl =
  document.getElementById("count");

const bookingDateEl =
  document.getElementById("bookingDate");

const bookingTimeEl =
  document.getElementById("bookingTime");

const bookBtn =
  document.getElementById("bookBtn");

const liveTimeEl =
  document.getElementById("liveTime");

const liveDateEl =
  document.getElementById("liveDate");


// =========================================================
// JOHANNESBURG DATE HELPERS
// =========================================================

function getJohannesburgParts() {

  const formatter =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: "Africa/Johannesburg",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    );


  const parts =
    formatter.formatToParts(
      new Date()
    );


  const values = {};


  parts.forEach(part => {

    if (part.type !== "literal") {

      values[part.type] =
        part.value;

    }

  });


  return values;

}


function getJohannesburgDateInputValue() {

  const parts =
    getJohannesburgParts();


  return `${parts.year}-${parts.month}-${parts.day}`;

}


// =========================================================
// LIVE HERO DATE + TIME
// =========================================================

function updateLiveDateTime() {

  const now =
    new Date();


  if (liveTimeEl) {

    liveTimeEl.textContent =
      new Intl.DateTimeFormat(
        "en-ZA",
        {
          timeZone: "Africa/Johannesburg",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }
      ).format(now);

  }


  if (liveDateEl) {

    liveDateEl.textContent =
      new Intl.DateTimeFormat(
        "en-ZA",
        {
          timeZone: "Africa/Johannesburg",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      ).format(now);

  }


  if (dateEl) {

    dateEl.textContent =
      new Intl.DateTimeFormat(
        "en-ZA",
        {
          timeZone: "Africa/Johannesburg",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      ).format(now);

  }

}


updateLiveDateTime();


setInterval(
  updateLiveDateTime,
  1000
);


// =========================================================
// CUSTOMER CART
// =========================================================

let entries = [];


try {

  const savedCuts =
    localStorage.getItem("cuts");


  if (savedCuts) {

    const parsed =
      JSON.parse(savedCuts);


    if (Array.isArray(parsed)) {

      entries =
        parsed;

    }

  }

} catch (error) {

  console.warn(
    "Saved cart could not be loaded.",
    error
  );


  entries = [];

  localStorage.removeItem("cuts");

}


// =========================================================
// TIME SLOTS
// =========================================================

const timeSlots = [

  "11:00",

  "12:00",

  "13:00",

  "14:00",

  "15:00",

  "16:00",

  "17:00",

  "18:00"

];


// =========================================================
// SHOP STATUS ELEMENTS
// =========================================================

const jcStatusText =
  document.getElementById(
    "jc-status-text"
  );

const jcStatusDot =
  document.querySelector(
    ".jc-status-dot"
  );

const jcOpenBtn =
  document.getElementById(
    "openBtn"
  );

const jcCloseBtn =
  document.getElementById(
    "closeBtn"
  );

const jcAdminPanel =
  document.getElementById(
    "adminPanel"
  );


// =========================================================
// SHOP STATUS
// =========================================================

let jcShopStatus =
  localStorage.getItem(
    "jeffCutsStatus"
  ) || "open";


if (
  jcShopStatus !== "open" &&
  jcShopStatus !== "closed"
) {

  jcShopStatus =
    "open";

}


function isShopOpen() {

  return jcShopStatus === "open";

}


// =========================================================
// UPDATE SHOP STATUS
// =========================================================

function updateJeffCutsStatus() {

  const isOpen =
    isShopOpen();


  if (jcStatusText) {

    jcStatusText.textContent =
      isOpen
        ? "OPEN NOW"
        : "CLOSED";

  }


  if (jcStatusDot) {

    jcStatusDot.classList.toggle(
      "jc-status-closed",
      !isOpen
    );

  }


  if (bookBtn) {

    bookBtn.disabled =
      !isOpen;


    bookBtn.textContent =
      isOpen
        ? "Book Appointment"
        : "BOOKING CLOSED";

  }


  if (addBtn) {

    addBtn.disabled =
      !isOpen;

  }


  const bookingForm =
    document.querySelector(
      ".booking-form"
    );


  if (bookingForm) {

    bookingForm.classList.toggle(
      "booking-closed",
      !isOpen
    );

  }

}


// =========================================================
// OPEN SHOP
// =========================================================

jcOpenBtn?.addEventListener(
  "click",
  () => {

    jcShopStatus =
      "open";


    localStorage.setItem(
      "jeffCutsStatus",
      "open"
    );


    updateJeffCutsStatus();

  }
);


// =========================================================
// CLOSE SHOP
// =========================================================

jcCloseBtn?.addEventListener(
  "click",
  () => {

    jcShopStatus =
      "closed";


    localStorage.setItem(
      "jeffCutsStatus",
      "closed"
    );


    updateJeffCutsStatus();

  }
);


// =========================================================
// ADMIN PANEL ACCESS
// =========================================================
//
// Tap the OPEN NOW / CLOSED status 5 times
// to reveal the admin controls.
//
// This keeps the panel hidden from normal visitors.
//

let adminTapCount = 0;

let adminTapTimer = null;


jcStatusText?.addEventListener(
  "click",
  () => {

    adminTapCount++;


    clearTimeout(
      adminTapTimer
    );


    adminTapTimer =
      setTimeout(
        () => {

          adminTapCount = 0;

        },
        2500
      );


    if (
      adminTapCount >= 5 &&
      jcAdminPanel
    ) {

      const currentlyHidden =
        getComputedStyle(
          jcAdminPanel
        ).display === "none";


      jcAdminPanel.style.display =
        currentlyHidden
          ? "flex"
          : "none";


      adminTapCount = 0;

    }

  }
);


// =========================================================
// INITIAL STATUS
// =========================================================

updateJeffCutsStatus();


// =========================================================
// INITIAL BOOKING DATE
// =========================================================

if (bookingDateEl) {

  bookingDateEl.min =
    getJohannesburgDateInputValue();

}


// =========================================================
// CHECK SUNDAY
// =========================================================

function isSunday(dateString) {

  if (!dateString) return false;


  const date =
    new Date(
      `${dateString}T12:00:00`
    );


  return date.getDay() === 0;

}


// =========================================================
// RESET TIME DROPDOWN
// =========================================================

function resetTimeDropdown(
  message = "Select date first"
) {

  if (!bookingTimeEl) return;


  bookingTimeEl.innerHTML =
    "";


  const option =
    document.createElement(
      "option"
    );


  option.disabled =
    true;


  option.selected =
    true;


  option.textContent =
    message;


  bookingTimeEl.appendChild(
    option
  );

}


// =========================================================
// CATEGORY LOAD
// =========================================================

function loadCategories() {

  if (!categoryEl) return;


  categoryEl.innerHTML =
    "";


  Object.keys(PRICING)
    .forEach(category => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        category;


      option.textContent =
        category;


      categoryEl.appendChild(
        option
      );

    });

}


// =========================================================
// SERVICE LOAD
// =========================================================

function loadServices() {

  if (
    !categoryEl ||
    !serviceEl
  ) {

    return;

  }


  serviceEl.innerHTML =
    "";


  const services =
    PRICING[
      categoryEl.value
    ];


  if (!services) {

    updatePrice();

    return;

  }


  Object.keys(services)
    .forEach(service => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        service;


      option.textContent =
        service;


      serviceEl.appendChild(
        option
      );

    });


  updatePrice();

}


// =========================================================
// UPDATE PRICE
// =========================================================

function updatePrice() {

  if (!priceEl) return;


  const category =
    categoryEl?.value;


  const service =
    serviceEl?.value;


  const price =
    PRICING
      ?.[
        category
      ]
      ?.
      [
        service
      ];


  priceEl.value =
    price ?? 0;

}


// =========================================================
// CATEGORY EVENT
// =========================================================

categoryEl?.addEventListener(
  "change",
  loadServices
);


// =========================================================
// SERVICE EVENT
// =========================================================

serviceEl?.addEventListener(
  "change",
  updatePrice
);


// =========================================================
// LOAD BOOKED TIMES
// =========================================================

async function loadTimeSlots() {

  if (!bookingTimeEl) {
    return;
  }


  const date =
    bookingDateEl?.value;


  if (!date) {

    resetTimeDropdown(
      "Select date first"
    );

    return;

  }


  if (isSunday(date)) {

    resetTimeDropdown(
      "Closed on Sundays"
    );

    return;

  }


  resetTimeDropdown(
    "Checking availability..."
  );


  const {
    data,
    error
  } =
    await supabaseClient
      .from("bookings")
      .select("booking_time")
      .eq(
        "booking_date",
        date
      );


  if (error) {

    console.error(
      "Could not load bookings:",
      error
    );


    resetTimeDropdown(
      "Unable to load times"
    );


    return;

  }


  const bookedTimes =
    (data || [])
      .map(
        booking =>
          String(
            booking.booking_time
          ).substring(0, 5)
      );


  bookingTimeEl.innerHTML =
    "";


  let available =
    false;


  timeSlots.forEach(time => {

    if (
      !bookedTimes.includes(
        time
      )
    ) {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        time;


      option.textContent =
        time;


      bookingTimeEl.appendChild(
        option
      );


      available =
        true;

    }

  });


  if (!available) {

    resetTimeDropdown(
      "Fully Booked"
    );

  }

}


// =========================================================
// BOOKING DATE CHANGE
// =========================================================

bookingDateEl?.addEventListener(
  "change",
  async function () {

    const selectedDate =
      this.value;


    if (!selectedDate) {

      resetTimeDropdown(
        "Select date first"
      );

      return;

    }


    if (isSunday(selectedDate)) {

      alert(
        "Sorry, Jeff Cuts is closed on Sundays. Please choose another day."
      );


      this.value =
        "";


      resetTimeDropdown(
        "Select date first"
      );


      return;

    }


    await loadTimeSlots();

  }
);


// =========================================================
// ADD ENTRY
// =========================================================

addBtn?.addEventListener(
  "click",
  () => {

    if (!isShopOpen()) {

      alert(
        "Booking is currently closed."
      );


      return;

    }


    if (
      !categoryEl ||
      !serviceEl
    ) {

      return;

    }


    const category =
      categoryEl.value;


    const service =
      serviceEl.value;


    const price =
      Number(
        PRICING
          ?.
          [
            category
          ]
          ?.
          [
            service
          ] ?? 0
      );


    entries.push({

      category:
        category,

      service:
        service,

      price:
        price

    });


    render();

  }
);


// =========================================================
// REMOVE ENTRY
// =========================================================

window.removeEntry =
  function(index) {

    if (
      !Number.isInteger(index)
    ) {

      return;

    }


    if (
      index < 0 ||
      index >= entries.length
    ) {

      return;

    }


    entries.splice(
      index,
      1
    );


    render();

  };


// =========================================================
// RENDER CART
// =========================================================

function render() {

  if (!listEl) return;


  listEl.innerHTML =
    "";


  let total =
    0;


  entries.forEach(
    (item, index) => {

      const price =
        Number(
          item.price
        ) || 0;


      total +=
        price;


      const li =
        document.createElement(
          "li"
        );


      const info =
        document.createElement(
          "div"
        );


      info.className =
        "cut-summary-info";


      const category =
        document.createElement(
          "span"
        );


      category.className =
        "cut-summary-category";


      category.textContent =
        item.category;


      const service =
        document.createElement(
          "strong"
        );


      service.className =
        "cut-summary-service";


      service.textContent =
        item.service;


      const itemPrice =
        document.createElement(
          "span"
        );


      itemPrice.className =
        "cut-summary-price";


      itemPrice.textContent =
        `R${price}`;


      info.appendChild(
        category
      );


      info.appendChild(
        service
      );


      info.appendChild(
        itemPrice
      );


      const removeButton =
        document.createElement(
          "button"
        );


      removeButton.className =
        "cut-remove-btn";


      removeButton.type =
        "button";


      removeButton.setAttribute(
        "aria-label",
        `Remove ${item.service}`
      );


      removeButton.title =
        `Remove ${item.service}`;


      removeButton.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';


      removeButton.addEventListener(
        "click",
        () => {

          removeEntry(
            index
          );

        }
      );


      li.appendChild(
        info
      );


      li.appendChild(
        removeButton
      );


      listEl.appendChild(
        li
      );

    }
  );


  if (totalEl) {

    totalEl.textContent =
      `R${total}`;

  }


  if (countEl) {

    countEl.textContent =
      entries.length;

  }


  try {

    localStorage.setItem(
      "cuts",
      JSON.stringify(
        entries
      )
    );

  } catch (error) {

    console.warn(
      "Could not save cart.",
      error
    );

  }

}


// =========================================================
// BOOKING
// =========================================================

const barberNumber =
  "27671107595";


bookBtn?.addEventListener(
  "click",
  async () => {

    if (!isShopOpen()) {

      alert(
        "Booking is currently closed."
      );


      return;

    }


    const date =
      bookingDateEl?.value;


    const time =
      bookingTimeEl?.value;


    if (!date) {

      alert(
        "Select a date first."
      );


      return;

    }


    if (isSunday(date)) {

      alert(
        "Sorry, Jeff Cuts is closed on Sundays."
      );


      return;

    }


    if (!time ||
        !timeSlots.includes(time)) {

      alert(
        "Please select an available time."
      );


      return;

    }


    if (
      entries.length === 0
    ) {

      alert(
        "Add a service first."
      );


      return;

    }


    const originalButtonText =
      bookBtn.textContent;


    bookBtn.disabled =
      true;


    bookBtn.textContent =
      "Checking availability...";


    try {

      // =====================================================
      // FINAL AVAILABILITY CHECK
      // =====================================================

      const {
        data:
          existingBooking,

        error:
          checkError

      } =
        await supabaseClient
          .from("bookings")
          .select("id")
          .eq(
            "booking_date",
            date
          )
          .eq(
            "booking_time",
            time
          )
          .limit(1);


      if (checkError) {

        console.error(
          "Booking check failed:",
          checkError
        );


        alert(
          "We couldn't check that time. Please try again."
        );


        await loadTimeSlots();


        return;

      }


      if (
        existingBooking &&
        existingBooking.length > 0
      ) {

        alert(
          "Sorry, that time has just been booked. Please choose another time."
        );


        await loadTimeSlots();


        return;

      }


      // =====================================================
      // CREATE BOOKING
      // =====================================================

      const {
        error:
          insertError

      } =
        await supabaseClient
          .from("bookings")
          .insert({

            booking_date:
              date,

            booking_time:
              time

          });


      if (insertError) {

        console.error(
          "Booking insert failed:",
          insertError
        );


        if (
          insertError.code ===
          "23505"
        ) {

          alert(
            "Sorry, that time was just booked by someone else. Please choose another time."
          );

        } else {

          alert(
            "We couldn't complete the booking. Please try again."
          );

        }


        await loadTimeSlots();


        return;

      }


      // =====================================================
      // WHATSAPP SERVICES
      // =====================================================

      const services =
        entries
          .map(
            item =>
              `${item.service} (R${item.price})`
          )
          .join(", ");


      const total =
        entries.reduce(
          (
            sum,
            item
          ) =>
            sum +
            (
              Number(
                item.price
              ) || 0
            ),
          0
        );


      const message =
        encodeURIComponent(
`
Hi Jeff Cuts, I would like to book an appointment.

Date: ${date}
Time: ${time}
Services: ${services}
Total: R${total}
`
        );


      // =====================================================
      // OPEN WHATSAPP
      // =====================================================

      const whatsappURL =
        `https://wa.me/${barberNumber}?text=${message}`;


      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );


      // =====================================================
      // CLEAR CART
      // =====================================================

      entries = [];


      render();


      // =====================================================
      // REFRESH TIMES
      // =====================================================

      await loadTimeSlots();


      alert(
        "Your appointment has been reserved successfully!"
      );

    } catch (error) {

      console.error(
        "Unexpected booking error:",
        error
      );


      alert(
        "Something went wrong while booking. Please try again."
      );

    } finally {

      if (bookBtn) {

        bookBtn.disabled =
          !isShopOpen();


        bookBtn.textContent =
          isShopOpen()
            ? "Book Appointment"
            : "BOOKING CLOSED";

      }

    }

  }
);


// =========================================================
// START BOOKING SYSTEM
// =========================================================

loadCategories();

loadServices();

render();


resetTimeDropdown(
  "Select date first"
);


// =========================================================
// FULLSCREEN GALLERY
// =========================================================

const galleryCards =
  document.querySelectorAll(
    ".gallery-card"
  );


let galleryImages = [];

let galleryCurrentIndex =
  0;


// =========================================================
// GALLERY ELEMENTS
// =========================================================

let galleryViewer =
  document.getElementById(
    "galleryViewer"
  );

let galleryViewerImage =
  document.getElementById(
    "galleryViewerImage"
  );

let galleryClose =
  document.getElementById(
    "galleryClose"
  );

let galleryPrev =
  document.getElementById(
    "galleryPrev"
  );

let galleryNext =
  document.getElementById(
    "galleryNext"
  );

let galleryCounter =
  document.getElementById(
    "galleryViewerCounter"
  );


// =========================================================
// CREATE GALLERY VIEWER IF MISSING
// =========================================================

if (
  galleryCards.length &&
  !galleryViewer
) {

  const viewer =
    document.createElement(
      "div"
    );


  viewer.id =
    "galleryViewer";


  viewer.className =
    "gallery-viewer";


  viewer.setAttribute(
    "aria-hidden",
    "true"
  );


  viewer.innerHTML = `

    <button
      id="galleryClose"
      class="gallery-viewer-close"
      type="button"
      aria-label="Close gallery"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>

    <button
      id="galleryPrev"
      class="gallery-viewer-nav gallery-viewer-prev"
      type="button"
      aria-label="Previous image"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>

    <div class="gallery-viewer-content">

      <img
        id="galleryViewerImage"
        src=""
        alt="Jeff Cuts latest cut"
      >

      <span
        id="galleryViewerCounter"
        class="gallery-viewer-counter"
      >
        1 / 1
      </span>

    </div>

    <button
      id="galleryNext"
      class="gallery-viewer-nav gallery-viewer-next"
      type="button"
      aria-label="Next image"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>

  `;


  document.body.appendChild(
    viewer
  );


  galleryViewer =
    viewer;


  galleryViewerImage =
    document.getElementById(
      "galleryViewerImage"
    );


  galleryClose =
    document.getElementById(
      "galleryClose"
    );


  galleryPrev =
    document.getElementById(
      "galleryPrev"
    );


  galleryNext =
    document.getElementById(
      "galleryNext"
    );


  galleryCounter =
    document.getElementById(
      "galleryViewerCounter"
    );

}


// =========================================================
// COLLECT GALLERY IMAGES
// =========================================================

galleryCards.forEach(
  card => {

    const image =
      card.querySelector(
        "img"
      );


    if (!image) return;


    galleryImages.push({

      src:
        image.currentSrc ||
        image.src,

      alt:
        image.alt ||
        "Jeff Cuts latest cut"

    });

  }
);


// =========================================================
// SHOW GALLERY IMAGE
// =========================================================

function showGalleryImage(index) {

  if (
    !galleryImages.length
  ) {

    return;

  }


  galleryCurrentIndex =
    (
      index +
      galleryImages.length
    ) %
    galleryImages.length;


  const currentImage =
    galleryImages[
      galleryCurrentIndex
    ];


  if (galleryViewerImage) {

    galleryViewerImage.src =
      currentImage.src;


    galleryViewerImage.alt =
      currentImage.alt;

  }


  if (galleryCounter) {

    galleryCounter.textContent =
      `${galleryCurrentIndex + 1} / ${galleryImages.length}`;

  }

}


// =========================================================
// OPEN GALLERY
// =========================================================

function openGalleryViewer(index) {

  if (
    !galleryViewer ||
    !galleryImages.length
  ) {

    return;

  }


  showGalleryImage(
    index
  );


  galleryViewer.classList.add(
    "gallery-viewer-open"
  );


  galleryViewer.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "gallery-viewer-active"
  );

}


// =========================================================
// CLOSE GALLERY
// =========================================================

function closeGalleryViewer() {

  if (!galleryViewer) {
    return;
  }


  galleryViewer.classList.remove(
    "gallery-viewer-open"
  );


  galleryViewer.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "gallery-viewer-active"
  );

}


// =========================================================
// GALLERY CARD CLICK
// =========================================================

galleryCards.forEach(
  (card, index) => {

    card.addEventListener(
      "click",
      () => {

        openGalleryViewer(
          index
        );

      }
    );

  }
);


// =========================================================
// GALLERY PREVIOUS
// =========================================================

galleryPrev?.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    showGalleryImage(
      galleryCurrentIndex - 1
    );

  }
);


// =========================================================
// GALLERY NEXT
// =========================================================

galleryNext?.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    showGalleryImage(
      galleryCurrentIndex + 1
    );

  }
);


// =========================================================
// GALLERY CLOSE
// =========================================================

galleryClose?.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    closeGalleryViewer();

  }
);


// =========================================================
// GALLERY BACKGROUND CLOSE
// =========================================================

galleryViewer?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      galleryViewer
    ) {

      closeGalleryViewer();

    }

  }
);


// =========================================================
// KEYBOARD GALLERY CONTROLS
// =========================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      !galleryViewer ||
      !galleryViewer.classList.contains(
        "gallery-viewer-open"
      )
    ) {

      return;

    }


    if (
      event.key ===
      "Escape"
    ) {

      closeGalleryViewer();

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      showGalleryImage(
        galleryCurrentIndex - 1
      );

    }


    if (
      event.key ===
      "ArrowRight"
    ) {

      showGalleryImage(
        galleryCurrentIndex + 1
      );

    }

  }
);


// =========================================================
// MOBILE GALLERY SWIPE
// =========================================================

let galleryTouchStartX =
  0;


let galleryTouchEndX =
  0;


galleryViewer?.addEventListener(
  "touchstart",
  event => {

    if (
      !event.changedTouches.length
    ) {

      return;

    }


    galleryTouchStartX =
      event.changedTouches[0]
        .screenX;

  },
  {
    passive: true
  }
);


galleryViewer?.addEventListener(
  "touchend",
  event => {

    if (
      !event.changedTouches.length
    ) {

      return;

    }


    galleryTouchEndX =
      event.changedTouches[0]
        .screenX;


    const distance =
      galleryTouchEndX -
      galleryTouchStartX;


    if (
      Math.abs(distance) <
      50
    ) {

      return;

    }


    if (distance > 0) {

      showGalleryImage(
        galleryCurrentIndex - 1
      );

    } else {

      showGalleryImage(
        galleryCurrentIndex + 1
      );

    }

  },
  {
    passive: true
  }
);


// =========================================================
// FLOATING BOOK NOW
// =========================================================

const floatingBookBtn =
  document.getElementById(
    "floatingBookBtn"
  );


const bookingSection =
  document.getElementById(
    "booking"
  );


function updateFloatingBookButton() {

  if (!floatingBookBtn) {
    return;
  }


  const scrollPosition =
    window.scrollY;


  const heroThreshold =
    window.innerHeight *
    0.65;


  if (
    scrollPosition >
    heroThreshold
  ) {

    floatingBookBtn.classList.add(
      "floating-book-visible"
    );

  } else {

    floatingBookBtn.classList.remove(
      "floating-book-visible"
    );

  }


  if (bookingSection) {

    const rect =
      bookingSection.getBoundingClientRect();


    if (
      rect.top <
      window.innerHeight *
      0.75
    ) {

      floatingBookBtn.classList.remove(
        "floating-book-visible"
      );

    }

  }

}


window.addEventListener(
  "scroll",
  updateFloatingBookButton,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateFloatingBookButton
);


updateFloatingBookButton();


// =========================================================
// SECTION REVEAL ANIMATIONS
// =========================================================

const animatedSections =
  document.querySelectorAll(
    ".gallery-showcase, .booking-heading, .booking-form, .stats, #leave-review, .payment-section, .footer"
  );


if (
  "IntersectionObserver"
  in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "section-visible"
              );


              sectionObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.1
      }
    );


  animatedSections.forEach(
    section => {

      sectionObserver.observe(
        section
      );

    }
  );

} else {

  animatedSections.forEach(
    section => {

      section.classList.add(
        "section-visible"
      );

    }
  );

}


// =========================================================
// FINAL INITIALIZATION
// =========================================================

updateJeffCutsStatus();

updateLiveDateTime();

render();

console.log(
  "Jeff Cuts website loaded successfully."
);
