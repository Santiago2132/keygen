import React from "react";
import { Card, CardBody, Button, Slider, CheckboxGroup, Checkbox, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PasswordGenerator } from "./components/password-generator";
import { PasswordDisplay } from "./components/password-display";
import { usePasswordGenerator } from "./hooks/use-password-generator";

export default function App() {
  const {
    password,
    passwordLength,
    setPasswordLength,
    includeNumbers,
    setIncludeNumbers,
    includeSymbols,
    setIncludeSymbols,
    includeUppercase,
    setIncludeUppercase,
    includeLowercase,
    setIncludeLowercase,
    memorable,
    setMemorable,
    generatePassword,
    copyToClipboard,
    copied
  } = usePasswordGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-xl border border-content2 overflow-visible">
          <CardBody className="p-6 md:p-8 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-1">
                KeyGen
              </h1>
              <p className="text-center text-default-500 text-sm mb-6">
                Contraseñas que recuerdas y protegen
              </p>
            </motion.div>

            <PasswordDisplay 
              password={password} 
              copyToClipboard={copyToClipboard} 
              copied={copied} 
            />

            <PasswordGenerator
              passwordLength={passwordLength}
              setPasswordLength={setPasswordLength}
              includeNumbers={includeNumbers}
              setIncludeNumbers={setIncludeNumbers}
              includeSymbols={includeSymbols}
              setIncludeSymbols={setIncludeSymbols}
              includeUppercase={includeUppercase}
              setIncludeUppercase={setIncludeUppercase}
              includeLowercase={includeLowercase}
              setIncludeLowercase={setIncludeLowercase}
              memorable={memorable}
              setMemorable={setMemorable}
              generatePassword={generatePassword}
            />
          </CardBody>
        </Card>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 text-center text-xs text-default-400"
        >
          Desarrollado con <Icon icon="lucide:heart" className="inline-block text-danger mx-1" /> para tu seguridad digital
        </motion.div>
      </motion.div>
    </div>
  );
}