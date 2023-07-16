import { useMemo, useState, useEffect } from "react";

function useMediaQuery(query: string) {
    if (typeof window === "undefined") return

    const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
    const [match, setMatch] = useState(mediaQuery.matches);

    useEffect(() => {
        const onChange = () => setMatch(mediaQuery.matches);
        mediaQuery.addEventListener("change", onChange);

        return () => mediaQuery.removeEventListener("change", onChange);
    }, [mediaQuery]);

    return match;
}

export default function useMediaQueries() {
    const sm = useMediaQuery("(min-width: 0px) and (max-width: 567px)");
    const md = useMediaQuery("(min-width: 568px) and (max-width: 1024px)");
    const lg = useMediaQuery("(min-width: 1025px)");

    return { sm, md, lg };
}


// const sm = useMediaQuery("(min-width: 0px) and (max-width: 567px)");
// const md = useMediaQuery("(min-width: 568px) and (max-width: 1024px)");
// const lg = useMediaQuery("(min-width: 1025px)");