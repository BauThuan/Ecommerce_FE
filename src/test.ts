
// import React, { useRef, useState } from 'react';

// import {
//     Alert,
//     Box,
//     Button,
//     Flex,
//     Modal,
//     Select,
//     Text,
//     TextInput,
// } from '@mantine/core';
// import { IconChevronDown } from '@tabler/icons-react';
// import { LOCAL_STORAGE_KEYS } from '@yr-frontend/shared/constants';
// import { dayjs } from '@yr-frontend/shared/util-dayjs';
// import { useLaunchdarkly } from '@yr-frontend/shared/util-launchdarkly';
// import ReCAPTCHA from 'react-google-recaptcha-enterprise';
// import { useForm } from 'react-hook-form';
// import { useIntl } from 'react-intl';
// import { useLocalStorage } from 'usehooks-ts';

// import useGetCurrentUserQuery from '../../hooks/edit-profile-tab/useGetCurrentUserQuery';
// import useGetCountriesQuery from '../../hooks/shared/useGetCountriesQuery';
// import useGetPhoneCodesQuery from '../../hooks/shared/useGetPhoneCodesQuery';
// import { useInitChangePhoneMutation } from '../../hooks/shared/useInitChangePhoneMutation';
// import { yrMessages } from '../../lib/i18n';
// import { InitChangePhonePayload } from '../../types';
// import { getYrMessageFromResponse, YrMessages } from '../../utils';

// type EditPhoneModalProps = {
//     opened: boolean;
//     onClose: () => void;
//     onNext: (value: string) => void;
//     shouldVerify: boolean;
// };

// type Inputs = {
//     code: string | null;
//     country: string | null;
//     number: string | null;
// };

// export const EditPhoneModal: React.FC<EditPhoneModalProps> = ({
//     opened,
//     onClose,
//     onNext,
//     shouldVerify,
// }) => {
//     const t = useIntl();
//     const recaptchaRef = useRef<ReCAPTCHA>(null);
//     const getUserQuery = useGetCurrentUserQuery();
//     const countriesQuery = useGetCountriesQuery();
//     const phoneCodesQuery = useGetPhoneCodesQuery();
//     const initChangePhoneMutation = useInitChangePhoneMutation();
//     const { evaluate } = useLaunchdarkly();
//     const enabledCaptcha = evaluate('CAPTCHA');
//     const currentPhone =
//         getUserQuery.data?.phone ||
//         getUserQuery.data?.signupPhone ||
//         getUserQuery.data?.newPhone;

//     const [, setChangePhoneTime] = useLocalStorage<string | null>(
//         LOCAL_STORAGE_KEYS.CHANGE_PHONE_TIME,
//         null
//     );

//     const form = useForm<Inputs>({
//         values: {
//             code: currentPhone?.code?.toString() || '',
//             country: currentPhone?.country || '',
//             number: currentPhone?.number || '',
//         },
//     });

//     const code = form.watch('code');
//     const countryIso = form.watch('country');
//     const number = form.watch('number');

//     const [editPhoneError, setEditPhoneError] = useState<YrMessages | null>(null);

//     const handleCancel = () => {
//         setEditPhoneError(null);
//         form.reset();
//         onClose();
//     };

//     const handleClose = () => {
//         setEditPhoneError(null);
//         onClose();
//     };

//     const submit = async (v: Inputs) => {
//         setEditPhoneError(null);
//         const newCode = v.code || '';
//         const newNumber = v.number || '';
//         const currentPhoneNumber = `+${currentPhone?.code}${currentPhone?.number}`;
//         const newPhoneNumber = `+${newCode}${newNumber}`;
//         if (!shouldVerify && newPhoneNumber === currentPhoneNumber) {
//             setEditPhoneError(
//                 yrMessages['Please enter your new mobile phone number']
//             );

//             return;
//         }

//         const variables: InitChangePhonePayload = {
//             newPhone: newPhoneNumber,
//         };

//         if (enabledCaptcha) {
//             variables.captchaToken = await recaptchaRef.current?.executeAsync();
//             variables.captchaType = 'invisible';
//         }

//         try {
//             await initChangePhoneMutation.mutateAsync(variables);
//             setChangePhoneTime(dayjs().toDate().toString());
//             getUserQuery.refetch();
//             onNext(newPhoneNumber);
//             form.reset();
//         } catch (err) {
//             setEditPhoneError(getYrMessageFromResponse(err));
//         }
//     };

//     return (
//         <>
//         { enabledCaptcha && (
//             <ReCAPTCHA
//           ref= { recaptchaRef }
//     size = "invisible"
//     badge = "bottomright"
//     sitekey = { import.meta.env.VITE_GOOGLE_RECAPTCHA_INVISIBLE_KEY }
//         />
//       )}
// <Modal
//         size={ 520 }
// opened = { opened }
// onClose = { handleClose }
// title = {
//     t.formatMessage(
//         getUserQuery.data?.phone
//             ? yrMessages['Change phone number']
//             : yrMessages['Add phone number']
//     )
// }
// styles = {{
//     header: {
//         paddingBottom: 8,
//           },
// }}
//       >
//     <Box component="form" onSubmit = { form.handleSubmit(submit) } >
//         <Box>
//         <Text color="neutral.5" sx = {{ fontSize: 16 }}>
//         {
//             t.formatMessage(
//                 yrMessages[
//                 'Select country and enter your new phone number below.'
//                 ]
//             )
//         }
//             < /Text>
//             < /Box>
//             < Box mt = { 24} >
//                 <Select
//               searchable
// sx = {(theme) => ({
//     label: {
//         color: theme.colors['neutral']['9'],
//     },
// })}
// data - testid="selectCountry"
// dropdownPosition = "bottom"
// placeholder = { t.formatMessage(yrMessages.Country) }
// rightSection = {< IconChevronDown size = "1rem" />}
// rightSectionWidth = { 30}
// styles = {{ rightSection: { pointerEvents: 'none' } }}
// data = {
//     countriesQuery.data?.map((item) => ({
//         value: item.iso || '',
//         label: item.displayName || '',
//     })) || []
// }
// value = { form.getValues('country') }
// onChange = {(value) => {
//     if (value && phoneCodesQuery.data) {
//         form.setValue('country', value);
//         form.setValue(
//             'code',
//             phoneCodesQuery.data && phoneCodesQuery.data[value]
//         );
//     }
// }}
// />
//     < /Box>
//     < Box mt = { 24} >
//         <Box>
//         <TextInput
//                 type="number"
// styles = {{
//     icon: {
//         border: '1px solid #CED4DA',
//             width: 50,
//                 borderTopLeftRadius: 4,
//                     borderBottomLeftRadius: 4,
//                   },
//     input: {
//         marginLeft: 20,
//             borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//                     borderLeft: 0,
//                         width: 'calc(100% - 20px)',
//                   },
// }}
// icon = {
//                   < Flex
// justify = "center"
// align = "center"
// sx = {{
//     backgroundColor: '#f5f9fd',
//         padding: 0,
//             margin: 0,
//                 width: '100%',
//                     height: '100%',
//                         borderTopLeftRadius: 4,
//                             borderBottomLeftRadius: 4,
//                     }}
//                   >
//     <Text color="neutral.5" weight = "bold" size = { 14} >
//     {
//         phoneCodesQuery.data && countryIso
//             ? `+${phoneCodesQuery.data[countryIso]}`
//             : ''
//     }
//         < /Text>
//         < /Flex>
//                 }
// data - testid="phoneNumberInput"
// sx = {() => ({
//     height: 50,
//     input: {
//         height: 40,
//         fontSize: 16,
//     },
// })}
// {...form.register('number') }
// />
//     < /Box>
//     < /Box>
// {
//     !!editPhoneError && (
//         <Box mt={ 12 }>
//             <Alert color="red" >
//                 <Text color="red" > { t.formatMessage(editPhoneError) } < /Text>
//                     < /Alert>
//                     < /Box>
//           )
// }
// <Box mt={ 24 }>
//     <Flex
//               gap={
//     {
//         base: 0,
//             sm: 16,
//               }
// }
// direction = {{
//     base: 'column',
//         sm: 'row',
//               }}
// align = {{
//     sm: 'flex-end',
//               }}
//             >
//     <Box sx={ { flexGrow: 1 } } />
//         < Flex
// gap = { 16}
// direction = {{
//     base: 'column-reverse',
//         sm: 'row',
//                 }}
//               >
//     <Box>
//     <Button
//                     fullWidth
// data - testid="cancelEditPhone"
// variant = "default"
// size = "sm"
// h = { 40}
// onClick = { handleCancel }
//     >
//     { t.formatMessage(yrMessages.Cancel) }
//     < /Button>
//     < /Box>
//     < Button
// data - testid="nextEditPhone"
// size = "sm"
// h = { 40}
// type = "submit"
// disabled = {!code || !number || !countryIso}
// loading = { form.formState.isSubmitting }
//     >
//     { t.formatMessage(yrMessages.Next) }
//     < /Button>
//     < /Flex>
//     < /Flex>
//     < /Box>
//     < /Box>
//     < /Modal>
//     < />
//   );
// }; import { useContext, FC } from 'react';

// import { Box, Card, TextInput } from '@mantine/core';

// import { SelectChannelContext } from '../../../components/SelectChannelProvider/SelectChannelProvider';

// import { SourceContentFooter } from './SourceContentFooter';
// import { SourceContentHeader } from './SourceContentHeader';
// import { SourceContentSteps } from './SourceContentSteps';

// import { useQueryParams } from '../../../hooks';
// import { useSaleChannelId } from '../../../hooks/use-sale-channel-id';
// import {
//     QUERY_PARAM_KEYS,
//     LOCAL_STORAGE_KEYS,
//     SUPPORTED_SALE_CHANNELS,
// } from '../../../constants';
// import { usePostImportListingBasic } from '../../../hooks/use-get-import-listing-basic';
// import { supportedSaleChannelProviders } from '../../../utils';

// const ImportListingUrl: FC = () => {
//     const { valueInput, setValueInput } = useContext(SelectChannelContext);
//     const { searchParams } = useQueryParams();
//     const { saleChannelId } = useSaleChannelId();
//     const source = searchParams.get(QUERY_PARAM_KEYS.SOURCE);
//     const accountId = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCOUNT_ID) || '';

//     const validDataPayload = () => {
//         if (saleChannelId === SUPPORTED_SALE_CHANNELS.AIRB && source) {
//             const idListing =
//                 supportedSaleChannelProviders[SUPPORTED_SALE_CHANNELS.AIRB].getSource(
//                     source
//                 );
//             return {
//                 sc: saleChannelId,
//                 id: idListing,
//             };
//         }
//         return {
//             sc: saleChannelId,
//             url: source,
//         };
//     };
//     const { isLoading, data } = usePostImportListingBasic(
//         validDataPayload(),
//         accountId
//     );

//     return (
//         <Box mt= { 24} >
//         <Card shadow="0px 1px 3px 0px rgba(17, 24, 39, 0.10), 0px 1px 2px 0px rgba(17, 24, 39, 0.06)" >
//             <Card.Section
//           p={
//         {
//             xs: 16,
//                 lg: 24,
//           }
//     }
//         >
//         <SourceContentHeader />
//         < SourceContentSteps />
//         <Box>
//         <Box component="form" noValidate >
//             <TextInput
//                 label="Listing URL"
//     placeholder = "Paste here"
//     description = "Example: https://www.airbnb.com/hosting/listings/editor/XXXXXXXXXXXXXXXXX/details"
//     inputWrapperOrder = { ['label', 'error', 'input', 'description']}
//     value = { valueInput }
//     onChange = {(event) => {
//     setValueInput(event.currentTarget.value);
// }}
// />
//     < /Box>
//     < /Box>
//     < SourceContentFooter />
//     </Card.Section>
//     < /Card>
//     < /Box>
//   );
// };
// export default ImportListingUrl;

