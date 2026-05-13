async function carregarProductes() {
    const contenedor = document.querySelector("#contenedor-jocs");
    
    const sql = `
        SELECT v.*, c.nom AS creador, g.nom AS genere 
        FROM videojocs v
        JOIN videojocs_creadors vc ON v.id_videojoc = vc.id_videojoc
        JOIN creadors c ON vc.id_creador = c.id_creador
        JOIN videojocs_generes vg ON v.id_videojoc = vg.id_videojoc
        JOIN generes g ON vg.id_genere = g.id_genere
        ORDER BY v.id_videojoc ASC`;

    const jocs = await consultar(sql);

    contenedor.innerHTML = "";

    jocs.forEach(joc => {
        const targeta = document.createElement("article");
        targeta.classList.add("card-joc");

        targeta.innerHTML = `
            <img src="${joc.imatge_gran}" alt="${joc.titol}">
            <div class="info">
                <h3>${joc.titol}</h3>
                <p class="creador">${joc.creador} | <span>${joc.genere}</span></p>
                <p class="desc">${joc.descripcio_breu}</p>
                <p class="preu">${joc.preu} €</p>
            </div>`          
        ;
        contenedor.appendChild(targeta);
    });
}

document.addEventListener("DOMContentLoaded", carregarProductes);