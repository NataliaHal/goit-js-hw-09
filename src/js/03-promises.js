import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const submitBtn = form.querySelector('button[type="submit"]');


form.addEventListener('submit', evt => {
  evt.preventDefault();
  submitBtn.setAttribute('disabled', '');

 const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  if (
    formValidation(
      Number(amount.value),
      Number(step.value),
      Number(delay.value)
     )
  ) {
    submitBtn.removeAttribute('disabled');

    return;
  }

  let currentDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, currentDelay)
      .then(value => Notify.success(value))
      .catch(error => Notify.failure(error))
      .finally(() => {
        if (Number(amount.value) === i) {
          submitBtn.removeAttribute('disabled');
        }
      });

    currentDelay += Number(step.value);
  }
});

function formValidation(delay, step, amount) {
  if (delay < 0 || step < 0 || amount < 0) {
    Notify.failure('Negative numbers are invalid.');
    return true;
  }

  if (!amount) {
    Notify.failure('Create at least one promise.');
    return true;
  }

  return false;
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldRes = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldRes) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

