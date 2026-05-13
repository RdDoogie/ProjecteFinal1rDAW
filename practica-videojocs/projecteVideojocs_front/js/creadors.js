let ordreCreadors = "alpha-asc"; 

async function carregarCreadors() {
    const contenedor = document.querySelector("#creators-container");
    // Selector depenguent del genere
    const genereSel = document.querySelector("#filter-genre").value;
    
    // Depenguent del id_genere_principal seleccionat
    if (genereSel) {
    sql += ` WHERE c.id_genere_principal = ${genereSel}`; 
    }

    // Query amb el count
    let sql = 
        `SELECT c.*, COUNT(vc.id_videojoc) AS num_jocs
        FROM creadors c
        LEFT JOIN videojocs_creadors vc ON c.id_creador = vc.id_creador
        GROUP BY c.id_creador`
        ;

    // Ordenacio depenguent del select
    switch (ordreCreadors) {
        case 'alpha-asc':  sql += " ORDER BY c.nom ASC"; break;
        case 'alpha-desc': sql += " ORDER BY c.nom DESC"; break;
        case 'games-desc': sql += " ORDER BY num_jocs DESC"; break;
        case 'games-asc':  sql += " ORDER BY num_jocs ASC"; break;
        default:           sql += " ORDER BY c.nom ASC";
    }

    const creadors = await consultar(sql);
    contenedor.innerHTML = "";

    if (creadors.length === 0) {
        contenedor.innerHTML = "<p>No s'han trobat creadors.</p>";
        return;
    }

    creadors.forEach(estudi => {
        const targeta = document.createElement("article");
        targeta.className = "card-creador";
        
        targeta.innerHTML = 
            `<div class="info-creador">
                <h3>${estudi.nom}</h3>
                <p class="pais">${estudi.pais}</p>
                <p class="comptador"><strong>${estudi.num_jocs}</strong> jocs al catàleg</p>
                <a href="productes.html?creador=${estudi.id_creador}" class="btn-filtre">
                    Veure col·lecció
                </a>
            </div>`
        ;
        contenedor.appendChild(targeta);
    });
}

// EventListener per el canvi d'ordre dels creadors
document.querySelector("#sort-creators").addEventListener("change", (e) => {
    ordreCreadors = e.target.value;
    carregarCreadors();
});

document.addEventListener("DOMContentLoaded", carregarCreadors);