import React from "react";
import { Button, Slider, Checkbox, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface PasswordGeneratorProps {
  passwordLength: number;
  setPasswordLength: (value: number) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (value: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (value: boolean) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (value: boolean) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (value: boolean) => void;
  memorable: boolean;
  setMemorable: (value: boolean) => void;
  generatePassword: () => void;
  isGenerating: boolean;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
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
  isGenerating
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setPasswordLength(value);
    }
  };

  // Determine if the generate button should be disabled
  const isGenerateDisabled = isGenerating || (!memorable && !includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Longitud: {passwordLength}</label>
          <span className="text-xs text-default-400">4-32 caracteres</span>
        </div>
        <Slider
          aria-label="Longitud de contraseña"
          size="sm"
          step={1}
          color="secondary"
          minValue={4}
          maxValue={32}
          value={passwordLength}
          onChange={handleSliderChange}
          className="max-w-full"
          showTooltip
          startContent={
            <Tooltip content="Mínimo 4 caracteres">
              <div className="cursor-help">
                <Icon icon="lucide:text-cursor" className="text-default-400" />
              </div>
            </Tooltip>
          }
          endContent={
            <Tooltip content="Máximo 32 caracteres">
              <div className="cursor-help">
                <Icon icon="lucide:text-cursor-input" className="text-default-400" />
              </div>
            </Tooltip>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Opciones de caracteres</label>
          <div className="flex flex-col gap-2">
            <Checkbox 
              isSelected={includeLowercase} 
              onValueChange={setIncludeLowercase}
              isDisabled={memorable}
              color="primary"
            >
              <span className="text-sm">Minúsculas (a-z)</span>
            </Checkbox>
            <Checkbox 
              isSelected={includeUppercase} 
              onValueChange={setIncludeUppercase}
              isDisabled={memorable}
              color="primary"
            >
              <span className="text-sm">Mayúsculas (A-Z)</span>
            </Checkbox>
            <Checkbox 
              isSelected={includeNumbers} 
              onValueChange={setIncludeNumbers}
              isDisabled={memorable}
              color="primary"
            >
              <span className="text-sm">Números (0-9)</span>
            </Checkbox>
            <Checkbox 
              isSelected={includeSymbols} 
              onValueChange={setIncludeSymbols}
              isDisabled={memorable}
              color="primary"
            >
              <span className="text-sm">Símbolos (@#$)</span>
            </Checkbox>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-1">
        <Checkbox 
          isSelected={memorable} 
          onValueChange={(value) => {
            setMemorable(value);
            if (value) {
              setIncludeLowercase(true);
              setIncludeUppercase(false);
              setIncludeNumbers(false);
              setIncludeSymbols(false);
            }
          }}
          color="secondary"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">Memorable</span>
            <Tooltip content="Genera frases con palabras fáciles de recordar">
              <span className="cursor-help">
                <Icon icon="lucide:info" className="text-xs text-default-400" />
              </span>
            </Tooltip>
          </div>
        </Checkbox>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="pt-2"
      >
        <Button 
          color="primary" 
          variant="shadow"
          onPress={generatePassword}
          className="w-full font-medium"
          startContent={<Icon icon={isGenerating ? "lucide:loader-2" : "lucide:refresh-cw"} className={isGenerating ? "text-lg animate-spin" : "text-lg"} />}
          size="lg"
          isDisabled={isGenerateDisabled}
        >
          {isGenerating ? "Generando..." : "Generar contraseña"}
        </Button>
      </motion.div>
    </motion.div>
  );
};