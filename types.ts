import React from 'react';

export interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  path: string;
  icon?: React.ReactNode;
}

export interface AppModule {
  id: string;
  name: string;
  description: string;
  path: string; // Base path for the module, not used for direct navigation here
  icon: React.ReactNode;
  features: ModuleFeature[];
}

export enum WeldingProcess {
  SMAW = "SMAW (Electrodo Revestido / MMA)",
  GMAW = "GMAW (MIG/MAG)",
  FCAW = "FCAW (Flux-Cored Arc Welding)",
  GTAW = "GTAW (TIG)",
  SAW = "SAW (Arco Sumergido)",
  PAW = "PAW (Soldadura por Plasma)",
  LBW = "LBW (Soldadura Láser)",
  OAW = "OAW (Oxicorte/Soldadura Oxiacetilénica)"
}

export enum MaterialType {
  CARBON_STEEL = "Acero al Carbono",
  STAINLESS_STEEL = "Acero Inoxidable",
  ALUMINUM = "Aluminio",
  TITANIUM = "Titanio",
  CAST_IRON = "Hierro Fundido",
  COPPER_ALLOYS = "Aleaciones de Cobre",
  NICKEL_ALLOYS = "Aleaciones de Níquel"
}

export interface WeldingParameters {
  process?: WeldingProcess;
  material?: MaterialType;
  thickness?: number; // in mm
  jointType?: string; // e.g., " बट (Butt)", "Filete (Fillet)", "Solape (Lap)"
  electrodeType?: string;
  electrodeDiameter?: number; // in mm
  wireDiameter?: number; // in mm
  voltage?: number; // in Volts
  amperage?: number; // in Amps
  wireSpeed?: number; // in m/min or ipm
  gasType?: string; // e.g., "Argón", "CO2", "Mezcla Ar/CO2"
  gasFlowRate?: number; // in L/min or CFH
  polarity?: string; // e.g., "DCEN", "DCEP", "AC"
  travelSpeed?: number; // in mm/min or ipm
}

export interface Defect {
  id: string;
  name: string;
  description: string;
  // image?: string; // Removed as per user request
  possibleCauses: string[];
  recommendedSolutions: string[];
}

export interface WeldingJob {
  id: string;
  name: string;
  createdAt: string;
  parameters: WeldingParameters;
  notes?: string;
}

export interface SafetyChecklistItem {
  id: string;
  text: string;
  category: string; // e.g., "EPI", "Entorno", "Material"
  details?: string;
}

export interface WeldingProcessInfo {
  id: string; // e.g., 'gmaw', 'smaw'
  name: string; // e.g., "GMAW (MIG/MAG)"
  description: string;
  advantages: string[];
  limitations: string[];
  typicalApplications: string[];
  commonParameters?: string; // General tips or common settings
  variant?: string; // e.g. MIG, MAG, short-circuit, spray, pulsed for GMAW
}

export interface NdtMethodInfo {
  id: string; // e.g., 'vt', 'pt'
  name: string; // e.g., "Inspección Visual (VT)"
  abbreviation: string; // e.g., "VT"
  principle: string;
  description: string;
  applications: string[];
  advantages: string[];
  limitations: string[];
}

export type JointTypeCalc = 'butt_v' | 'fillet' | 'butt_square';

export interface JointPrepInputs {
  jointType: JointTypeCalc; 
  thickness1: number; 
  thickness2?: number; 
  grooveAngle?: number; 
  rootOpening?: number; 
  legLength1?: number; 
  legLength2?: number; 
  density?: number; // g/cm^3, e.g., steel ~7.85
}

export interface JointPrepOutput {
  crossSectionalArea?: string; // e.g., "XX mm^2"
  volumePerUnitLength?: string; // e.g., "YY cm^3/m"
  weightPerUnitLength?: string; // e.g., "ZZ kg/m"
  notes: string;
}

export interface FillerMetalCostInputs {
  weldLength: number; // meters
  crossSectionalArea: number; // mm^2
  materialDensity: number; // g/cm^3
  depositionEfficiency: number; // percentage 0-100
  fillerMetalCostPerKg: number; // currency/kg
  gasCostPerMeter?: number; // currency/meter of weld (optional)
  laborCostPerHour: number; // currency/hour
  weldingSpeed: number; // m/hour
}

export interface FillerMetalCostOutput {
  totalFillerMetalRequiredKg: string;
  fillerMetalCost: string;
  gasCost?: string;
  laborCost: string;
  totalWeldCost: string;
  notes: string;
}