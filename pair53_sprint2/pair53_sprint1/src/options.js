import {getGameProcess, renderGamePagestart} from "./index.js";

export function optionsPage() {
    getGameProcess().stop();
    return `
<h2>Options</h2>

<ul class='options'>
  <li>Change bugs color #1:
        <select name="first_color">
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="black">black</option>
            <option value="white">white</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
        </select>
    </li><br><br>
    <li>Change bugs color #2:
        <select name="second_color">
            <option value="black">black</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="white">white</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
        </select>
    </li><br><br>
    <li>Please select number of iterations:
        <select name="options_iterations">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
        </select>
    </li><br><br>
    <li>The duration of a tick in seconds:
        <select name="seconds">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>
    </li><br><br>
</ul>

<button onclick="applyOptions()">Apply</button>
`;
}

export const applyOptions = window.applyOptions = () => {
    getGameProcess().iterations = parseInt(document.querySelector('select[name="options_iterations"]').value);
    getGameProcess().seconds = parseInt(document.querySelector('select[name="seconds"]').value);
    renderGamePage();
}
