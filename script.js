let TIMER_SECONDS = 0;
let CURRENT_TIMER_SECONDS = 0;
let TIMER;

let TIMER_STATE = 0; //0:wait, 1:running, 2:stopped

function get_input_number(){
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

function control_timer(){
  let control_button = document.getElementById("control-btn");
  switch(TIMER_STATE){
    case 0:
      start_timer();
      TIMER_STATE = 1;
      control_button.innerText = "停止";
      break;
    
    case 1:
      stop_timer();
      TIMER_STATE = 2;
      control_button.innerText = "再開";
      break;

    case 2:
      start_count_down();
      TIMER_STATE = 1;
      control_button.innerText = "停止";
      break;
  }
}

function start_timer(){
  if(TIMER != null) clearInterval(TIMER);

  let input_number = get_input_number();
  if (input_number <= 0) {
    alert("0以上の数値を入力して下さい");
    return 0;
  }

  TIMER_SECONDS = input_number;
  CURRENT_TIMER_SECONDS = TIMER_SECONDS;

  set_seconds_on_display(TIMER_SECONDS);
  start_count_down();
}

function stop_timer(){
  if(TIMER_STATE!=1) return;
  clearInterval(TIMER);
  set_seconds_on_display(CURRENT_TIMER_SECONDS);
  TIMER_STATE = 2;
}

function start_count_down(){
  TIMER = setInterval(() => {
    CURRENT_TIMER_SECONDS--;
    set_seconds_on_display(CURRENT_TIMER_SECONDS);

    if(CURRENT_TIMER_SECONDS < 0){
      clearInterval(TIMER);
      TIMER_STATE = 1;
      document.getElementById("control-btn").innerText = "開始";
      set_seconds_on_display(TIMER_SECONDS);
    }

  },1000);
}

function reset_timer(){
  if(TIMER_STATE == 0) return;
  set_seconds_on_display(TIMER_SECONDS);
  CURRENT_TIMER_SECONDS = TIMER_SECONDS;
  TIMER_STATE = 0;
  document.getElementById("control-btn").innerText = "開始";
  clearInterval(TIMER);
}
