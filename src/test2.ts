
// import { useMemo, useContext, FC } from 'react';

// import { Header, Button, Flex, useMantineTheme } from '@mantine/core';
// import { useMediaQuery } from '@mantine/hooks';

// import { QUERY_PARAM_KEYS, SCREENS } from '../../constants';
// import { useQueryParams } from '../../hooks';
// import { getNextScreenTag, getBackScreenTag } from '../../utils';
// import { SelectChannelContext } from '../SelectChannelProvider/SelectChannelProvider';
// import { useSaleChannelId } from '../../hooks/use-sale-channel-id';
// import { useForm } from 'react-hook-form';

// const ActionBar: FC = () => {
//     const theme = useMantineTheme();
//     const { searchParams, setQueryParam } = useQueryParams();
//     const { valueInput } = useContext(SelectChannelContext);
//     const { saleChannelId } = useSaleChannelId();
//     const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

//     const currentScreen = searchParams.get(QUERY_PARAM_KEYS.SCREEN);

//     const isScreenSaleChannel = useMemo(() => {
//         return currentScreen === SCREENS.SALE_CHANNEL;
//     }, [currentScreen]);

//     const isScreenVarifyData = useMemo(() => {
//         return currentScreen === SCREENS.VERIFY_DATA;
//     }, [currentScreen]);

//     const isDisableBtn = useMemo(() => {
//         return (
//             currentScreen === SCREENS.IMPORT_DATA ||
//             !saleChannelId ||
//             (currentScreen === SCREENS.SOURCE && !valueInput)
//         );
//     }, [currentScreen, saleChannelId, valueInput]);

//     const hideActionBar = useMemo(() => {
//         return currentScreen === SCREENS.IMPORT_DATA;
//     }, [currentScreen]);
//     console.log('>>> check value', typeof valueInput);
//     const handleNext = () => {
//         if (currentScreen) {
//             const newCurrentScreens =
//                 getNextScreenTag(currentScreen) || SCREENS.SALE_CHANNEL;
//             setQueryParam(QUERY_PARAM_KEYS.SCREEN, newCurrentScreens);
//         }
//         if (valueInput) {
//             setQueryParam(QUERY_PARAM_KEYS.SOURCE, valueInput);
//         }
//     };

//     const handleBack = () => {
//         if (currentScreen) {
//             const screen = getBackScreenTag(currentScreen) || SCREENS.SALE_CHANNEL;
//             setQueryParam(QUERY_PARAM_KEYS.SCREEN, screen);
//         }
//     };

//     return (
//         <Header
//       height= {{ base: 70, md: 72, xs: 70 }
// }
// p = "md"
// position = {{ bottom: 0, right: 0 }}
// bg = { theme.colors.mainContentBg[0] }
// sx = {{
//     borderTop: `1px solid ${theme.colors.neutral[2]}`,
//         display: hideActionBar ? 'none' : 'flex',
//             justifyContent: 'center',
//       }}
//     >
//     <Flex
//         justify={ isMobile ? 'space-around' : 'space-between' }
// w = { isMobile? '100%': '600px' }
// align = "center"
// sx = {{ height: '100%' }}
//       >
// {
//     isScreenSaleChannel?(
//           <Button sx = {{ minWidth: 0 }} px = { 16} variant = "default" >
//     Cancel
//     < /Button>
//         ) : (
//     <Button
//             sx= {{ minWidth: 0 }}
// px = { 16}
// onClick = { handleBack }
// variant = "default"
//     >
//     Back
//     < /Button>
//         )}

// <Button
//           px={ 16 }
// disabled = { isDisableBtn }
// onClick = { handleNext }
// variant = "primary"
// color = "gray"
//     >
//     { isScreenVarifyData? 'Yes,copy content': 'Next' }
//     < /Button>
//     < /Flex>
//     < /Header>
//   );
// };

// export default ActionBar; 