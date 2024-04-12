export interface marketListDataType {
  estblYear: string;
  homepageUrl: string;
  insttCode: string;
  latitude: string;
  longitude: string;
  lnmadr: string;
  rdnmadr: string;
  mrktEstblCycle: string;
  mrktNm: string;
  mrktType: string;
  pblicToiletYn: string;
  phoneNumber: string;
  prkplceYn: string;
  referenceDate: string;
  storNumber: string;
  trtmntPrdlst: string;
  useGcct: string;
}

export interface marketListItemProps {
  mrktNm: string;
  rdnmadr: string;
}
