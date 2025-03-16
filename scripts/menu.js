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
        button.className = "circuit_button";
        button.onclick = () => {
            show_menus(circuit);
            EDITTED_CIRCUIT = circuit;
        };

        circuits_display_html.appendChild(button);
        circuits_display_html.appendChild(document.createElement("br"));
    });

    let new_circuit_button = document.createElement("button");
    new_circuit_button.innerText = "新規作成";
    new_circuit_button.className = "circuit_button";
    circuits_display_html.appendChild(new_circuit_button);
}

function show_menus(circuit){
    let menu_html = document.getElementById("trainings");
    menu_html.innerHTML = "";

    menu_html.innerHTML += `<h4>${circuit.circuit_name}</h4>`;

    circuit.trainings.forEach((training, i)=>{
        menu_html.innerHTML += `${i+1}:${training.name} ${training.duration}秒<br>`;
    });

    menu_html.innerHTML += `<form onsubmit=\"add_menu(event,this)\">
        名前:<input type=\"text\" name=\"menu_name\">
        秒数:<input type=\"number\" name=\"menu_duration\">
        <input type=\"submit\" value=\"+\">
        </form>`;
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