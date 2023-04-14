document.getElementById('shutdown-btn').addEventListener('click', async () => {
  await window.shutdown.shutdown()
})

document.querySelector('#changegreeting').addEventListener('click', ()=>{
  document.querySelector('.greeting').innerHTML = "Hello Duniya";
})