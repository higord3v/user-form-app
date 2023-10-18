import { Text } from "react-native";
import {
  FormControl,
  Input as NativeBaseInput,
  IInputProps,
} from "native-base";

type Props = IInputProps & {
  mensagemErro?: string;
};

export const Input = ({ mensagemErro, isInvalid, ...rest }: Props) => {
  const invalid = !!mensagemErro || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput {...rest} isInvalid={invalid} />
      <FormControl.ErrorMessage>
        <Text>{mensagemErro}</Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
