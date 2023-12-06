import { ChangeEvent, useCallback, useState } from "react";

export const useInputValue = <T extends HTMLInputElement | HTMLTextAreaElement>(
  initialValue?: string
) => {

  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event: ChangeEvent<T>) => {
    const { value: newValue } = event.target;
    setValue(newValue);
  }, []);

  const forceSetValue = useCallback(<T,>(value?: T) => {
    if (!value) {
      setValue('');

      return;
    }

    setValue(value.toString());
  }, []);

  return [value, onChange, forceSetValue] as const;
};