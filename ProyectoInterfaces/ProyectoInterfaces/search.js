const products = [
    "Anillo de oro Amarillo Cartier",
    "Collar de perlas Vivienne Westwood",
    "Aretes Tara Vivienne Westwood",
    "Anillo Orquidea Swarovski",
    "Reloj Diamantes Rosados Swarovski",
    "Anillo Oro Blanco Cartier",
    "Aretes Corazon Cartier",
    "Black Fossil Watch Rolex",
    "Reloj \"Pantera Negra\" Rolex",
    "Aretes diamante Dresde Cartier",
    "Anillo Oro Amarillo Cartier",
    "Collar de Diamantes Swarovski"
];

const searchInput = document.getElementById("search");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = ""; // limpiar resultados

    if(query) {
        const filtered = products.filter(p => p.toLowerCase().includes(query));
        filtered.forEach(product => {
            const div = document.createElement("div");
            div.textContent = product;
            div.addEventListener("click", () => {
                searchInput.value = product; // poner el producto en el input al hacer click
                searchResults.innerHTML = "";
            });
            searchResults.appendChild(div);
        });
    }
});
