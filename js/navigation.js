/* =========================================================
   EC CUSTOM HOME CONSTRUCTION
   MOBILE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const mobileLinks = document.querySelectorAll(".mobile-navigation a");

    if (!menuToggle || !mobileNavigation) {
        return;
    }

    const openMenu = () => {
        menuToggle.classList.add("is-open");
        mobileNavigation.classList.add("is-open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
    };

    const closeMenu = () => {
        menuToggle.classList.remove("is-open");
        mobileNavigation.classList.remove("is-open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    };

    const toggleMenu = () => {
        const isOpen = mobileNavigation.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (!mobileNavigation.classList.contains("is-open")) {
            return;
        }

        const clickedInsideMenu = mobileNavigation.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
});