import React from "react";
import {
  VStack,
  Heading,
  Radio as NativeBaseRadio,
  FormControl,
  Text,
  HStack,
} from "native-base";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useForm, Controller } from "react-hook-form";
import InputMask from "../components/InputMask";
import { Masks } from "react-native-mask-input";

const Radio = ({ control, name }) => {
  const [value, setValue] = React.useState(null);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Escolha uma opção",
      }}
      render={({ field: { onChange } }) => (
        <FormControl isInvalid={value === null ? true : false}>
          <NativeBaseRadio.Group
            name="genero"
            accessibilityLabel="genero"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
              onChange(nextValue);
            }}
          >
            <NativeBaseRadio value={"0"} my={1}>
              Homem
            </NativeBaseRadio>
            <NativeBaseRadio value={"1"} my={1}>
              Mulher
            </NativeBaseRadio>
          </NativeBaseRadio.Group>
          <FormControl.ErrorMessage>
            <Text>Escolha uma opção</Text>
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

const handleCadastrar = async (formData) => {
  try {
    const response = await fetch("http://10.0.2.2/api/usuario", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    if (response.status === 201) {
      return alert("Usuário cadastrado com sucesso!");
    }
    const erro = await response.json();
    throw new Error(erro.message);
  } catch (error) {
    alert("Erro: " + error.message);
  }
};

export const Cadastro = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <VStack>
      <Heading my={5}>Cadastre seu usuário</Heading>
      <VStack space={4}>
        <InputMask
          label="CPF"
          control={control}
          name="cpf"
          rules={{
            required: "CPF é obrigatório",
            minLength: {
              value: 11,
              message: "O CPF deve conter 11 dígitos",
            },
          }}
          mask={Masks.BRL_CPF}
          submitWithMask={false}
          mensagemErro={errors.cpf?.message as string}
        />
        <Controller
          control={control}
          name="nome"
          rules={{
            required: "Nome é obrigatório",
          }}
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              placeholder="Nome"
              mensagemErro={errors.nome?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="sobrenome"
          rules={{
            required: "Sobrenome é obrigatório",
          }}
          render={({ field: { onChange } }) => (
            <Input
              mensagemErro={errors.sobrenome?.message as string}
              onChangeText={onChange}
              placeholder="Sobrenome"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange } }) => (
            <Input
              onChangeText={onChange}
              placeholder="E-mail"
              mensagemErro={errors.email?.message as string}
            />
          )}
        />
        <InputMask
          control={control}
          name="data_nascimento"
          label="Data de Nascimento"
          mask={Masks.DATE_DDMMYYYY}
          submitWithMask
          rules={{
            required: "A Data de Nascimento é obrigatória",
          }}
          mensagemErro={errors.data_nascimento?.message as string}
        />

        <Radio control={control} name="genero" />
        <HStack>
          <Button
            isLoading={false}
            spinnerPlacement="end"
            isLoadingText="Enviando"
            name="INSERIR"
            bgColor="blue.500"
            onPress={handleSubmit(handleCadastrar)}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
