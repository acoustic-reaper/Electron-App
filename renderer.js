// Configuring front-end and changing username on button click
document.getElementById("editusername").addEventListener("click", () => {
  window.electronAPI.set_data('editusername');
});

// Configuring front-end and changing access code on button click
document.getElementById("editaccesscode").addEventListener("click", () => {
    window.electronAPI.set_data('editaccesscode');
});

// Refreshing data on front-end
window.electronAPI.refresh();

// Displaying user data on front-end
window.electronAPI.display_data((e, data1, data2) =>{
document.getElementById('field1').innerText = data1;
document.getElementById('field2').innerText = data2;
})