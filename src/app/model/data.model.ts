export interface CountryResponseModel {
  access: string;
  data: Object | any;
  status: string;
  version: string;
}

export interface CountryRegionModel {
  country: string;
  region: string;
}

export interface PinDataModel {
  title: string;
  image: string;
  collaborator: string[];
  privacy: string;
}

export interface CustomerModel {
  title: string;
  region: string;
  email: string;
  country: string;
}
