/* =========================================================
   BAGAS PORTFOLIO
   Interactive JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const navbar =
        document.querySelector(".navbar");

    const progressBar =
        document.querySelector(".scroll-progress");

    const loader =
        document.querySelector(".page-loader");

    const revealElements =
        document.querySelectorAll(".reveal");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section[id]");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    const magneticElements =
        document.querySelectorAll(".magnetic");

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorOutline =
        document.querySelector(".cursor-outline");

    const parallaxElement =
        document.querySelector("[data-parallax]");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader?.classList.add("loaded");

            document
                .querySelectorAll(".hero .reveal")
                .forEach((element) => {

                    element.classList.add("visible");

                });

        }, 700);

    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (progressBar) {

            progressBar.style.width =
                `${progress}%`;

        }

    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );


                activeLink?.classList.add("active");

            }

        });

    }


    /* =====================================================
       SCROLL EVENT
    ===================================================== */

    function handleScroll() {

        updateScrollProgress();

        updateNavbar();

        updateActiveNavigation();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();


    /* =====================================================
       INTERSECTION OBSERVER
       Reveal elements
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach((element) => {

        /*
         * Hero elements are triggered
         * by page loader.
         */
        if (
            element.closest(".hero") &&
            !loader?.classList.contains("loaded")
        ) {

            return;

        }

        revealObserver.observe(element);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        menuToggle?.classList.remove("active");

        mobileMenu?.classList.remove("open");

        body.classList.remove("menu-open");

    }


    menuToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                menuToggle.classList.toggle(
                    "active"
                );


            mobileMenu?.classList.toggle(
                "open",
                isOpen
            );


            body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
       Native smooth scroll is enabled,
       but this adds offset for fixed navbar.
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const navbarHeight =
                        navbar?.offsetHeight || 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        navbarHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorSupported =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursorSupported &&
        cursorDot &&
        cursorOutline
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            outlineX +=
                (mouseX - outlineX)
                * 0.14;

            outlineY +=
                (mouseY - outlineY)
                * 0.14;


            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .work-card, .about-card"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    } else {

        cursorDot?.remove();

        cursorOutline?.remove();

    }


    /* =====================================================
       MAGNETIC BUTTON
    ===================================================== */

    if (cursorSupported) {

        magneticElements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX
                            -
                            rect.left
                            -
                            rect.width / 2;


                        const y =
                            event.clientY
                            -
                            rect.top
                            -
                            rect.height / 2;


                        const strength = 0.18;


                        element.style.transform =
                            `translate(
                                ${x * strength}px,
                                ${y * strength}px
                            )`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       HERO IMAGE PARALLAX
    ===================================================== */

    if (
        parallaxElement &&
        cursorSupported
    ) {

        const visual =
            document.querySelector(
                ".hero-visual"
            );


        visual?.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                const rotateX =
                    y * -5;

                const rotateY =
                    x * 5;


                parallaxElement.style.transform =
                    `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(10px)
                    `;

            }
        );


        visual?.addEventListener(
            "mouseleave",
            () => {

                parallaxElement.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       3D TILT FOR ABOUT CARDS
    ===================================================== */

    if (cursorSupported) {

        const cards =
            document.querySelectorAll(
                ".about-card"
            );


        cards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        ((x / rect.width) - .5)
                        * 5;


                    const rotateX =
                        ((y / rect.height) - .5)
                        * -5;


                    card.style.transform =
                        `
                        translateY(-7px)
                        perspective(700px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       WORK CARD MOUSE GLOW
    ===================================================== */

    if (cursorSupported) {

        const workCards =
            document.querySelectorAll(
                ".work-card"
            );


        workCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateScrollProgress();

    updateNavbar();

});

/* =========================================================
   TYPING ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const text = "Hi, I'm Sandrianto Siregar.";

        let index = 0;

        const typingSpeed = 100;

        function typeText() {

            if (index < text.length) {

                typingText.textContent += text.charAt(index);

                index++;

                setTimeout(typeText, typingSpeed);

            }

        }

        /* Delay sedikit supaya page loader selesai */

        setTimeout(() => {

            typeText();

        }, 900);

    }

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop = document.getElementById("backToTop");


if (backToTop) {

    /* Show / Hide button */

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        },
        {
            passive: true
        }
    );


    /* Scroll to top */

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}
