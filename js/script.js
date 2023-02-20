/* var rangeSlider = document.getElementById("rs_range_line");
var rangeBullet = document.getElementById("rs_bala");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}
 */
var rangeSlider=document.getElementById("rs_range_line");
var rangeBala=document.getElementById("rs_bala");

rangeSlider.addEventListener("input",showSliderValue, false);

function showSliderValue(){
  rangeBala.innerHTML=rangeSlider.value;
  var posicion_bala=(rangeSlider.value /rangeSlider.max);
  rangeBala.style.left=(posicion_bala *578)+ "px";
}


