import { FC, useMemo, useState } from "react"

import { Button } from "@mantine/core"
import { useUserData } from "../ultils/axios";
import { UserContext } from "../store/StoreProvider";
import { useContext } from "react";
import { getDataPlaceHolder } from "../ultils/axios";

export const ActiveBar: FC = () => {
    const { loading, setLoading, value, setValue } = useContext(UserContext)
    const Screen = 'Airbtn'
    console.log(">>> check value", value);
    const handleNext = async () => {
        if (Screen === 'Airbtn') {
            try {
                const res = await getDataPlaceHolder()
                if (res) {
                    setLoading(true)
                    return;
                }
            } catch (error) {
            }
        }
        console.log(">>> check data 123")

    }
    const isDisableBtn = useMemo(() => {
        return (value === '')
    }, [value])
    return (
        <Button mt={25}
            onClick={handleNext}
            disabled={isDisableBtn}
            loading={Screen === 'Airbtn' ? loading : false}
        >Next</Button>
    )
}
