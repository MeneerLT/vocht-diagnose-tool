
/**
 * Service to interact with the Dutch Kadaster BAG API v2
 * DOCS: https://github.com/lvbag/BAG-API/tree/master/Individuele%20Bevragingen
 */

const API_KEY = 'l72a47fc524085463985594c5a10283425';
const BASE_URL = 'https://corsproxy.io/?' + encodeURIComponent('https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2');

export interface BagAddressResult {
  street: string;
  city: string;
  constructionYear: number | null;
  error?: string;
}

/**
 * Probeert data op te halen van een URL. Geeft null terug bij fouten, gooit geen error.
 */
const safeFetch = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'application/hal+json',
        'Accept-Crs': 'epsg:28992' 
      }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (e) {
    console.warn(`Fetch error for ${url}:`, e);
    return null;
  }
};

export const fetchBagData = async (zipcode: string, houseNumberInput: string): Promise<BagAddressResult> => {
  console.log(`🔍 BAG Start: ${zipcode} ${houseNumberInput}`);
  
  // 1. Input schonen
  const formattedZip = zipcode.replace(/\s/g, '').toUpperCase();
  const numberMatch = houseNumberInput.match(/^(\d+)/);
  const houseNumberBase = numberMatch ? numberMatch[1] : houseNumberInput;
  const inputAddition = houseNumberInput.replace(houseNumberBase, '').trim().toLowerCase();

  try {
    // --------------------------------------------------------
    // STAP 1: ADRES ZOEKEN
    // --------------------------------------------------------
    const addressUrl = `${BASE_URL}/adressen?postcode=${formattedZip}&huisnummer=${houseNumberBase}&exacteMatch=false`;
    const addressData = await safeFetch(addressUrl);

    if (!addressData || !addressData._embedded || !addressData._embedded.adressen || addressData._embedded.adressen.length === 0) {
      throw new Error('Adres niet gevonden in BAG');
    }

    // Filteren: Zoek de beste match
    const addresses = addressData._embedded.adressen;
    let selectedAdres = addresses[0];

    if (addresses.length > 1) {
       const exactMatch = addresses.find((addr: any) => {
         const letter = (addr.huisletter || '').toLowerCase();
         const toevoeging = (addr.huisnummertoevoeging || '').toLowerCase();
         const bagFullAddition = (letter + toevoeging).trim();
         return bagFullAddition === inputAddition || bagFullAddition === inputAddition.replace(/[^a-z0-9]/g, '');
       });
       if (exactMatch) selectedAdres = exactMatch;
    }

    const result: BagAddressResult = {
      street: selectedAdres.openbareRuimteNaam,
      city: selectedAdres.woonplaatsNaam,
      constructionYear: null
    };

    // --------------------------------------------------------
    // STAP 2: BOUWJAAR OPHALEN
    // --------------------------------------------------------
    // We gebruiken direct het Pand ID uit het adresresultaat.
    const pandIds: string[] = selectedAdres.pandIdentificaties || [];

    if (pandIds.length > 0) {
        const pandId = pandIds[0];
        const pandData = await safeFetch(`${BASE_URL}/panden/${pandId}`);
        
        if (pandData) {
            const p = pandData.pand || pandData;
            if (p.oorspronkelijkBouwjaar) {
                result.constructionYear = p.oorspronkelijkBouwjaar;
            }
        }
    }

    console.log('🏁 BAG Resultaat:', result);
    return result;

  } catch (error) {
    console.error('❌ BAG API Error:', error);
    throw error;
  }
};