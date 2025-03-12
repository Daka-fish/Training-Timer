let TIMER_SECONDS = 0;
let CURRENT_TIMER_SECONDS = 0;
let TIMER;

function get_input_number() {
  let raw_number = document.getElementById("timer-seconds").value;

  if (raw_number == "") return 0;

  let inputed_number = parseInt(raw_number);
  return inputed_number;
}

function set_seconds_on_display(seconds){
  let timer_display = document.getElementById("timer-display");
  timer_display.innerHTML = `<p>${seconds} 秒</p>`;
  return 0;
}

function start_timer() {

  if(TIMER != null) clearInterval(TIMER);

  let input_number = get_input_number();
  if (input_number <= 0) {
    alert("0以上の数値を入力して下さい");
    return 0;
  }

  TIMER_SECONDS = input_number;
  CURRENT_TIMER_SECONDS = TIMER_SECONDS;

  set_seconds_on_display(TIMER_SECONDS);

  TIMER = setInterval(() => {
    CURRENT_TIMER_SECONDS--;
    set_seconds_on_display(CURRENT_TIMER_SECONDS);

    if(CURRENT_TIMER_SECONDS <= 0){
      clearInterval(TIMER);
    }

  },1000);
}
