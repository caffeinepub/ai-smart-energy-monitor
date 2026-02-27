import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EnergyReading {
    kWh: number;
    device: string;
    timestamp: Time;
    location: string;
}
export interface CarbonEmissionCalculation {
    emissionFactor: number;
    co2Kg: number;
    energyKWh: number;
    timestamp: Time;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface SmartAlert {
    id: bigint;
    alertType: string;
    acknowledged: boolean;
    message: string;
    timestamp: Time;
    severity: bigint;
}
export type Time = bigint;
export interface NetZeroProgress {
    currentEmissions: number;
    progressPercentage: number;
    targetEmissions: number;
}
export interface CostSaving {
    timestamp: Time;
    amount: number;
}
export interface AIRecommendation {
    id: bigint;
    applied: boolean;
    estimatedSavings: number;
    message: string;
    priority: bigint;
}
export interface CarbonFootprint {
    timestamp: Time;
    reductionKg: number;
}
export interface ROICalculation {
    monthlySavings: number;
    investmentAmount: number;
    timestamp: Time;
    roiMonths: number;
}
export interface AnomalyLog {
    anomalyType: string;
    severityScore: bigint;
    device: string;
    timestamp: Time;
}
export interface DeviceEfficiency {
    efficiencyScore: number;
    deviceId: string;
}
export interface DeviceStatus {
    status: string;
    deviceId: string;
    deviceType: string;
    healthScore: bigint;
    location: string;
}
export interface backendInterface {
    acknowledgeAlert(alertId: bigint): Promise<void>;
    addDeviceEfficiency(efficiency: DeviceEfficiency): Promise<void>;
    addRecommendation(rec: AIRecommendation): Promise<void>;
    createAlert(alert: SmartAlert): Promise<void>;
    getEnergyReadingsByDevice(device: string): Promise<Array<EnergyReading>>;
    getNetZeroProgress(): Promise<NetZeroProgress | null>;
    getTopEfficientDevices(limit: bigint): Promise<Array<DeviceEfficiency>>;
    logAnomaly(anomaly: AnomalyLog): Promise<void>;
    registerDevice(device: DeviceStatus): Promise<void>;
    storeCarbonCalculation(calc: CarbonEmissionCalculation): Promise<void>;
    storeCarbonFootprint(fp: CarbonFootprint): Promise<void>;
    storeCostSaving(saving: CostSaving): Promise<void>;
    storeEnergyReading(reading: EnergyReading): Promise<void>;
    storeROICalculation(roi: ROICalculation): Promise<void>;
    submitContactMessage(msg: ContactMessage): Promise<void>;
    updateNetZeroProgress(progress: NetZeroProgress): Promise<void>;
}
