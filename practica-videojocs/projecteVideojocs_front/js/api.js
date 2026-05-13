async function consultar(sql) {
    
    const url = "http://localhost:3000/daw/" + encodeURIComponent(sql);
    
    try {
        const resp = await fetch(url);
        
        if (!resp.ok) {
            throw new Error(`Error en la connexió: ${resp.status} ${resp.statusText}`);
        }
        
        const json = await resp.json();
        return json.data; 
        
    } catch (error) {

        console.error(" ERROR CRÍTIC en la consulta SQL:", error);
        
        alert("S'ha produït un error en connectar amb la base de dades. Torna-ho a provar més tard.");
        
        return [];
    }
}