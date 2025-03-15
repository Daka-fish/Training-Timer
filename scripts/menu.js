let DATA_FROM_JSON = [];
let CURRENT_CIRCUIT;

window.onload = async () =>{
    DATA_FROM_JSON = await get_circuits_from_json(); // `await` を使う
    set_circuits_on_display(); // データ取得後に画面表示
};

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
    registered_circuits.forEach((circuit, index) => {
        let button = document.createElement("button");
        let circuit_name = circuit.circuit_name;

        button.innerText = circuit_name;
        button.className = "circuit_button";
        button.onclick = () => show_menus(index);

        circuits_display_html.appendChild(button);
        circuits_display_html.appendChild(document.createElement("br"));
    });

    let new_circuit_button = document.createElement("button");
    new_circuit_button.innerText = "新規作成";
    new_circuit_button.className = "circuit_button";
    circuits_display_html.appendChild(new_circuit_button);
}

function show_menus(circuit_index){
    let menu_html = document.getElementById("trainings");
    menu_html.innerHTML = "";

    let selected_circuit = DATA_FROM_JSON[circuit_index];

    menu_html.innerHTML += `<h4>${selected_circuit.circuit_name}</h4>`;
    
    selected_circuit.trainings.forEach((training, i) => {
        menu_html.innerHTML += `${i + 1} : ${training.name} (${training.duration}秒)<br>`;
    });

    menu_html.innerHTML += `<input type=\"text\"> <input type=\"submit\" value=\"＋\" onclick=\"\">`;

    CURRENT_CIRCUIT = selected_circuit;
}

function add_menu(menu, duration){}