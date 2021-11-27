function parse(links) {
    let main = document.querySelector("main");

    let lines = links.split('\n').split('\r');
    let currentDiv = null;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line[0] == '#') {
            let heading = document.createElement('h2');
            heading.innerText = line.substring(1, line.length);
            main.appendChild(heading);

            currentDiv = document.createElement("div");
            main.appendChild(currentDiv);
        } else {
            let anchor = document.createElement('a');
            let comma = line.indexOf(',');

            if (comma == -1) continue;

            anchor.innerText = line.substring(0, comma);
            anchor.setAttribute('href', line.substring(comma + 1, line.length));
            currentDiv.appendChild(anchor);
        }
    }
}

window.addEventListener('load', () => {
    fetch('links.txt')
    .then(content => content.text())
    .then(text => parse(text));
});
