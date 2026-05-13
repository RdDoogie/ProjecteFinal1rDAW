let ordreActual = "";

async function carregarProductes() {
    const contenedor = document.querySelector("#contenedor-jocs");
    
    // Lectura de parametres per url
    const params = new URLSearchParams(window.location.search);
    const idCreador = params.get("creador");

    // Base de la consulta
    let sql = `
        SELECT v.*, c.nom AS creador, g.nom AS genere,
               IFNULL(ROUND(AVG(val.puntuacio), 0), 0) AS nota_mitjana
        FROM videojocs v
        JOIN videojocs_creadors vc ON v.id_videojoc = vc.id_videojoc
        JOIN creadors c ON vc.id_creador = c.id_creador
        JOIN videojocs_generes vg ON v.id_videojoc = vg.id_videojoc
        JOIN generes g ON vg.id_genere = g.id_genere
        LEFT JOIN valoracions val ON v.id_videojoc = val.id_videojoc
    `;

    // El where per la consulta
    if (idCreador) {
        sql += ` WHERE c.id_creador = ${idCreador}`;
    }

    // Agrupam per evitar duplicats
    sql += " GROUP BY v.id_videojoc";

    // Ordenacio
    switch (ordreActual) {
        case 'score-desc': sql += " ORDER BY nota_mitjana DESC"; break;
        case 'score-asc':  sql += " ORDER BY nota_mitjana ASC"; break;
        case 'alpha-asc':  sql += " ORDER BY v.titol ASC"; break;
        case 'alpha-desc': sql += " ORDER BY v.titol DESC"; break;
        case 'price-desc': sql += " ORDER BY v.preu DESC"; break;
        case 'price-asc':  sql += " ORDER BY v.preu ASC"; break;
        default:           sql += " ORDER BY v.id_videojoc ASC";
    }

    const jocs = await consultar(sql);
    contenedor.innerHTML = "";

    // Pintem les targetes
    jocs.forEach(joc => {
        const targeta = document.createElement("article");
        targeta.classList.add("card-joc");

        targeta.innerHTML = 
            `<img src="${joc.imatge_gran}" alt="${joc.titol}">
            <div class="info">
                <h3>${joc.titol}</h3>
                <p class="rating">⭐ ${joc.nota_mitjana}/100</p>
                <p class="creador">${joc.creador} | <span>${joc.genere}</span></p>
                <p class="desc">${joc.descripcio_breu}</p>
                <p class="preu">${joc.preu} €</p>
            </div>`
        ;
        contenedor.appendChild(targeta);
    });
}

// Escoltador per al canvi d'ordre
document.querySelector("#sort-select").addEventListener("change", (e) => {
    ordreActual = e.target.value;
    carregarProductes(); 
});

// Escoltadors per el canvi de vista (Grid/List) 
document.querySelector("#btn-grid").addEventListener("click", () => {
    document.querySelector("#contenedor-jocs").className = "vista-casella";
    document.querySelector("#btn-grid").classList.add("active");
    document.querySelector("#btn-list").classList.remove("active");
});

document.querySelector("#btn-list").addEventListener("click", () => {
    document.querySelector("#contenedor-jocs").className = "vista-llistat";
    document.querySelector("#btn-list").classList.add("active");
    document.querySelector("#btn-grid").classList.remove("active");
});

document.addEventListener("DOMContentLoaded", carregarProductes);