export enum HandToolsCategory {
  HAMMER = 'Hammer',
  HAND_SAW = 'Hand Saw',
  WRENCH = 'Wrench',
  SCREWDRIVER = 'Screwdriver',
  PLIERS = 'Pliers',
  CHISELS = 'Chisels',
  MEASURES = 'Measures',
}

export enum PowerTools {
  GRINDER = 'Grinder',
  SANDER = 'Sander',
  SAW = 'Saw',
  DRILL = 'Drill',
}

export enum OtherCategories {
  TOOL_BELTS = 'Tool Belts',
  STORAGE = 'Storage Solutions',
  WORKBENCH = 'Workbench',
  SAFETY = 'Safety Gear',
  FASTENERS = 'Fasteners',
}

export type Category = HandToolsCategory | PowerTools | OtherCategories;