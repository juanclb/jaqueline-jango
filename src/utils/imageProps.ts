import fs from "fs/promises";
import path from "path";
import imageSize from "image-size";

// Caminho do arquivo de cache
const cacheFile = path.join(process.cwd(), "image-cache.json");

// Interface para as propriedades da imagem
interface ImageProps {
  src: string;
  width: number;
  height: number;
}

// Função para obter dimensões com cache
export async function getImageProps(src: string): Promise<ImageProps> {
  // Tenta ler o cache
  let cache: { [key: string]: ImageProps } = {};
  try {
    cache = JSON.parse(await fs.readFile(cacheFile, "utf-8"));
  } catch {
    // Arquivo de cache não existe, será criado
  }

  // Verifica se a imagem está no cache
  if (cache[src]) {
    return cache[src];
  }

  // Faz o download da imagem para um buffer
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${src}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());

  // Extrai dimensões com image-size
  const { width, height } = imageSize(buffer);
  if (!width || !height) {
    throw new Error(`Failed to extract dimensions for: ${src}`);
  }

  // Monta as propriedades da imagem
  const imageProps: ImageProps = {
    src,
    width,
    height,
  };

  // Atualiza o cache
  cache[src] = imageProps;
  try {
    await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error("Erro ao salvar cache:", error);
  }

  return imageProps;
}
