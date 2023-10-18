import { IButtonProps, Button as NativeBaseButton } from "native-base";

type Props = IButtonProps & {
  name: string;
};

export const Button = ({ name, ...rest }: Props) => {
  return (
    <NativeBaseButton _pressed={{ bgColor: "blue.800" }} {...rest}>
      {name}
    </NativeBaseButton>
  );
};
