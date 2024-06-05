import { Box, TextInput } from "@mantine/core";
import { FC, useEffect } from "react"
import { UserContext } from "../store/StoreProvider";
import { useContext } from "react";
import { useUserData } from "../ultils/axios";

const ImportUrl: FC = () => {
    // const { isLoading, data } = useUserData();
    // console.log(">>> chekc data", data)

    const { setLoading, value, setValue } = useContext(UserContext)
    // useEffect(() => {
    //     setLoading(isLoading)
    // }, [isLoading])
    return (
        <Box>
            <Box component="form" noValidate>
                <TextInput
                    label="Listing URL"
                    placeholder="Paste here"
                    description="Example: https://www.airbnb.com/hosting/listings/editor/XXXXXXXXXXXXXXXXX/details"
                    inputWrapperOrder={['label', 'error', 'input', 'description']}
                    value={value}
                    onChange={(event) => {
                        setValue(event.currentTarget.value);
                    }}
                />
            </Box>
        </Box>
    )
}
export default ImportUrl