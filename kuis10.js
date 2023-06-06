$('button').click(function() {
  var countryName = $('input').val().toLowerCase();

  let timerInterval
  Swal.fire({
    title: 'Sedang Mencari...',
    html: 'Akan menemukan hasil dalam <b></b> detik.',
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('Selesai')
    }
  })

  if ($('input').val().length == 0) {
   Swal.fire({
    icon: 'info',
    title: 'Kosong',
    text: "Masukkan nama negara terlebih dahulu"
  });
 }

 const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://covid-193.p.rapidapi.com/statistics",
  "method": "GET",
  "data": {
    country: countryName,
  },
  "headers": {
    "X-RapidAPI-Key": "8fab99c1dbmsh9d8d0009edfa1e7p13720ejsn8f4e0692764e",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com"
  }
};

$.ajax(settings).done(function(res) {
  var data = res.response[0];
  if (data===undefined) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: "Negara Tidak Ditemukan"
    });
  }

  else{
    var data = res.response[0].cases;

  // Mengupdate informasi yang ditampilkan pada DOM
    $('.active-case').text(data.active);
    $('.critical-case').text(data.critical);
    $('.new-case').text(data.new);
    $('.recovered').text(data.recovered);

  // Menuliskan nama negara dengan huruf kapital
    var newCountryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    $('.nama-negara').text(newCountryName);

    $('.table').show();
  }
});
});