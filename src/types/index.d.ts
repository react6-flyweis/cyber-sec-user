export interface IUserProfile {
  _id: string;
  role: string;
  mobileNumber: string;
  __v: number;
  createdAt: string;
  email: string;
  isOnline: boolean;
  deviceName: string;
  isVerified: boolean;
  name: string;
  otp: string;
  profilePicture: string;
  address: string;
  complianceStatus: "Full" | "Partial" | "None";
  ipAddress: string;
  language: string;
  osVersion: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  threatsDetected: string;
  lastSeen: string;
}

// Additional related types
export type ComplianceStatus = "Full" | "Partial" | "None";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type UserRole = "user" | "admin" | "moderator";

// Partial user profile for updates
export type IUserProfileUpdate = Partial<
  Omit<IUserProfile, "_id" | "__v" | "createdAt">
>;

// User profile creation payload (without auto-generated fields)
export type ICreateUserProfile = Omit<
  IUserProfile,
  "_id" | "__v" | "createdAt" | "lastSeen"
>;
