// функционал для раздела "Вопросы"
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.closest('.faq-item').classList.toggle('open');
  });
});

// Эффект раскрытия как в разделе "Вопросы"
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});

