const PESOS_PRIMEIRO_DV = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_SEGUNDO_DV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function calcularDigito(caracteres, pesos) {
  let soma = 0;
  for (let i = 0; i < caracteres.length; i++) {
    const valor = caracteres.charCodeAt(i) - 48;
    soma += valor * pesos[i];
  }

  const resto = soma % 11;
  if (resto < 2) return 0;
  return 11 - resto;
}

export function validar(cnpj) {
  if (!cnpj) return false;

  cnpj = cnpj
    .replace(/\./g, "")
    .replace(/\//g, "")
    .replace(/-/g, "")
    .toUpperCase();

  if (cnpj.length !== 14) return false;

  const base = cnpj.substring(0, 12);
  const digitosInformados = cnpj.substring(12);

  if (!/^[A-Z0-9]{12}$/.test(base)) return false;

  if (!/^[0-9]{2}$/.test(digitosInformados)) return false;

  const primeiroDV = calcularDigito(base, PESOS_PRIMEIRO_DV);
  const segundoDV = calcularDigito(base + primeiroDV, PESOS_SEGUNDO_DV);

  const calculado = `${primeiroDV}${segundoDV}`;

  return calculado === digitosInformados;
}
