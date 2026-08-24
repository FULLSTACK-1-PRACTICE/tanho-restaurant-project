export function formatSum(n: number): string {
    return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' so‘m';
}

export function fileToBase64(
  file: File,
  maxWidth = 900,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);

        const canvas = document.createElement("canvas");

        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Canvas yaratib bo'lmadi"));
        }

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = () =>
        reject(new Error("Rasmni o'qib bo'lmadi"));

      img.src = reader.result as string;
    };

    reader.onerror = () =>
      reject(new Error("Faylni o'qib bo'lmadi"));

    reader.readAsDataURL(file);
  });
}