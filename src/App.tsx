import { Text, Button, useMantineTheme } from "@mantine/core";
const App = () => {
  const theme = useMantineTheme();
  return (
    <>
      <Text>hELLO</Text>
      <Button color={theme.colors.neutral[0]}>Hello</Button>
    </>
  );
}
export default App;