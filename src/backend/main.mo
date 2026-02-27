import Map "mo:core/Map";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type EnergyReading = {
    timestamp : Time.Time;
    kWh : Float;
    device : Text;
    location : Text;
  };

  type CostSaving = {
    timestamp : Time.Time;
    amount : Float;
  };

  type CarbonFootprint = {
    timestamp : Time.Time;
    reductionKg : Float;
  };

  type DeviceStatus = {
    deviceId : Text;
    status : Text;
    deviceType : Text;
    location : Text;
    healthScore : Nat;
  };

  type AIRecommendation = {
    id : Nat;
    priority : Nat;
    message : Text;
    estimatedSavings : Float;
    applied : Bool;
  };

  type SmartAlert = {
    id : Nat;
    alertType : Text;
    message : Text;
    severity : Nat;
    timestamp : Time.Time;
    acknowledged : Bool;
  };

  type DeviceEfficiency = {
    deviceId : Text;
    efficiencyScore : Float;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type ROICalculation = {
    investmentAmount : Float;
    monthlySavings : Float;
    roiMonths : Float;
    timestamp : Time.Time;
  };

  type CarbonEmissionCalculation = {
    energyKWh : Float;
    emissionFactor : Float;
    co2Kg : Float;
    timestamp : Time.Time;
  };

  type NetZeroProgress = {
    currentEmissions : Float;
    targetEmissions : Float;
    progressPercentage : Float;
  };

  type AnomalyLog = {
    device : Text;
    timestamp : Time.Time;
    anomalyType : Text;
    severityScore : Nat;
  };

  module DeviceEfficiency {
    public func compare(a : DeviceEfficiency, b : DeviceEfficiency) : Order.Order {
      Float.compare(b.efficiencyScore, a.efficiencyScore);
    };
  };

  let energyReadings = Map.empty<Nat, EnergyReading>();
  let costSavings = Map.empty<Nat, CostSaving>();
  let carbonFootprints = Map.empty<Nat, CarbonFootprint>();
  let devices = Map.empty<Text, DeviceStatus>();
  let recommendations = Map.empty<Nat, AIRecommendation>();
  let alerts = Map.empty<Nat, SmartAlert>();
  let deviceEfficiencies = Map.empty<Text, DeviceEfficiency>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let roiCalculations = Map.empty<Nat, ROICalculation>();
  let carbonCalculations = Map.empty<Nat, CarbonEmissionCalculation>();
  let anomalyLogs = Map.empty<Nat, AnomalyLog>();

  var nextRecommendationId = 0;
  var nextAlertId = 0;
  var netZeroProgress : ?NetZeroProgress = null;

  public shared ({ caller }) func storeEnergyReading(reading : EnergyReading) : async () {
    let timestamp = Int.abs(reading.timestamp);
    energyReadings.add(timestamp, reading);
  };

  public query ({ caller }) func getEnergyReadingsByDevice(device : Text) : async [EnergyReading] {
    energyReadings.values().toArray().filter(func(r) { r.device == device });
  };

  public shared ({ caller }) func storeCostSaving(saving : CostSaving) : async () {
    let timestamp = Int.abs(saving.timestamp);
    costSavings.add(timestamp, saving);
  };

  public shared ({ caller }) func storeCarbonFootprint(fp : CarbonFootprint) : async () {
    let timestamp = Int.abs(fp.timestamp);
    carbonFootprints.add(timestamp, fp);
  };

  public shared ({ caller }) func registerDevice(device : DeviceStatus) : async () {
    devices.add(device.deviceId, device);
  };

  public shared ({ caller }) func addRecommendation(rec : AIRecommendation) : async () {
    let newId = nextRecommendationId;
    nextRecommendationId += 1;
    let newRec = { rec with id = newId };
    recommendations.add(newId, newRec);
  };

  public shared ({ caller }) func createAlert(alert : SmartAlert) : async () {
    let alertId = nextAlertId;
    nextAlertId += 1;
    let newAlert = { alert with id = alertId };
    alerts.add(alertId, newAlert);
  };

  public shared ({ caller }) func acknowledgeAlert(alertId : Nat) : async () {
    switch (alerts.get(alertId)) {
      case (null) { Runtime.trap("Alert not found") };
      case (?alert) {
        let updatedAlert = { alert with acknowledged = true };
        alerts.add(alertId, updatedAlert);
      };
    };
  };

  public shared ({ caller }) func addDeviceEfficiency(efficiency : DeviceEfficiency) : async () {
    deviceEfficiencies.add(efficiency.deviceId, efficiency);
  };

  public query ({ caller }) func getTopEfficientDevices(limit : Nat) : async [DeviceEfficiency] {
    deviceEfficiencies.values().toArray().sort().sliceToArray(0, Nat.min(limit, deviceEfficiencies.size()));
  };

  public shared ({ caller }) func submitContactMessage(msg : ContactMessage) : async () {
    let timestamp = Int.abs(msg.timestamp);
    contactMessages.add(timestamp, msg);
  };

  public shared ({ caller }) func storeROICalculation(roi : ROICalculation) : async () {
    let timestamp = Int.abs(roi.timestamp);
    roiCalculations.add(timestamp, roi);
  };

  public shared ({ caller }) func storeCarbonCalculation(calc : CarbonEmissionCalculation) : async () {
    let timestamp = Int.abs(calc.timestamp);
    carbonCalculations.add(timestamp, calc);
  };

  public shared ({ caller }) func updateNetZeroProgress(progress : NetZeroProgress) : async () {
    netZeroProgress := ?progress;
  };

  public query ({ caller }) func getNetZeroProgress() : async ?NetZeroProgress {
    netZeroProgress;
  };

  public shared ({ caller }) func logAnomaly(anomaly : AnomalyLog) : async () {
    let timestamp = Int.abs(anomaly.timestamp);
    anomalyLogs.add(timestamp, anomaly);
  };
};
