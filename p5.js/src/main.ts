const body = document.getElementById('body');

body?.addEventListener('keydown', (event: KeyboardEvent) => {
  console.log(event.key);
});
