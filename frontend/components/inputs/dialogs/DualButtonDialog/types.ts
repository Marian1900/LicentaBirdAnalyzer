import { BirdLogFinding } from "../../../../api/LogService/types";

export type DialogButtonType = {
    title: string;
    onPress: () => void;
}

export type DualButtonDialogType = {
    content?: BirdLogFinding[];
    leftButton?: DialogButtonType;
    rightButton?: DialogButtonType;
    title?: string;
    visible: boolean;
    onDismiss?: () => void;
    onIdentificationPress?: (finding: BirdLogFinding) => void
}