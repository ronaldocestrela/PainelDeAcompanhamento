type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  imageUrl?: string;
  roleName?: string;
};

// Leads
type ListLeads = {
  id: string;
  date: string;
  registerCounts: number;
  baseLeads: number;
  expertId: any;
  analystId: string;
};

// Experts || Projects
type ExpertList = {
  id: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

type ExpertDetail = {
  id: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
  reports: ListReports[];
  name: string;
};

type ExpertCreate = {
  name: string;
  photoUrl?: string;
};

type ExpertUpdate = {
  id: string;
  name: string;
  photoUrl: string;
};

// Reposts
type ListReports = {
  cliks: number;
  registros: number;
  depositos: number;
  rev: number;
  ftd: number;
  cpa: number;
  npl: number;
  reportDate: string;
  currency: number;
  expertId: string;
  // expert: any
  campaingId: string;
  // campaing: any
  analystId: string;
  // analyst: any
  bookMakerId: string;
  // bookMaker: any
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Analyst
type CreateAnalyst = {
  name: string;
  photoUrl: string;
};

type Analyst = {
  id: string;
  role: string;
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

type ListAnalycts = {
  id: string;
  name: string;
  photoUrl: string;
};

type DeatailAnalyst = {
  id: string;
  name: string;
  photoUrl: string;
  reports: ListReports[];
};

// Campaings
type CreateCampaing = {
  Name: string;
  ExpertId?: string | null;
  AnalystId?: string | null;
  BookmakerId?: string | null;
};

type CampaingList = {
  id: string;
  name: string;
  expertName?: string;
  expertPhotoUrl?: string;
  analystName?: string;
  analystPhotoUrl?: string;
  totalReports: number;
};

type SelectOption = {
  id: string;
  name: string;
};

type CampaingDetail = {
  id: string;
  name: string;
  expertId?: string | null;
  analystId?: string | null;
  bookMakerId?: string | null;
  reports?: ListReports[];
  createdAt: string;
  updatedAt: string;
};

// Houses
type ListBookmakers = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  logoUrl: string;
};

type CreateBookmakers = {
  name: string;
};

type Profile = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  imageUrl?: string;
  roleName?: string;
};

type Photo = {
  id: string;
  url: string;
};

//Products
type Product = {
  id: string;
  name: string;
  externalId: string;
  expertId?: string;
  hublaExternalId: string;
};

type ProductDetail = {
  externalId: string;
};

type ProductCreate = {
  name: string;
  externalId?: string;
  expertId: string;
  hublaExternalId: string;
};

type ListRoles = {
  id: string;
  name: string;
};

type ListUsers = {
  id: string;
  role: string;
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

type ListSales = {
  id: string;
  sellerName: string;
  productName: string;
  saleDate: string;
  price: number;
};

type ListSeller = {
  id: string;
  role: string;
  name: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

// Companies
type Company = {
  id: string;
  expertsCount: number;
  name: string;
  host: string;
  linkLogoHeader: string;
  linkLogoMenuLateral: string;
  linkFavicon: string;
  linkLogoLogin: string;
  tituloPagina: string;
};

// Create User Payload
type CreateUserPayload = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isSaler: boolean;
  isAnalyst: boolean;
  RoleUser: string;
};

// Marketing Actions
export type MarketingAction = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  expertId: string;
};

export type MarketingActionCreate = {
  expertId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description?: string;
};

export type MarketingActionUpdate = {
  id: string;
  expertId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description?: string;
};

export type {
  // User
  User,

  // Leads
  ListLeads,

  // Experts || Projects
  ExpertList,
  ExpertDetail,
  ExpertCreate,
  ExpertUpdate,

  // Reposts
  ListReports,

  // Alanyst
  Analyst,
  CreateAnalyst,
  ListAnalycts,
  DeatailAnalyst,

  // Campaings
  CreateCampaing,
  CampaingList,
  CampaingDetail,
  CampaingUpdate,
  SelectOption,

  // Houses
  ListBookmakers,
  CreateBookmakers,

  // Profile
  Profile,
  Photo,

  // Products
  Product,
  ProductDetail,
  ProductCreate,

  // Roles
  ListRoles,

  // Users
  ListUsers,

  // Sales
  ListSales,

  //Seller
  ListSeller,

  // Companies
  Company,

  // Create User
  CreateUserPayload,
};

export type Deal = {
  id: string;
  bookmakerName: string;
  companyName: string;
  revValueExpert: number;
  revValueAgency: number;
  nplValueExpert: number;
  nplValueAgency: number;
  cpaValueExpert: number;
  cpaValueAgency: number;
  nplValueExpert: number;
  nplValueAgency: number;
  depositBonusExpert: number;
  depositBonusAgency: number;
  bookmakerId: string;
  expertId: string;
  initialDate: string;
};

export type CreateDealData = {
  bookmakerName: string;
  revValueExpert: number;
  revValueAgency: number;
  cpaValueExpert: number;
  cpaValueAgency: number;
  depositBonusExpert: number;
  depositBonusAgency: number;
  bookmakerId: string;
  expertId: string;
  initialDate: string;
};
