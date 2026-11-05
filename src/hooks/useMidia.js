import { useEffect, useState } from "react";

export function useMidia(consulta) {
    const [casa, setCasa] = useState(() => window.matchMedia(consulta).matches);

    useEffect(() => {
        const midia = window.matchMedia(consulta);
        const aoMudar = (e) => setCasa(e.matches);

        midia.addEventListener("change", aoMudar);
        return () => midia.removeEventListener("change", aoMudar);
    }, [consulta]);

    return casa;
}
