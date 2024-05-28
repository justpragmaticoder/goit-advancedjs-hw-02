function handleSubmit(event, delayElem, stepElem, amountElem) {
  event.preventDefault();

  let delay = Number(delayElem.value);
  let step = Number(stepElem.value);
  let amount = Number(amountElem.value);
  let position = 0;

  if (delay < 0 || step < 0 || amount <= 0) {
    window.alert(`Please enter a correct value`);
  }

  for (let i = 1; i <= amount; i += 1) {
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldBeResolved = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldBeResolved) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

(() => {
  const form = document.querySelector(".form");
  const delayElem = document.querySelector('input[name="delay"]');
  const stepElem = document.querySelector('input[name="step"]');
  const amountElem = document.querySelector('input[name="amount"]');

  form.addEventListener("submit", (event) =>
    handleSubmit(event, delayElem, stepElem, amountElem)
  );
})();
