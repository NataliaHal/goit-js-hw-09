import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };

      if (shouldResolve) {
        Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        resolve(result);
      } else {
        Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delay}ms`);
        reject(result);
      }
    }, delay);

    // add the timerId to the result object
    return { ...result, timerId };
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  // create an array of promises
  const promises = Array.from({ length: amount }, (_, i) =>
    createPromise(i + 1, delay + step * i)
  );

  Promise.all(promises)
    .then(() => {
      Notiflix.Notify.Success(`✅ All promises were fulfilled!`);
    })
    .catch(() => {
      Notiflix.Notify.Failure(`❌ At least one promise was rejected.`);
    });
});