import dotenv from "dotenv";
dotenv.config();

import db from "./config/db";
import Guitar from "./models/Guitar.model";

const guitars = [
  {
    brand: "Fender",
    name: "Lukather",
    image: "guitarra_01",
    description:
      "Versatilidad pura y tono cristalino. Diseñada para sesiones de estudio exigentes y solos épicos con un sustain increíble.",
    price: 299,
  },
  {
    brand: "Gibson",
    name: "SRV",
    image: "guitarra_02",
    description:
      "El alma del Texas blues. Pastillas de alta salida y un mástil robusto para un tono grueso, rasgado y lleno de sentimiento.",
    price: 349,
  },
  {
    brand: "Gretsch",
    name: "Borland",
    image: "guitarra_03",
    description:
      "Estética radical y sonido aplastante. Perfecta para riffs pesados, afinaciones bajas y experimentación sonora sin límites.",
    price: 329,
  },
  {
    brand: "Ibanez",
    name: "VAI",
    image: "guitarra_04",
    description:
      "La herramienta definitiva para virtuosos. Cuenta con un puente flotante ultra estable y trastes optimizados para velocidad extrema.",
    price: 299,
  },
  {
    brand: "Ibanez",
    name: "Thompson",
    image: "guitarra_05",
    description:
      "Un clásico atemporal. Ideal para fingerpicking complejo y tonos limpios que cortan la mezcla con una claridad absoluta.",
    price: 399,
  },

  {
    brand: "Gretsch",
    name: "White",
    image: "guitarra_06",
    description:
      "Sonido crudo, vintage y directo. Construcción minimalista diseñada para sacar el máximo fuzz y carácter garage rock.",
    price: 329,
  },
  {
    brand: "Gretsch",
    name: "Cobain",
    image: "guitarra_07",
    description:
      "Actitud grunge en su máxima expresión. Cuerpo asimétrico, humbuckers potentes y lista para desatar el caos en el escenario.",
    price: 349,
  },
  {
    brand: "Jackson",
    name: "Dale",
    image: "guitarra_08",
    description:
      "La reina del surf rock. Tonos brillantes y ataque rápido para un sonido percusivo e inconfundible bañado en reverb.",
    price: 379,
  },
  {
    brand: "Jackson",
    name: "Krieger",
    image: "guitarra_09",
    description:
      "Tonos cálidos y psicodélicos. Su configuración captura la esencia del rock de los 60 con un toque sutil de jazz y blues.",
    price: 289,
  },
  {
    brand: "Schecter",
    name: "Campbell",
    image: "guitarra_10",
    description:
      "El motor del rock americano. Confiable, elegante y con ese brillo característico perfecto para ritmos sólidos y melodías memorables.",
    price: 349,
  },
  {
    brand: "Fender",
    name: "Reed",
    image: "guitarra_11",
    description:
      "Experimental y vanguardista. Ofrece texturas sónicas únicas, ideal para afinaciones alternativas y ritmos hipnóticos.",
    price: 399,
  },
  {
    brand: "Fender",
    name: "Hazel",
    image: "guitarra_12",
    description:
      "Magia funk y psicodelia pura. Dinámica excepcional diseñada para grooves infecciosos y solos extendidos llenos de expresividad.",
    price: 379,
  },
]; 

async function seed() {
  try {
    await db.authenticate();
    await db.sync();
    const count = await Guitar.count();
    if (count > 0) {
      console.log(`La tabla ya tiene ${count} guitarras, no se insertó nada.`);
    } else {
      await Guitar.bulkCreate(guitars);
      console.log(`${guitars.length} guitarras insertadas.`);
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
}

seed();
