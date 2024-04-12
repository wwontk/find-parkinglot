export interface getParkingLotProps {
  page: number;
  mktNm: string | undefined;
}

export interface parkingLotDataType {
  prkplceNo: string;
  prkplceNm: string;
  prkplceSe: string;
  prkplceType: string;
  prkplceRoadNmAddr: string;
  prkplceLotnoAddr: string;
  prkplceCnt: string;
  prkplceOperInfo: string;
  prkplceChargeInfo: string;
  prkplceMngInsttNm: string;
  prkplceTelno: string;
  prkplceLatPos: string;
  prkplceLotPos: string;
  dist: string;
}

export interface parkingLotListItemProps {
  prkplceNo: string;
  prkplceNm: string;
  prkplceRoadNmAddr: string;
}
