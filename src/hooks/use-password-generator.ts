import React from "react";

// Lista de palabras en español para contraseñas memorables
const spanishWords = [
  "casa", "perro", "gato", "sol", "luna", "mar", "cielo", "tierra", "fuego", "agua",
  "aire", "libro", "mesa", "silla", "puerta", "ventana", "árbol", "flor", "río", "montaña",
  "ciudad", "pueblo", "calle", "camino", "coche", "bici", "tren", "avión", "barco", "playa",
  "campo", "bosque", "jardín", "parque", "escuela", "trabajo", "oficina", "tienda", "café", "hotel",
  "amigo", "familia", "padre", "madre", "hijo", "hija", "hermano", "hermana", "abuelo", "abuela"
];

export const usePasswordGenerator = () => {
  const [password, setPassword] = React.useState<string>("");
  const [passwordLength, setPasswordLength] = React.useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = React.useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = React.useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = React.useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = React.useState<boolean>(true);
  const [memorable, setMemorable] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  // Función para generar una contraseña aleatoria
  const generatePassword = React.useCallback(async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simular retraso para feedback visual

    if (memorable) {
      // Generar una contraseña memorable con palabras
      let result = "";
      const wordsNeeded = Math.max(1, Math.floor(passwordLength / 5));
      
      for (let i = 0; i < wordsNeeded; i++) {
        const randomWord = spanishWords[Math.floor(Math.random() * spanishWords.length)];
        // Capitalizar la primera letra de algunas palabras aleatoriamente
        const word = Math.random() > 0.5 
          ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) 
          : randomWord;
        
        result += word;
      }
      
      // Ajustar la longitud si es necesario
      if (result.length > passwordLength) {
        result = result.substring(0, passwordLength);
      } else if (result.length < passwordLength) {
        // Añadir números al final si es necesario
        while (result.length < passwordLength) {
          result += Math.floor(Math.random() * 10);
        }
      }
      
      setPassword(result);
      setIsGenerating(false);
      return;
    }

    // Verificar que al menos una opción esté seleccionada
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      setPassword("Selecciona al menos un tipo de carácter");
      setIsGenerating(false);
      return;
    }

    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let result = "";
    const charsetLength = charset.length;

    for (let i = 0; i < passwordLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charsetLength));
    }

    setPassword(result);
    setIsGenerating(false);
  }, [
    passwordLength,
    includeNumbers,
    includeSymbols,
    includeUppercase,
    includeLowercase,
    memorable
  ]);

  // Función para copiar la contraseña al portapapeles
  const copyToClipboard = React.useCallback(() => {
    if (!password || password === "Selecciona al menos un tipo de carácter") return;
    
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [password]);

  // Generar una contraseña inicial al cargar
  React.useEffect(() => {
    generatePassword();
  }, []);

  return {
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
    copied,
    isGenerating
  };
};