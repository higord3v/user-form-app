import React, { useState } from "react";
import { Button } from "react-native";
import DatePicker from "react-native-date-picker";
import { Controller } from "react-hook-form";
import { View } from "native-base";

export default ({ control, name }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <View>
          <Button title="Data de Nascimento" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              onChange(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      )}
    />
  );
};
