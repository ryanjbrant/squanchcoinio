declare module 'blotter' {
  export class Text {
    constructor(text: string, options: {
      family: string;
      size: number;
      fill: string;
      paddingLeft?: number;
      paddingRight?: number;
      weight?: number;
      leading?: number;
      tracking?: number;
    });
  }

  export class Material {
    constructor();
    uniforms: {
      uSpeed: { value: number };
      uVolatility: { value: number };
      uSeed: { value: number };
      [key: string]: { value: number };
    };
  }

  export class LiquidDistortMaterial extends Material {
    constructor();
  }

  export default class Blotter {
    static Text: typeof Text;
    static Material: typeof Material;
    static LiquidDistortMaterial: typeof LiquidDistortMaterial;
    texts: Text[];
    constructor(material: Material, options: { texts: Text[] });
    forText(text: Text): { domElement: HTMLElement };
    destroy(): void;
  }
} 