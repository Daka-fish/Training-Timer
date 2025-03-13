let TIMER_SECONDS = 0;
let CURRENT_TIMER_SECONDS = 0;

let TIMER;
let TIMER_STATE = 0; //0:wait, 1:running, 2:stopped

let IS_MUTE = false; //keep this setting

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

function set_timer_background_color(colorCode){
  let main_container = document.getElementsByClassName("timer-container");
  main_container[0].style.background = colorCode;
}

function play_sound(srcUrl){
  let audio = new Audio(srcUrl);
  if(audio != null && !IS_MUTE) audio.play(); 
}

function toggle_mute(){
  IS_MUTE = !IS_MUTE;
  let mute_button = document.getElementById("mute-btn");
  mute_button.innerText = (IS_MUTE) ? "ミュート解除" : "ミュートする";
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
  set_timer_background_color("#ffd700")
  TIMER_STATE = 2;
}

function reset_timer(){
  if(TIMER_STATE == 0) return;
  CURRENT_TIMER_SECONDS = TIMER_SECONDS;
  TIMER_STATE = 0;
  document.getElementById("control-btn").innerText = "開始";
  clearInterval(TIMER);
  set_seconds_on_display(0);
}

function start_count_down(){
  set_timer_background_color("#6495ed");
  TIMER = setInterval(() => {
    CURRENT_TIMER_SECONDS--;
    set_seconds_on_display(CURRENT_TIMER_SECONDS);

    if(CURRENT_TIMER_SECONDS == 0){
      clearInterval(TIMER);
      set_seconds_on_display(0);
      set_timer_background_color("#7fffd4");
      play_sound("../sounds/finish.mp3");
      TIMER_STATE = 0;
      document.getElementById("control-btn").innerText = "開始";
      return;
    }

    if(CURRENT_TIMER_SECONDS <= 3){
      set_timer_background_color("#ffc0cb");
      play_sound("../sounds/count_down.mp3");
    }

  },1000);
}
