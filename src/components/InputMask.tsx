import React from "react";
import MaskInput from "react-native-mask-input";
import { Controller } from "react-hook-form";
import { Text } from "native-base";
import { FormControl } from "native-base";

export default ({
  control,
  name,
  mask,
  label,
  submitWithMask,
  mensagemErro,
  rules,
}) => {
  const [cpf, setCpf] = React.useState("");
  const invalid = !!mensagemErro;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange } }) => (
        <FormControl isInvalid={invalid}>
          <Text>{label}</Text>
          <MaskInput
            value={cpf}
            onChangeText={(masked, unmasked) => {
              setCpf(masked);
              onChange(submitWithMask ? masked : unmasked);
            }}
            mask={mask}
          />
          <FormControl.ErrorMessage>
            <Text>{mensagemErro}</Text>
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};
