async function ferProva() {
    console.log("Connectant amb el servidor...");
    const jocs = await consultar("SELECT * FROM videojocs LIMIT 5"); 
    console.log("Les dades rebudes són:", jocs);
}

ferProva();