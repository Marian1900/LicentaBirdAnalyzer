import { BirdLogGetData } from "../../../api/LogService/types";

export type HistoryItemType = {
    item: BirdLogGetData,
    onItemPressCallback: (item: BirdLogGetData) => void,
    deleteItemCallback: (id: string) => void,
}