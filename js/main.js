const getElement = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }
  if (attributes) {
    for (const attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
  }
  return element;
};

const createHeader = ({ title, header: { logo, menu, social } }) => {
  const header = getElement("header");
  const container = getElement("div", ["container"]);
  const wrapper = getElement("div", ["header"]);
  if (logo) {
    const logoElem = getElement("img", ["logo"], {
      src: logo,
      alt: "Логотип " + title,
    });
    wrapper.append(logoElem);
  }
  if (menu) {
    const nav = getElement("nav", ["menu-list"]);
    const allMenuLink = menu.map((item) => {
      const link = getElement("a", ["menu-link"], {
        href: item.link,
        textContent: item.title,
      });
      return link;
    });
    nav.append(...allMenuLink);
    wrapper.append(nav);
    const menuBtn = getElement("button", ["menu-button"]);
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("menu-button-active");
      wrapper.classList.toggle("header-active");
    });
    container.append(menuBtn);
  }
  if (social) {
    const socialWrapper = getElement("div", ["social"]);
    const allSocial = social.map((item) => {
      const socialLink = getElement("a", ["social-link"], {
        target: "_blank",
      });
      socialLink.append(
        getElement("img", null, {
          src: item.image,
          alt: item.title,
        })
      );
      socialLink.href = item.link;
      return socialLink;
    });
    socialWrapper.append(...allSocial);
    wrapper.append(socialWrapper);
  }
  header.append(container);
  container.append(wrapper);
  return header;
};

const createMain = ({
  title,
  main: { genre, rating, description, trailer, slider },
}) => {
  const main = getElement("main");
  const container = getElement("div", ["container"]);
  main.append(container);
  const wrapper = getElement("div", ["main-content"]);
  container.append(wrapper);
  const content = getElement("div", ["content"]);
  wrapper.append(content);
  if (genre) {
    const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
      textContent: genre,
    });
    content.append(genreSpan);
  }
  if (rating) {
    const ratingBlock = getElement("div", [
      "rating",
      "animated",
      "fadeInRight",
    ]);
    const ratingStars = getElement("div", ["rating-stars"]);
    const ratingNumber = getElement("div", ["rating-number"], {
      textContent: `${rating}/10`,
    });
    for (let i = 0; i < 10; i++) {
      const star = getElement("img", ["star"], {
        alt: i ? "" : `Рейтинг ${rating} из 10`,
        src: i < rating ? "img/star.svg" : "img/star-o.svg",
      });
      ratingStars.append(star);
    }
    ratingBlock.append(ratingStars, ratingNumber);
    content.append(ratingBlock);
  }
  content.append(
    getElement("h1", ["main-title", "animated", "fadeInRight"], {
      textContent: title,
    })
  );
  if (description) {
    const descriptionElem = getElement(
      "p",
      ["main-description", "animated", "fadeInRight"],
      {
        textContent: description,
      }
    );
    content.append(descriptionElem);
  }
  if (trailer) {
    const youtubeLink = getElement(
      "a",
      ["button", "animated", "fadeInRight", "youtube-modal"],
      {
        href: trailer,
        textContent: "Смотреть трейлер",
      }
    );
    const youtubeImgLink = getElement("a", ["play", "youtube-modal"], {
      href: trailer,
      ariaLabel: "Смотреть трейлер",
    });
    const iconPlay = getElement("img", ["paly-img"], {
      src: "img/play.svg",
      ariaHidden: true,
    });
    content.append(youtubeLink);
    youtubeImgLink.append(iconPlay);
    wrapper.append(youtubeImgLink);
  }
  if (slider) {
    const sliderBlock = getElement("div", ["series"]);
    const swiperBlock = getElement("div", ["swiper-container"]);
    const swiperWrapper = getElement("div", ["swiper-wrapper"]);
    const arrow = getElement("button", ["arrow"]);

    const slides = slider.map((item) => {
      const swiperSlide = getElement("div", ["swiper-slide"]);
      const card = getElement("figure", ["card"]);
      const cardImage = getElement("img", ["card-img"], {
        src: item.img,
        alt: ((item.subtitle || "") + " " + (item.title || "")).trim(),
        // alt: ((item.subtitle ? item.subtitle : '') + ' ' +
        //   (item.title ? item.title : '')).trim(),
      });
      card.append(cardImage);
      if (item.title || item.subtitle) {
        const cardDescription = getElement("figcaption", ["card-description"]);
        cardDescription.innerHTML = `
          ${
            item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ""
          }
          ${item.title ? `<p class="card-subtitle">${item.title}</p>` : ""}
        `;
        card.append(cardDescription);
      }
      swiperSlide.append(card);
      return swiperSlide;
    });
    swiperWrapper.append(...slides);
    swiperBlock.append(swiperWrapper);
    sliderBlock.append(swiperBlock, arrow);

    container.append(sliderBlock);
    // eslint-disable-next-line no-undef
    new Swiper(swiperBlock, {
      loop: true,
      navigation: {
        nextEl: arrow,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        541: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  }
  return main;
};

const createFooter = ({ footer: { copyright, footerNav } }) => {
  const footer = getElement("footer", ["footer"]);
  const container = getElement("div", ["container"]);
  const footerContent = getElement("div", ["footer-content"]);
  const left = getElement("div", ["left"]);
  const span = getElement("span", ["copyright"], {
    textContent: copyright,
  });
  left.append(span);
  const right = getElement("div", ["right"]);
  const footerMenu = getElement("nav", ["footer-menu"]);
  const allMenuLink = footerNav.map((item) => {
    const link = getElement("a", ["footer-link"], {
      href: item.link,
      textContent: item.title,
    });
    return link;
  });
  footerMenu.append(...allMenuLink);
  right.append(footerMenu);
  footerContent.append(left, right);
  container.append(footerContent);
  footer.append(container);
  return footer;
};

const movieConstructor = (selector, options) => {
  const app = document.querySelector(selector);
  app.classList.add("body-app");
  app.style.backgroundImage = options.background
    ? `url(${options.background})`
    : "";
  document.title = options.title;
  app.style.color = options.fontColor || "";
  app.style.backgroundColor = options.backgroundColor || "";
  if (options.subColor) {
    document.documentElement.style.setProperty("--sub-color", options.subColor);
  }
  if (options.favicon) {
    const index = options.favicon.lastIndexOf(".");
    const type = options.favicon.substring(index + 1);
    const favicon = getElement("link", null, {
      rel: "icon",
      href: options.favicon,
      type: "image/" + (type === "svg" ? "svg+xml" : type),
    });
    document.head.append(favicon);
  }
  if (options.header) {
    app.append(createHeader(options));
  }
  if (options.main) {
    app.append(createMain(options));
  }
  if (options.footer) {
    app.append(createFooter(options));
  }
};

movieConstructor(".app", {
  /* eslint-disable indent */
  title: "Локи",
  background: "loki/background.jpg",
  favicon: "loki/favicon.png",
  fontColor: "#ffffff",
  backgroundColor: "#141218",
  subColor: "#014206",
  header: {
    logo: "loki/logo.png",
    social: [
      {
        title: "Twitter",
        link: "https://twitter.com",
        image: "loki/social/twitter.svg",
      },
      {
        title: "Instagram",
        link: "https://instagram.com",
        image: "loki/social/instagram.svg",
      },
      {
        title: "Facebook",
        link: "https://facebook.com",
        image: "loki/social/facebook.svg",
      },
    ],
    menu: [
      {
        title: "Описание",
        link: "#",
      },
      {
        title: "Трейлер",
        link: "#",
      },
      {
        title: "Отзывы",
        link: "#",
      },
    ],
  },
  main: {
    genre: "2021, фантастика, фэнтези, боевик, приключения",
    rating: "8",
    description: `Локи попадает в таинственную организацию «Управление временными изменениями» после того,
    как он украл Тессеракт, и путешествует во времени, меняя историю.`,
    trailer: "https://youtu.be/YrjHcYqe31g",
    slider: [
      {
        img: "loki/series/series-1.jpg",
        title: "Славная миссия",
        subtitle: "Серия №1",
      },
      {
        img: "loki/series/series-2.jpg",
        title: "Вариант",
        subtitle: "Серия №2",
      },
      {
        img: "loki/series/series-3.jpg",
        title: "Ламентис",
        subtitle: "Серия №3",
      },
      {
        img: "loki/series/series-4.jpg",
        title: "Смежное событие",
        subtitle: "Серия №4",
      },
      {
        img: "loki/series/series-5.jpg",
        title: "Путешествие в неизвестность",
        subtitle: "Серия №5",
      },
      {
        img: "loki/series/series-6.jpg",
        title: "На все времена. Всегда",
        subtitle: "Серия №6",
      },
    ],
  },
  footer: {
    copyright: "© 2020 The Loki. All right reserved.",
    footerNav: [
      {
        title: "Privacy Policy",
        link: "#",
      },
      {
        title: "Terms of Service",
        link: "#",
      },
      {
        title: "Legal",
        link: "#",
      },
    ],
  },
});
