import React, { useState } from 'react';
import styled from 'styled-components';

const TextInputWithOptionsContainer = styled.div`
  position: relative;
`;

const TextInputContainer = styled.div`
  padding: 16px;
`;

const TextInput = styled.input`
  width: calc(100% - 32px);
  padding: 8px 16px;

  font-size: 24px;
  color: #4e4554;

  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextInputOptions = styled.div`
  position: absolute;
  top: 58px;
  width: calc(100% - 32px);
  max-height: 300px;
  overflow: auto;

  margin: 16px;
  margin-top: 4px;
`;

const TextInputOption = styled.div`
  border: 1px solid #eee;
  border-top: none;

  padding: 8px;

  background-color: #fff;
  :hover {
    background-color: #eee;
    cursor: pointer;
  }
`;

export default function TextInputWithOptions({
  disabled,
  onChange,
  options,
  value,
}: {
  disabled?: boolean;
  onChange: (option: string) => void;
  options: string[];
  value: string;
}) {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <TextInputWithOptionsContainer>
      <TextInputContainer>
        <TextInput
          disabled={disabled}
          onBlur={() => setTimeout(() => setIsFocus(false), 400)} // TODO
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocus(true)}
          type="text"
          value={value}
        />
      </TextInputContainer>
      {isFocus && (
        <TextInputOptions>
          {options.map((option) => (
            <TextInputOption key={option} onClick={() => onChange(option)}>
              {option}
            </TextInputOption>
          ))}
        </TextInputOptions>
      )}
    </TextInputWithOptionsContainer>
  );
}
