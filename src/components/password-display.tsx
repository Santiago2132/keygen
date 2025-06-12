import React from "react";
import { Card, CardBody, Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordDisplayProps {
  password: string;
  copyToClipboard: () => void;
  copied: boolean;
  isGenerating: boolean;
}

export const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  copyToClipboard,
  copied,
  isGenerating
}) => {
  return (
    <Card className="border border-content3 bg-content2/50">
      <CardBody className="p-4 overflow-hidden">
        <div className="flex justify-between items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={password}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }
              }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-lg md:text-xl font-semibold overflow-x-auto scrollbar-hide whitespace-nowrap py-1 flex-1"
              style={{ overflowY: "hidden" }}
            >
              {isGenerating ? "Generando contraseña..." : (password || "Tu contraseña aparecerá aquí")}
            </motion.div>
          </AnimatePresence>

          <Tooltip content={copied ? "¡Copiado!" : "Copiar al portapapeles"}>
            <Button
              isIconOnly
              variant="light"
              color={copied ? "success" : "primary"}
              onPress={copyToClipboard}
              className="min-w-10"
              isDisabled={isGenerating || !password || password === "Selecciona al menos un tipo de carácter"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon icon={copied ? "lucide:check" : "lucide:copy"} className="text-xl" />
                </motion.div>
              </AnimatePresence>
            </Button>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
};