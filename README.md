# tamdegoru.github.io

html
```
<main
  data-hx-trigger="load"
  data-hx-swap="outerHTML"
  data-hx-get="index. ..."
></main>
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



