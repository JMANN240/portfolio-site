let header = document.querySelector("#header");
let footer = document.querySelector("#footer");

let items = obj => Object.keys(obj).map( key => [key, obj[key]] );

let init = async () => {
    let sites = await (await fetch("/static/sites.json")).json();

    for (let [site, info] of items(sites)) {
        const a = document.createElement('a');
        a.href = info.url;
        a.target = "_blank";
        a.classList.add("clickable", "social", "neumorphic", "outset", "flex-row");
        a.style.color = info.color;

        const span = document.createElement("span");
        span.classList.add("fab", `fa-${site}`);
        span.style.fontSize = "1.5rem";

        a.appendChild(span);
        footer.appendChild(a);
    }

    let shelves = await (await fetch("/static/shelves.json")).json();
    let shelf_items = items(shelves)
    shelf_items.reverse()
    for (let [shelf, content] of shelf_items) {
        const shelf_div = document.createElement("div");
        shelf_div.classList.add("neumorphic", "outset", "flex-column");
        shelf_div.style.fontSize = "2rem";

        const title_span = document.createElement("span");
        title_span.classList.add("neumorphic", "inset");
        title_span.style.fontWeight = "100";

        const title_node = document.createTextNode(shelf);

        title_span.appendChild(title_node);

        shelf_div.appendChild(title_span);

        const content_div = document.createElement("div");
        content_div.classList.add("flex-row");
        content_div.style.alignItems = "stretch";
        content_div.style.flexWrap = "wrap";

        for (let [title, body] of items(content)) {
            const content_item_div = document.createElement("div");

            content_item_div.classList.add("neumorphic", "inset", "flex-column");

            const title_header = document.createElement("h1");

            const title_header_node = document.createTextNode(title);

            title_header.appendChild(title_header_node);

            const body_paragraph = document.createElement('p');
            body_paragraph.style.width = "30ch";

            const body_paragraph_node = document.createTextNode(body);

            body_paragraph.appendChild(body_paragraph_node);

            content_item_div.appendChild(title_header);
            content_item_div.appendChild(body_paragraph);
            content_div.appendChild(content_item_div);
        }

        shelf_div.appendChild(content_div)

        header.after(shelf_div);
    }
}

init();