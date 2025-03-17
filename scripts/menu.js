let DATA_FROM_JSON = [];
let EDITTED_CIRCUIT;

window.onload = async () => {
    load_circuits_from_local_storage(); // ローカルストレージからデータを取得
    if (DATA_FROM_JSON.length === 0) { 
        DATA_FROM_JSON = await get_circuits_from_json(); // JSONファイルから取得
    }
    set_circuits_on_display(); // データ取得後に画面表示
};

function save_circuit_to_local_storage() {
    if (!EDITTED_CIRCUIT) return;

    let index = DATA_FROM_JSON.findIndex(circuit => circuit.circuit_name === EDITTED_CIRCUIT.circuit_name);
    if (index !== -1) {
        DATA_FROM_JSON[index] = EDITTED_CIRCUIT;
    } else {
        DATA_FROM_JSON.push(EDITTED_CIRCUIT);
    }

    localStorage.setItem("savedCircuits", JSON.stringify(DATA_FROM_JSON));
}

function load_circuits_from_local_storage() {
    let savedData = localStorage.getItem("savedCircuits");
    if (savedData) {
        DATA_FROM_JSON = JSON.parse(savedData);
    }
}

async function get_circuits_from_json() {
    try {
        let res = await fetch("../data/registerd_circuit.json");
        let data = await res.json();
        return data;
    } catch (error) {
        console.error("データの読み込みに失敗しました", error);
        return [];
    }
}

function set_circuits_on_display(){
    if(DATA_FROM_JSON.length == 0) return;

    let circuits_display_html = document.getElementById("registered-circuits")
    let registered_circuits = DATA_FROM_JSON;

    registered_circuits.forEach(circuit => {
        let button = document.createElement("button");
        let circuit_name = circuit.circuit_name;

        button.innerText = circuit_name;
        button.className = "circuit-btn";
        button.onclick = () => {
            show_menus(circuit);
            EDITTED_CIRCUIT = circuit;
        };

        circuits_display_html.appendChild(button);
        circuits_display_html.appendChild(document.createElement("br"));
    });

    circuits_display_html.appendChild(get_create_circuit_button());
}

function show_menus(circuit){
    let menu_html = document.getElementById("training-menus");
    let sum_duration = 0;
    let sum_interval = circuit.interval * (circuit.trainings.length-1);

    menu_html.innerHTML = "";

    menu_html.innerHTML += `<h4>${circuit.circuit_name}</h4>`;

    circuit.trainings.forEach(menu=>{
        menu_html.appendChild(get_menu_button(menu));
        sum_duration += menu.duration;
    });
    sum_duration += sum_interval;

    menu_html.appendChild(get_add_form());
    
    show_circuit_details(circuit);
}

function show_circuit_details(circuit){
    let details_html = document.getElementById("circuit-data");
    let sum_duration = 0;

    for(let i=0; i<circuit.trainings.length; i++){
        sum_duration += circuit.trainings[i].duration;
    }
    sum_duration += circuit.interval * (circuit.trainings.length-1);

    details_html.innerHTML = `インターバル: ${circuit.interval}秒<br>`;
    details_html.innerHTML += "合計:" + ((sum_duration>=60) ? `${parseInt(sum_duration/60)}分 ${sum_duration%60}秒` : `${sum_duration}秒`);
}

function add_menu(event, new_menu_html){
    event.preventDefault();
    if(EDITTED_CIRCUIT == null) return;
    let name = new_menu_html.menu_name.value;
    let duration = parseInt(new_menu_html.menu_duration.value);
    if(name == "" || duration <= 0) return;
    let traing = {name,duration};
    EDITTED_CIRCUIT.trainings.push(traing);
    show_menus(EDITTED_CIRCUIT);
}

function get_create_circuit_button(){
    let button = document.createElement("button");
    button.innerText = "新規作成";
    button.className = "circuit-btn";
    button.onclick = () =>{console.log("make new circuit");};
    return button;
}

function get_menu_button(menu){
    let button = document.createElement("button");
    button.innerText=menu.name;
    button.className="menu-btn";
    button.onclick = () =>{console.log("menu button pushed:"+menu.name);};
    return button;
}

function get_add_form(){
    let form = document.createElement("form");
    form.onsubmit = () => {add_menu(event,this)};
    form.id="add-menu-form";

    let name_input = document.createElement("input");
    let duration_input = document.createElement("input");
    let submit = document.createElement("input");

    name_input.type="text";
    name_input.name="menu_name";
    name_input.placeholder="名前";

    duration_input.type="number";
    duration_input.name="menu_duration";
    duration_input.placeholder="秒数";

    submit.type="submit";
    submit.value=" + ";

    form.appendChild(name_input);
    form.appendChild(duration_input);
    form.appendChild(submit);
    return form;
}