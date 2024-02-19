/**
 *
 * @param {*} file
 * @returns {Promise <String>} Devuelve una url para poder ver el archivo temporalmente o un error si falla algo
 */
export function fileReader(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        resolve((e.target as FileReader).result as string);
      }
    };
    reader.onerror = (e: ProgressEvent<FileReader>) => {
      reject(e);
    };
  });
}
