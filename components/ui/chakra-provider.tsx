"use client"

import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem, system } from "@chakra-ui/react/preset";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}