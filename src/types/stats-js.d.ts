declare module "stats.js" {
  class Stats {
    constructor(config?: { maxFPS?: number; maxMem?: number; maxCpu?: number });

    // Properties
    dom: HTMLDivElement;
    domElement: HTMLDivElement;
    REVISION: number;

    // Methods
    addPanel(panel: Stats.Panel): Stats.Panel;
    showPanel(id: number): void;
    begin(): void;
    end(): number;
    update(): void;
    setMode(id: number): void;

    // Panel types
    static Panel: {
      new (name: string, foreground: string, background: string): Stats.Panel;
    };
  }

  namespace Stats {
    interface Panel {
      dom: HTMLCanvasElement;
      update(value: number, maxValue: number): void;
      name: string;
      fg: string;
      bg: string;
    }
  }

  export = Stats;
}
