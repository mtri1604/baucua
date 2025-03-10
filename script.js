const audioNhacNen = document.getElementById("musicBg");
const audioXoc = document.getElementById("musicShake");
const imgTatNhac = document.getElementById("mute");
const bat = document.getElementById("bowl");
const xucXac = [];
xucXac[0] = document.getElementById("dice1");
xucXac[1] = document.getElementById("dice2");
xucXac[2] = document.getElementById("dice3");

var nhacDangPhat = false;
var danhSachHinh = ["bau", "cua", "tom", "ca", "ga", "huou"];
var chiSoXucXac = [0, 0, 0];
var isChiSoXucXac = [0, 0, 0, 0, 0, 0];
var thoiGianTre = 850;

audioNhacNen.loop = true;

function tatNhac() {
  if (nhacDangPhat) {
    audioNhacNen.pause();
    imgTatNhac.src = "./image/mute.png";
  } else {
    audioNhacNen.play();
    imgTatNhac.src = "./image/unmute.png";
  }
  nhacDangPhat = !nhacDangPhat;
}

function moBat() {
  let tongCuoc = 0;
  let luaChon = ["bau", "cua", "tom", "ca", "ga", "huou"];
  luaChon.forEach((chon) => {
    let soTien = document.getElementById(`bet-amount-${chon}`).value;
    tongCuoc += soTien ? parseInt(soTien) : 0;
    
  });
 
  if (tongCuoc > tienNguoiChoi) {
    alert("Đặt lố rồi!");
    return;
  }
 

  bat.style.animationName = "none";
  bat.style.transitionDuration = "1s";
  bat.style.transform = "translateY(-350px)";
  setTimeout(() => {
    datCuoc();
  }, 500);
}


function xocBat() {
  bat.style.transitionDuration = "1s";
  bat.style.transform = "translateY(0)";
  bat.style.animation = "shake 0.5s";
  bat.style.animationDelay = "0.9s";
  bat.style.animationIterationCount = "4";

  setTimeout(function () {
    xucXac.forEach((_xucXac, i) => {
      let x = Math.floor(Math.random() * 6);
      _xucXac.src = "./image/" + danhSachHinh[x] + ".png";
      chiSoXucXac[i] = x;
    });

    audioXoc.play();
    resetONhapCuoc();
  }, thoiGianTre);
}

var tienNguoiChoi = 10;
document.getElementById("player-money").innerText = tienNguoiChoi;

function datCuoc() {
  let cuoc = {};
  let luaChon = ["bau", "cua", "tom", "ca", "ga", "huou"];
  var isChiSoXucXac = [0, 0, 0, 0, 0, 0];
  let tongCuoc = 0;
  let ketQua = 0;
  luaChon.forEach((chon, i) => {
    let soTien = document.getElementById(`bet-amount-${chon}`).value;
    cuoc[chon] = soTien ? parseInt(soTien) : 0;
    tongCuoc += cuoc[chon];
    for (let j = 0; j <= 2; j++) {
      if (chiSoXucXac[j] == i) {
        ketQua += cuoc[chon];
      }
      if (isChiSoXucXac[i] == 0 && chiSoXucXac[j] == i) {
        isChiSoXucXac[i] = 1;
        ketQua += cuoc[chon];
      }
    }
  });

  if (tongCuoc == 0) return;
  if (tongCuoc > tienNguoiChoi) {
    alert("Đặt lố rồi!");
    return;
  }

  tienNguoiChoi += ketQua - tongCuoc;

  console.log("ketQua", ketQua);
  console.log("tongCuoc", tongCuoc);

  document.getElementById("player-money").innerText = tienNguoiChoi;
  console.log("Cược đã đặt:", cuoc);
}

