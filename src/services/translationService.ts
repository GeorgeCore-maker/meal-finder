// Servicio para traducir términos específicos de comida usando una API de traducción
// o un diccionario predefinido

type TranslationCache = Record<string, string>;

class TranslationService {
  private cache: TranslationCache = {};
  
  // Diccionario de traducciones comunes de ingredientes y términos culinarios
  private dictionary: Record<string, string> = {
    // Nombres de platos comunes
    'teriyaki chicken casserole': 'cazuela de pollo teriyaki',
    'chicken handi': 'pollo handi',
    'chicken alfredo primavera': 'pollo alfredo primavera',
    'honey teriyaki salmon': 'salmón teriyaki con miel',
    'mediterranean pasta salad': 'ensalada de pasta mediterránea',
    'katsu chicken curry': 'curry de pollo katsu',
    'kung pao chicken': 'pollo kung pao',
    'lamb tomato and sweet spices': 'cordero con tomate y especias dulces',
    'tandoori chicken': 'pollo tandoori',
    'thai green curry': 'curry verde tailandés',
    'pad thai': 'pad thai',
    'poutine': 'poutine',
    'general tso\'s chicken': 'pollo general tso',
    'new york cheesecake': 'tarta de queso de nueva york',
    'chocolate gateau': 'pastel de chocolate',
    'carrot cake': 'pastel de zanahoria',
    'apple frangipan tart': 'tarta de manzana frangipán',
    'bakewell tart': 'tarta bakewell',
    'banana pancakes': 'panqueques de plátano',
    'beef wellington': 'solomillo wellington',
    'corba': 'sopa corba',
    'burek': 'burek',
    'lasagne': 'lasaña',
    'lasagna': 'lasaña',
    'spaghetti bolognese': 'espaguetis a la boloñesa',
    'carbonara': 'carbonara',
    'pizza': 'pizza',
    'tiramisu': 'tiramisú',
    'minestrone soup': 'sopa minestrone',
    'risotto': 'risotto',
    'osso buco': 'ossobuco',
    'pierogi': 'pierogi',
    'pork cassoulet': 'cassoulet de cerdo',
    'fish stew': 'guiso de pescado',
    'clam chowder': 'sopa de almejas',
    'ceviche': 'ceviche',
    'tacos': 'tacos',
    'burritos': 'burritos',
    'quesadilla': 'quesadilla',
    'enchiladas': 'enchiladas',
    'fajitas': 'fajitas',
    'guacamole': 'guacamole',
    'salsa': 'salsa',
    'mole': 'mole',
    'tamales': 'tamales',
    'empanadas': 'empanadas',
    'paella': 'paella',
    'gazpacho': 'gazpacho',
    'tortilla': 'tortilla',
    'churros': 'churros',
    'flan': 'flan',
    'arroz con pollo': 'arroz con pollo',
    'ropa vieja': 'ropa vieja',
    'arepas': 'arepas',
    
    // Ingredientes comunes
    'chicken': 'pollo',
    'chicken breast': 'pechuga de pollo',
    'chicken thighs': 'muslos de pollo',
    'chicken wings': 'alitas de pollo',
    'beef': 'carne de res',
    'ground beef': 'carne molida',
    'beef steak': 'filete de res',
    'pork': 'cerdo',
    'pork chops': 'chuletas de cerdo',
    'bacon': 'tocino',
    'ham': 'jamón',
    'sausage': 'salchicha',
    'lamb': 'cordero',
    'lamb chops': 'chuletas de cordero',
    'fish': 'pescado',
    'salmon': 'salmón',
    'tuna': 'atún',
    'cod': 'bacalao',
    'tilapia': 'tilapia',
    'shrimp': 'camarón',
    'prawns': 'gambas',
    'lobster': 'langosta',
    'crab': 'cangrejo',
    'mussels': 'mejillones',
    'clams': 'almejas',
    'oysters': 'ostras',
    'scallops': 'vieiras',
    'squid': 'calamar',
    'octopus': 'pulpo',
    'rice': 'arroz',
    'white rice': 'arroz blanco',
    'brown rice': 'arroz integral',
    'jasmine rice': 'arroz jazmín',
    'basmati rice': 'arroz basmati',
    'pasta': 'pasta',
    'spaghetti': 'espagueti',
    'penne': 'penne',
    'fettuccine': 'fettuccine',
    'linguine': 'linguini',
    'macaroni': 'macarrones',
    'noodles': 'fideos',
    'egg noodles': 'fideos de huevo',
    'rice noodles': 'fideos de arroz',
    'beans': 'frijoles',
    'black beans': 'frijoles negros',
    'kidney beans': 'frijoles rojos',
    'pinto beans': 'frijoles pintos',
    'chickpeas': 'garbanzos',
    'lentils': 'lentejas',
    'peas': 'guisantes',
    'green beans': 'ejotes',
    'potato': 'papa',
    'potatoes': 'papas',
    'sweet potato': 'camote',
    'sweet potatoes': 'camotes',
    'tomato': 'tomate',
    'tomatoes': 'tomates',
    'cherry tomatoes': 'tomates cherry',
    'tomato sauce': 'salsa de tomate',
    'tomato paste': 'pasta de tomate',
    'onion': 'cebolla',
    'onions': 'cebollas',
    'red onion': 'cebolla morada',
    'green onions': 'cebollas verdes',
    'scallions': 'cebolletas',
    'shallots': 'chalotes',
    'garlic': 'ajo',
    'garlic cloves': 'dientes de ajo',
    'garlic powder': 'ajo en polvo',
    'ginger': 'jengibre',
    'fresh ginger': 'jengibre fresco',
    'ground ginger': 'jengibre molido',
    'pepper': 'pimienta',
    'black pepper': 'pimienta negra',
    'white pepper': 'pimienta blanca',
    'bell pepper': 'pimiento',
    'green pepper': 'pimiento verde',
    'red pepper': 'pimiento rojo',
    'jalapeño': 'jalapeño',
    'chili pepper': 'chile',
    'chili peppers': 'chiles',
    'salt': 'sal',
    'sea salt': 'sal marina',
    'kosher salt': 'sal kosher',
    'sugar': 'azúcar',
    'brown sugar': 'azúcar morena',
    'powdered sugar': 'azúcar glass',
    'granulated sugar': 'azúcar granulada',
    'flour': 'harina',
    'all-purpose flour': 'harina para todo uso',
    'wheat flour': 'harina de trigo',
    'corn flour': 'harina de maíz',
    'cornstarch': 'maicena',
    'butter': 'mantequilla',
    'unsalted butter': 'mantequilla sin sal',
    'margarine': 'margarina',
    'oil': 'aceite',
    'olive oil': 'aceite de oliva',
    'vegetable oil': 'aceite vegetal',
    'canola oil': 'aceite de canola',
    'sesame oil': 'aceite de sésamo',
    'coconut oil': 'aceite de coco',
    'milk': 'leche',
    'whole milk': 'leche entera',
    'skim milk': 'leche descremada',
    'almond milk': 'leche de almendra',
    'coconut milk': 'leche de coco',
    'heavy cream': 'crema espesa',
    'cream': 'crema',
    'sour cream': 'crema agria',
    'whipping cream': 'crema para batir',
    'cheese': 'queso',
    'cheddar cheese': 'queso cheddar',
    'mozzarella': 'mozzarella',
    'parmesan': 'parmesano',
    'parmesan cheese': 'queso parmesano',
    'feta cheese': 'queso feta',
    'cream cheese': 'queso crema',
    'goat cheese': 'queso de cabra',
    'blue cheese': 'queso azul',
    'egg': 'huevo',
    'eggs': 'huevos',
    'egg whites': 'claras de huevo',
    'egg yolks': 'yemas de huevo',
    'bread': 'pan',
    'white bread': 'pan blanco',
    'wheat bread': 'pan de trigo',
    'baguette': 'baguette',
    'pita bread': 'pan pita',
    'tortillas': 'tortillas',
    'corn tortillas': 'tortillas de maíz',
    'flour tortillas': 'tortillas de harina',
    
    // Vegetales
    'carrot': 'zanahoria',
    'carrots': 'zanahorias',
    'celery': 'apio',
    'broccoli': 'brócoli',
    'cauliflower': 'coliflor',
    'zucchini': 'calabacín',
    'eggplant': 'berenjena',
    'asparagus': 'espárragos',
    'artichoke': 'alcachofa',
    'mushroom': 'champiñón',
    'mushrooms': 'champiñones',
    'spinach': 'espinaca',
    'lettuce': 'lechuga',
    'cucumber': 'pepino',
    'cabbage': 'repollo',
    'kale': 'col rizada',
    'brussels sprouts': 'coles de bruselas',
    'radish': 'rábano',
    'beet': 'remolacha',
    'turnip': 'nabo',
    'squash': 'calabaza',
    'pumpkin': 'calabaza',
    'corn': 'maíz',
    
    // Frutas
    'lemon': 'limón',
    'lime': 'lima',
    'orange': 'naranja',
    'apple': 'manzana',
    'banana': 'plátano',
    'strawberry': 'fresa',
    'strawberries': 'fresas',
    'blueberry': 'arándano',
    'blueberries': 'arándanos',
    'raspberry': 'frambuesa',
    'blackberry': 'mora',
    'mango': 'mango',
    'pineapple': 'piña',
    'watermelon': 'sandía',
    'melon': 'melón',
    'peach': 'durazno',
    'pear': 'pera',
    'grape': 'uva',
    'grapes': 'uvas',
    'cherry': 'cereza',
    'cherries': 'cerezas',
    'plum': 'ciruela',
    'apricot': 'albaricoque',
    'kiwi': 'kiwi',
    'papaya': 'papaya',
    'avocado': 'aguacate',
    
    // Líquidos y condimentos
    'water': 'agua',
    'wine': 'vino',
    'red wine': 'vino tinto',
    'white wine': 'vino blanco',
    'beer': 'cerveza',
    'broth': 'caldo',
    'chicken broth': 'caldo de pollo',
    'beef broth': 'caldo de res',
    'vegetable broth': 'caldo de verduras',
    'stock': 'caldo',
    'vinegar': 'vinagre',
    'balsamic vinegar': 'vinagre balsámico',
    'apple cider vinegar': 'vinagre de manzana',
    'soy sauce': 'salsa de soja',
    'worcestershire sauce': 'salsa inglesa',
    'hot sauce': 'salsa picante',
    'ketchup': 'ketchup',
    'mustard': 'mostaza',
    'mayonnaise': 'mayonesa',
    'ranch dressing': 'aderezo ranch',
    
    // Especias y hierbas
    'cinnamon': 'canela',
    'basil': 'albahaca',
    'parsley': 'perejil',
    'cilantro': 'cilantro',
    'coriander': 'cilantro',
    'oregano': 'orégano',
    'thyme': 'tomillo',
    'rosemary': 'romero',
    'sage': 'salvia',
    'mint': 'menta',
    'dill': 'eneldo',
    'bay leaf': 'hoja de laurel',
    'bay leaves': 'hojas de laurel',
    'chili': 'chile',
    'chili powder': 'chile en polvo',
    'cumin': 'comino',
    'paprika': 'pimentón',
    'cayenne pepper': 'pimienta de cayena',
    'turmeric': 'cúrcuma',
    'cardamom': 'cardamomo',
    'nutmeg': 'nuez moscada',
    'cloves': 'clavos de olor',
    'anise': 'anís',
    'fennel': 'hinojo',
    'curry powder': 'curry en polvo',
    'chili flakes': 'hojuelas de chile',
    'red pepper flakes': 'hojuelas de pimiento rojo',
    
    // Dulces y postres
    'honey': 'miel',
    'chocolate': 'chocolate',
    'dark chocolate': 'chocolate oscuro',
    'milk chocolate': 'chocolate con leche',
    'white chocolate': 'chocolate blanco',
    'cocoa powder': 'cacao en polvo',
    'vanilla': 'vainilla',
    'vanilla extract': 'extracto de vainilla',
    'coconut': 'coco',
    'shredded coconut': 'coco rallado',
    'maple syrup': 'jarabe de arce',
    'caramel': 'caramelo',
    'jam': 'mermelada',
    'jelly': 'jalea',
    'peanut butter': 'mantequilla de maní',
    'almond butter': 'mantequilla de almendra',
    'nutella': 'nutella',
    
    // Frutos secos y semillas
    'almonds': 'almendras',
    'walnuts': 'nueces',
    'pecans': 'nueces pecanas',
    'cashews': 'anacardos',
    'pistachios': 'pistachos',
    'peanuts': 'cacahuates',
    'hazelnuts': 'avellanas',
    'pine nuts': 'piñones',
    'sunflower seeds': 'semillas de girasol',
    'pumpkin seeds': 'semillas de calabaza',
    'sesame seeds': 'semillas de sésamo',
    'chia seeds': 'semillas de chía',
    'flax seeds': 'semillas de lino',
    
    // Medidas
    'cup': 'taza',
    'cups': 'tazas',
    'tablespoon': 'cucharada',
    'tablespoons': 'cucharadas',
    'teaspoon': 'cucharadita',
    'teaspoons': 'cucharaditas',
    'pound': 'libra',
    'pounds': 'libras',
    'ounce': 'onza',
    'ounces': 'onzas',
    'gram': 'gramo',
    'grams': 'gramos',
    'kilogram': 'kilogramo',
    'liter': 'litro',
    'milliliter': 'mililitro',
    'pinch': 'pizca',
    'dash': 'pizca',
    'to taste': 'al gusto',
    
    // Acciones culinarias
    'chopped': 'picado',
    'diced': 'cortado en cubos',
    'sliced': 'rebanado',
    'minced': 'picado fino',
    'crushed': 'triturado',
    'ground': 'molido',
    'fresh': 'fresco',
    'dried': 'seco',
    'frozen': 'congelado',
    'cooked': 'cocido',
    'raw': 'crudo',
    'boiled': 'hervido',
    'fried': 'frito',
    'baked': 'horneado',
    'grilled': 'asado',
    'roasted': 'rostizado',
    'steamed': 'al vapor',
    
    // Áreas/Países
    'british': 'británica',
    'american': 'americana',
    'chinese': 'china',
    'french': 'francesa',
    'italian': 'italiana',
    'japanese': 'japonesa',
    'mexican': 'mexicana',
    'indian': 'india',
    'thai': 'tailandesa',
    'greek': 'griega',
    'spanish': 'española',
    'turkish': 'turca',
    'vietnamese': 'vietnamita',
    'moroccan': 'marroquí',
    'jamaican': 'jamaiquina',
    'canadian': 'canadiense',
    'irish': 'irlandesa',
    'polish': 'polaca',
    'portuguese': 'portuguesa',
    'russian': 'rusa',
    'tunisian': 'tunecina',
    'croatian': 'croata',
    'dutch': 'holandesa',
    'egyptian': 'egipcia',
    'filipino': 'filipina',
    'kenyan': 'keniana',
    'malaysian': 'malasia',
    'ukrainian': 'ucraniana',
    
    // Categorías de comida (las básicas ya están arriba como ingredientes)
    'dessert': 'postre',
    'miscellaneous': 'varios',
    'side': 'guarnición',
    'starter': 'entrada',
    'vegan': 'vegano',
    'vegetarian': 'vegetariano',
    'breakfast': 'desayuno',
  };

  // Diccionario inverso para traducir de español a inglés
  private reverseDictionary: Record<string, string> = {};

  constructor() {
    // Crear diccionario inverso automáticamente
    for (const [english, spanish] of Object.entries(this.dictionary)) {
      this.reverseDictionary[spanish.toLowerCase()] = english;
    }
  }

  async translate(text: string, targetLang: 'es' | 'en'): Promise<string> {
    // Validar entrada
    if (!text || text.trim() === '') {
      return text || '';
    }

    if (targetLang === 'en') {
      return text;
    }

    // Si ya está en caché, devolver el valor
    const cacheKey = `${text}_${targetLang}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    // Intentar traducción con el diccionario
    const lowerText = text.toLowerCase().trim();
    
    // Buscar coincidencia exacta
    if (this.dictionary[lowerText]) {
      const translated = this.capitalizeFirst(this.dictionary[lowerText]);
      this.cache[cacheKey] = translated;
      return translated;
    }

    // Si no está en el diccionario, usar API de traducción
    try {
      const apiTranslation = await this.translateWithAPI(text, targetLang);
      if (apiTranslation && apiTranslation !== text) {
        this.cache[cacheKey] = apiTranslation;
        return apiTranslation;
      }
    } catch (error) {
      console.warn('Error en traducción API, usando texto original:', error);
    }

    // Si todo falla, devolver el texto original
    this.cache[cacheKey] = text;
    return text;
  }

  private async translateWithAPI(text: string, targetLang: 'es' | 'en'): Promise<string> {
    // Usar MyMemory Translation API (gratuita, sin API key, 1000 palabras/día)
    const sourceLang = 'en';
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      
      return text;
    } catch (error) {
      console.error('Error al traducir con API:', error);
      return text;
    }
  }

  async translateInstruction(instruction: string, targetLang: 'es' | 'en'): Promise<string> {
    if (!instruction || targetLang === 'en') {
      return instruction;
    }

    // Si ya está en caché, devolver el valor
    const cacheKey = `instruction_${instruction.substring(0, 50)}_${targetLang}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    // Dividir las instrucciones en oraciones para traducir mejor
    const sentences = instruction.split(/\.\s+/);
    
    try {
      const translatedSentences = await Promise.all(
        sentences.map(async (sentence) => {
          if (sentence.trim() === '') return '';
          
          // Intentar traducir con API
          try {
            const translated = await this.translateWithAPI(sentence, targetLang);
            return translated;
          } catch (error) {
            // Si falla, traducir palabras clave del diccionario
            let result = sentence;
            for (const [key, value] of Object.entries(this.dictionary)) {
              const regex = new RegExp(`\\b${key}\\b`, 'gi');
              result = result.replace(regex, (match) => {
                if (match[0] === match[0].toUpperCase()) {
                  return this.capitalizeFirst(value);
                }
                return value;
              });
            }
            return result;
          }
        })
      );
      
      const fullTranslation = translatedSentences.join('. ');
      this.cache[cacheKey] = fullTranslation;
      return fullTranslation;
    } catch (error) {
      console.error('Error al traducir instrucciones:', error);
      return instruction;
    }
  }

  // Traducir de español a inglés para búsquedas
  async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim() === '') {
      return text || '';
    }

    const lowerText = text.toLowerCase().trim();
    
    // Buscar coincidencia exacta en el diccionario inverso
    if (this.reverseDictionary[lowerText]) {
      return this.reverseDictionary[lowerText];
    }

    // Intentar traducir con API de español a inglés
    try {
      const apiTranslation = await this.translateWithAPIReverse(text);
      if (apiTranslation && apiTranslation !== text) {
        return apiTranslation;
      }
    } catch (error) {
      console.warn('Error en traducción API (ES->EN), usando texto original:', error);
    }

    // Si no se encuentra traducción, devolver el texto original (puede que ya esté en inglés)
    return text;
  }

  private async translateWithAPIReverse(text: string): Promise<string> {
    // Traducir de español a inglés usando MyMemory API
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      
      return text;
    } catch (error) {
      console.error('Error al traducir de ES a EN con API:', error);
      return text;
    }
  }

  private capitalizeFirst(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export const translationService = new TranslationService();
