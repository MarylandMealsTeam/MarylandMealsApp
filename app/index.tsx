
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { login } from "@/api/authenticateSession";


// Add expo-auth-session authentication later!
export default function Index() {
    // const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     const v = async () => {
    //         const t = await login("Refactor@gmail.com", "Refactor@123")
    //         setLoggedIn(t);
    //     }

    //     v();
    // }, []);

    if (false) {
        return <Redirect href="/(tabs)/menu"></Redirect>
    } else {
        return <Redirect href="/auth"></Redirect>
    }
}
