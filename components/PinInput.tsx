'use client'
import useProps from "@/lib/useProps"
import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react"
import * as React from "react"

export interface PinInputProps extends ChakraPinInput.RootProps {
  rootRef?: React.RefObject<HTMLDivElement | null>
  count?: number
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  attached?: boolean
}

export const PinInput = React.forwardRef<HTMLInputElement, PinInputProps>(
  function PinInput(props, ref) {
    const {setEnteredCode} = useProps();
    const { count = 6, inputProps, rootRef, attached, ...rest } = props
    return (
      <ChakraPinInput.Root ref={rootRef} {...rest} size={'lg'} autoFocus required onValueComplete={(value) => setEnteredCode(value.valueAsString)} >
        <ChakraPinInput.HiddenInput ref={ref} {...inputProps} />
        <ChakraPinInput.Control>
          <Group attached={attached}>
            {Array.from({ length: count }).map((_, index) => (
              <ChakraPinInput.Input key={index} index={index}  />
            ))}
          </Group>
        </ChakraPinInput.Control>
      </ChakraPinInput.Root>
    )
  },
)
