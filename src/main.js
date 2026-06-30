import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const burger = document.getElementById('burgerButton');
const menu = document.getElementById('mobileMenu');
const form = document.forms[0];
const events = document.getElementById('events');
const slides = document.getElementById('reviews');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

burger.addEventListener('click', () => {
  menu.classList.toggle('navigation__mobile-menu--active');
  burger.classList.toggle('navigation__mobile-menu--active');
});

new AirDatepicker('#start', {
  autoClose: true,
  dateFormat: 'dd.MM.yyyy',
});

new AirDatepicker('#end', {
  autoClose: true,
  dateFormat: 'dd.MM.yyyy',
});

const reviewsArray = [
  {
    img: 'photo.svg',
    name: 'Марина',
    city: 'Санкт-Петербург',
    date: '11-Июня-2026',
    rating: 4,
    text: 'Поездка очень понравилась! Усадьба Огинского, которого знают все, но о нем знают меньше. Быт белорусской усадьбы атмосфере. Три очень интересных костела, православный храм. Гид Юрий рассказывал интересно, видна любовь к родному краю, что всегда вдохновляет. Три очень интересных костела, православный храм.',
  },
  {
    img: 'photo.svg',
    name: 'Марина',
    city: 'Санкт-Петербург',
    date: '11-Июня-2026',
    rating: 4,
    text: 'Поездка очень понравилась! Усадьба Огинского, которого знают все, но о нем знают меньше. Быт белорусской усадьбы атмосфере. Три очень интересных костела, православный храм. ',
  },
  {
    img: 'photo.svg',
    name: 'Марина',
    city: 'Санкт-Петербург',
    date: '11-Июня-2026',
    rating: 5,
    text: 'Супер!',
  },
  {
    img: 'photo.svg',
    name: 'Марина',
    city: 'Санкт-Петербург',
    date: '11-Июня-2026',
    rating: 5,
    text: 'Понравилось',
  },
];

const eventsArray = [
  {
    date: '18.06.2026',
    day: 'чт.',
    start: '18:00',
    duration: '4 ч. 15 мин.',
    availability: 0,
    adultPrice: '60.00 BYN',
    childrenPrice: '55.00 BYN',
  },
  {
    date: '25.07.2026',
    day: 'чт.',
    start: '18:00',
    duration: '4 ч. 15 мин.',
    availability: 2,
    adultPrice: '60.00 BYN',
    childrenPrice: '55.00 BYN',
  },
  {
    date: '25.06.2026',
    day: 'чт.',
    start: '18:00',
    duration: '4 ч. 15 мин.',
    availability: 2,
    adultPrice: '60.00 BYN',
    childrenPrice: '55.00 BYN',
  },
  {
    date: '30.06.2026',
    day: 'чт.',
    start: '18:00',
    duration: '4 ч. 15 мин.',
    availability: 2,
    adultPrice: '60.00 BYN',
    childrenPrice: '55.00 BYN',
  },
  {
    date: '27.06.2026',
    day: 'чт.',
    start: '18:00',
    duration: '4 ч. 15 мин.',
    availability: 2,
    adultPrice: '60.00 BYN',
    childrenPrice: '55.00 BYN',
  },
];

let eventsArrayFiltered = [];

function getNumberOfStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<img src="star-active.svg"/>';
    } else {
      stars += '<img src="star-inactive.svg"/>';
    }
  }
  return stars;
}

slides.innerHTML = reviewsArray
  .map(
    (review) => `<div class="review-card">
            <img class="review-card__img" src="${review.img}" />
            <div class ="review-card__main">
              <div>
                <div class="review-card__header">
                  <h3 class="review-card__title">${review.name}, <span class="review-card__city">${review.city}</span></h3>
                  <div class="review-card__date">${review.date}</div>
                </div>
                <div class="review-card__rating">${getNumberOfStars(review.rating)}</div>
              </div>
              <p class="review-card__text">
              ${review.text}
              </p>
            </div>
          </div>`,
  )
  .join('');

const reviews = document.querySelectorAll('.review-card');

let currentSlide = 0;

function showSlide(index) {
  if (window.innerWidth < 768) {
    if (index < 0) {
      currentSlide = reviews.length - 1;
    } else if (index >= reviews.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides.style.transform = `translateX(-${currentSlide * 25}%)`;
  } else {
    if (index < 0) {
      currentSlide = (reviews.length - 2) / 2;
    } else if (index >= reviews.length - 2) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides.style.transform = `translateX(-${currentSlide * 50}%)`;
  }
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

document.querySelectorAll('.review-card').forEach((review) => {
  const reviewText = review.querySelector('.review-card__text');

  if (reviewText.scrollHeight > reviewText.clientHeight) {
    const reviewBtn = document.createElement('button');
    reviewBtn.className = 'review-card__button';
    reviewBtn.textContent = 'далее...';
    review.querySelector('.review-card__main').append(reviewBtn);

    reviewBtn.addEventListener('click', () => {
      reviewText.classList.toggle('open');
      reviewBtn.textContent = reviewText.classList.contains('open')
        ? 'свернуть'
        : 'далее...';
    });
  }
});

const timetableBtn = document.getElementById('timetable-button');
timetableBtn.addEventListener('click', () => {
  const timetable = document.getElementById('timetable');
  window.scrollTo({
    top: timetable.getBoundingClientRect().top + window.scrollY - 80,
    behavior: 'smooth',
  });
});

events.innerHTML = eventsArray
  .sort((a, b) => processDate(a.date) - processDate(b.date))
  .map((event) => {
    if (event.availability < 1) {
      return `<div class="event-card">
              <div class="event-card__left">
                <div class="event-card__date event-card--inactive">${event.date} (${event.day})</div>
                <div class="event-card__text event-card--inactive">Начало: ${event.start} ~ ${event.duration}</div>
                <div class="event-card__text event-card--inactive">Нет мест</div>
              </div>
              <div class="event-card__right">
              <div class="event-card__price event-card--inactive">${event.adultPrice} / ${event.childrenPrice}</div>
              </div>
            </div>
          </div>`;
    } else {
      return `<div class="event-card">
              <div class="event-card__left">
                <div class="event-card__date">${event.date}</div>
                <div class="event-card__text">Начало: ${event.start} ~ ${event.duration}</div>
                <div class="event-card__text">Осталось мест: ${event.availability}</div>
              </div>
              <div class="event-card__right">
              <div class="event-card__price">${event.adultPrice} / ${event.childrenPrice}</div>
              <button class="event-card__button">Бронировать</button>
              </div>
            </div>
          </div>`;
    }
  })
  .join('');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  eventsArrayFiltered = eventsArray.filter((event) => {
    if (!form.elements.start.value && !form.elements.end.value) {
      console.log(eventsArray);
      return (
        event.availability >=
        Number(form.elements.adults.value) +
          Number(form.elements.children.value)
      );
    }
    if (!form.elements.start.value && form.elements.end.value) {
      return (
        processDate(event.date) <= processDate(form.elements.end.value) &&
        event.availability >=
          Number(form.elements.adults.value) +
            Number(form.elements.children.value)
      );
    }
    if (form.elements.start.value && !form.elements.end.value) {
      return (
        processDate(event.date) >= processDate(form.elements.start.value) &&
        event.availability >=
          Number(form.elements.adults.value) +
            Number(form.elements.children.value)
      );
    }
    return (
      processDate(event.date) >= processDate(form.elements.start.value) &&
      processDate(event.date) <= processDate(form.elements.end.value) &&
      event.availability >=
        Number(form.elements.adults.value) +
          Number(form.elements.children.value)
    );
  });

  if (eventsArrayFiltered.length === 0) {
    events.innerHTML =
      '<div class="event-cards__nothing-found">Ничего не найдено</div>';
    return;
  }
  events.innerHTML = eventsArrayFiltered
    .sort((a, b) => processDate(a.date) - processDate(b.date))
    .map((event) => {
      return `<div class="event-card">
              <div class="event-card__left">
                <div class="event-card__date">${event.date}</div>
                <div class="event-card__text">Начало: ${event.start} ~ ${event.duration}</div>
                <div class="event-card__text">Осталось мест: ${event.availability}</div>
              </div>
              <div class="event-card__right">
              <div class="event-card__price">${event.adultPrice} / ${event.childrenPrice}</div>
              <button class="event-card__button">Бронировать</button>
              </div>
            </div>
          </div>`;
    })
    .join('');
});

function processDate(dateString) {
  const [day, month, year] = dateString.split('.');

  const date = new Date(year, month - 1, day);

  return date;
}
