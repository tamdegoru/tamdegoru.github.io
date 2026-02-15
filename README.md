# tamdegoru.github.io

load part-html
```
hx-get="assets/partials/index.header.html"
hx-trigger="load"
hx-swap="outerHTML">
```
Js
```
function init() {
  import("...js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
```



