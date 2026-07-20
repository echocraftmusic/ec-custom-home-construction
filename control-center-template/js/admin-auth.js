/* ==========================================
   ECHO CRAFT CONTROL CENTER
   ADMIN AUTHENTICATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#adminLoginForm");
    const emailInput = document.querySelector("#adminEmail");
    const passwordInput = document.querySelector("#adminPassword");

    const emailError = document.querySelector("#adminEmailError");
    const passwordError = document.querySelector("#adminPasswordError");

    const loginAlert = document.querySelector("#loginAlert");
    const loginAlertMessage = document.querySelector("#loginAlertMessage");

    const loginButton = document.querySelector("#adminLoginButton");
    const togglePasswordButton = document.querySelector(
        "#togglePasswordButton"
    );

    const forgotPasswordButton = document.querySelector(
        "#forgotPasswordButton"
    );

    const currentYear = document.querySelector("#currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ======================================
       HELPERS
    ====================================== */

    const showAlert = (message) => {

        if (!loginAlert || !loginAlertMessage) {
            return;
        }

        loginAlertMessage.textContent = message;
        loginAlert.hidden = false;

    };

    const hideAlert = () => {

        if (!loginAlert) {
            return;
        }

        loginAlert.hidden = true;

    };

    const setLoadingState = (isLoading) => {

        if (!loginButton) {
            return;
        }

        loginButton.disabled = isLoading;
        loginButton.classList.toggle("isLoading", isLoading);

    };

    const clearFieldErrors = () => {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

    };

    const isValidEmail = (email) => {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    };


    /* ======================================
       PASSWORD VISIBILITY
    ====================================== */

    if (togglePasswordButton && passwordInput) {

        togglePasswordButton.addEventListener("click", () => {

            const passwordIsHidden =
                passwordInput.type === "password";

            passwordInput.type =
                passwordIsHidden
                    ? "text"
                    : "password";

            togglePasswordButton.setAttribute(
                "aria-pressed",
                String(passwordIsHidden)
            );

            togglePasswordButton.setAttribute(
                "aria-label",
                passwordIsHidden
                    ? "Hide password"
                    : "Show password"
            );

            const icon =
                togglePasswordButton.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-eye",
                    !passwordIsHidden
                );

                icon.classList.toggle(
                    "fa-eye-slash",
                    passwordIsHidden
                );

            }

            passwordInput.focus();

        });

    }


    /* ======================================
       FORGOT PASSWORD
    ====================================== */

    if (forgotPasswordButton) {

        forgotPasswordButton.addEventListener("click", () => {

            hideAlert();
            clearFieldErrors();

            const enteredEmail =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            if (!enteredEmail) {

                if (emailError) {

                    emailError.textContent =
                        "Enter your administrator email first.";

                }

                if (emailInput) {
                    emailInput.focus();
                }

                return;

            }

            if (!isValidEmail(enteredEmail)) {

                if (emailError) {

                    emailError.textContent =
                        "Enter a valid email address.";

                }

                if (emailInput) {
                    emailInput.focus();
                }

                return;

            }

            showAlert(
                "Password recovery will be activated when secure authentication is connected."
            );

        });

    }


    /* ======================================
       LIVE FIELD CLEANUP
    ====================================== */

    if (emailInput) {

        emailInput.addEventListener("input", () => {

            if (emailError) {
                emailError.textContent = "";
            }

            hideAlert();

        });

    }

    if (passwordInput) {

        passwordInput.addEventListener("input", () => {

            if (passwordError) {
                passwordError.textContent = "";
            }

            hideAlert();

        });

    }


    /* ======================================
       FORM VALIDATION
    ====================================== */

    const validateForm = () => {

        clearFieldErrors();
        hideAlert();

        let isValid = true;

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value
                : "";

        if (!email) {

            if (emailError) {

                emailError.textContent =
                    "Administrator email is required.";

            }

            isValid = false;

        } else if (!isValidEmail(email)) {

            if (emailError) {

                emailError.textContent =
                    "Enter a valid administrator email.";

            }

            isValid = false;

        }

        if (!password) {

            if (passwordError) {

                passwordError.textContent =
                    "Password is required.";

            }

            isValid = false;

        } else if (password.length < 8) {

            if (passwordError) {

                passwordError.textContent =
                    "Password must contain at least 8 characters.";

            }

            isValid = false;

        }

        if (!isValid) {

            if (!email && emailInput) {

                emailInput.focus();

            } else if (
                email &&
                !isValidEmail(email) &&
                emailInput
            ) {

                emailInput.focus();

            } else if (passwordInput) {

                passwordInput.focus();

            }

        }

        return {
            isValid,
            email,
            password
        };

    };


    /* ======================================
       TEMPORARY LOGIN BEHAVIOR
    ====================================== */

    if (form) {

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            const validation = validateForm();

            if (!validation.isValid) {
                return;
            }

            setLoadingState(true);

            try {

                /*
                 * Temporary development behavior.
                 *
                 * Real authentication will replace this
                 * section when Supabase is connected.
                 */

                await new Promise((resolve) => {

                    window.setTimeout(resolve, 900);

                });

                showAlert(
                    "The login design is working. Secure administrator authentication has not been connected yet."
                );

            } catch (error) {

                console.error(
                    "Control Center login error:",
                    error
                );

                showAlert(
                    "Unable to process the login request. Please try again."
                );

            } finally {

                setLoadingState(false);

            }

        });

    }

});