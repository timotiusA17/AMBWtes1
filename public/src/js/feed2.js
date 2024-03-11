var sharedMomentsArea = document.querySelector('#detail-container');
const urlParams = new URLSearchParams(window.location.search);

// Mendapatkan nilai parameter dengan nama tertentu
const parameterValue = urlParams.get('id');

// Cek jika parameterValue tidak null atau undefined
if (parameterValue !== null) {
  console.log('Nilai dari parameter "nama_parameter" adalah:', parameterValue);
} else {
  console.log('Parameter "nama_parameter" tidak ditemukan.');
}
function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function createCard(data) {
  var judul = document.createElement('div')
  judul.innerHTML = `<h1  style="color: white;">${data.nama}</h1>`

  var gambar = document.createElement('div')
  gambar.innerHTML = `<img src="src/images/${data.gambar}" alt="Image">`

  var deskripsi = document.createElement('div')
  deskripsi.innerHTML = `<p  style="color: white;" class="description">${data.deskripsi}</p>`

  sharedMomentsArea.appendChild(judul);
  sharedMomentsArea.appendChild(gambar);
  sharedMomentsArea.appendChild(deskripsi);
}

//masih hardcode ${data.id}
var url = `https://test1ambw-c3450-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${parameterValue}.json`;
var networkDataReceived = false;
if (navigator.onLine) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data)
      if (localStorage.getItem(data.id) == null) {
        localStorage.setItem(data.id, JSON.stringify(data))
      }
      // localStorage.setItem('${data.id}')
      clearCards()
      createCard(data)
    });

}
else{
clearCards()
createCard(JSON.parse(localStorage.getItem(parameterValue)))
}

