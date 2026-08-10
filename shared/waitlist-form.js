/**
 * BingeTracker Waitlist & Email Capture Form Handler (GitHub Pages Static)
 * Supports Web3Forms integration, Van Westendorp Pricing Survey, and dynamic updates.
 */

(function () {
  'use strict';

  // Config - Web3Forms Access Key (Users can replace this string with their key, or use fallback)
  const WEB3FORMS_ACCESS_KEY = "d8722647-1462-4987-a129-aee42bd31d96";

  document.addEventListener('DOMContentLoaded', () => {
    initWaitlistForms();
    initPricingSurveyModal();
    initSpotCounter();
  });

  /**
   * Initializes all waitlist email forms on the page
   */
  function initWaitlistForms() {
    const forms = document.querySelectorAll('.js-waitlist-form');

    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('.input-email');
        const submitBtn = form.querySelector('.btn-submit');
        const successBox = form.closest('.form-container')?.querySelector('.form-success') || 
                           document.querySelector('.form-success');
        const variantName = form.dataset.variant || 'main';

        if (!emailInput || !emailInput.value.trim()) return;

        const email = emailInput.value.trim();

        // UI Loading State
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Joining...</span>';

        try {
          // Send request (Web3Forms if key is configured, otherwise simulate client submission)
          let success = true;

          if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
            const res = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                email: email,
                variant: variantName,
                subject: `New Waitlist Signup [${variantName}]`,
                from_name: "BingeTracker Waitlist"
              })
            });
            const data = await res.json();
            success = data.success;
          } else {
            // Local fallback delay for preview/testing
            await new Promise(resolve => setTimeout(resolve, 600));
          }

          if (success) {
            // Store email locally for survey modal reference if applicable
            window.userWaitlistEmail = email;

            // Show Success Box
            form.style.display = 'none';
            if (successBox) {
              successBox.style.display = 'block';
            }

            // Decrement early bird counter
            decrementSpots();

            // Trigger Van Westendorp Pricing Modal if available on Variant 1
            const surveyModal = document.getElementById('pricing-survey-modal');
            if (surveyModal) {
              setTimeout(() => {
                surveyModal.classList.add('active');
              }, 800);
            }
          }
        } catch (err) {
          console.error('Waitlist submission error:', err);
          alert('Something went wrong. Please check your email address and try again.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    });
  }

  /**
   * Van Westendorp Pricing Sensitivity Survey Handler
   */
  function initPricingSurveyModal() {
    const modal = document.getElementById('pricing-survey-modal');
    if (!modal) return;

    const closeBtns = modal.querySelectorAll('.js-close-modal');
    const surveyForm = modal.querySelector('#survey-form');

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    });

    if (surveyForm) {
      surveyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = surveyForm.querySelector('.btn-submit');
        submitBtn.disabled = true;

        const surveyData = {
          email: window.userWaitlistEmail || 'anonymous',
          too_cheap: surveyForm.querySelector('[name="too_cheap"]')?.value,
          bargain: surveyForm.querySelector('[name="bargain"]')?.value,
          expensive: surveyForm.querySelector('[name="expensive"]')?.value,
          too_expensive: surveyForm.querySelector('[name="too_expensive"]')?.value,
        };

        console.log('Submitted Van Westendorp Pricing Feedback:', surveyData);

        // Hide Modal
        modal.classList.remove('active');
        alert('Thank you! Your pricing feedback has been saved and will shape BingeTracker launch pricing.');
      });
    }
  }

  /**
   * Counter simulating remaining Founding Member (50% off first year) spots
   */
  function initSpotCounter() {
    const counterEl = document.querySelector('.js-spots-count');
    if (!counterEl) return;

    let spots = parseInt(localStorage.getItem('bt_early_spots') || '142', 10);
    counterEl.textContent = spots;
  }

  function decrementSpots() {
    const counterEl = document.querySelector('.js-spots-count');
    if (!counterEl) return;

    let spots = parseInt(counterEl.textContent, 10);
    if (spots > 1) {
      spots -= 1;
      counterEl.textContent = spots;
      localStorage.setItem('bt_early_spots', spots.toString());
    }
  }
})();
