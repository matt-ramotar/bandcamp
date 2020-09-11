document.addEventListener('DOMContentLoaded', e => {
  const tableBody = document.querySelector(tbody);
  tableBody.addEventListener('click', e => {
    console.log(e.target, 'clicked');
  });
});
