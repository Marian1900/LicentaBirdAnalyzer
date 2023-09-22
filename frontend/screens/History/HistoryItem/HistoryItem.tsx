import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { getFormattedDate } from "../../../common/helpers/dateHelpers";

import { ActivityIndicator, IconButton } from "react-native-paper";
import { LogService } from "../../../api/LogService/LogService";
import { theme } from "../../../common/styling/theme";
import { SIZE } from "../../../common/styling/variables";
import { toasts } from "../../../common/toasts";
import { promiseWrapper } from "../../../common/utils/promiseWrapper";
import { styles } from "./styles";
import { HistoryItemType } from "./types";


const HistoryItem: React.FC<HistoryItemType> = (props) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleLogPress = () => {
        props.onItemPressCallback(props.item);
    }

    const handleDeleteLogPress = () => {
        setIsDeleting(true);
        promiseWrapper(LogService.deleteLog(props.item._id))
            .then(() => {
                toasts.DeleteSuccess();
                props.deleteItemCallback(props.item._id);
            })
            .finally(() => {
                setIsDeleting(false);
            })
    }

    return <TouchableOpacity
        onPress={handleLogPress}
        style={styles.container}>
        <View style={styles.upperContainer}>
            <View>
                <Text style={styles.dateText}>
                    {getFormattedDate(props.item.timestamp)}
                </Text>
            </View>
            {
                isDeleting
                    ? <ActivityIndicator
                        size={SIZE.MEDIUM}
                        color={theme.mainGreen} />
                    : <IconButton
                        onPress={handleDeleteLogPress}
                        hitSlop={SIZE.MEDIUM}
                        size={SIZE.MEDIUM}
                        iconColor={theme.dangerRed}
                        style={styles.deleteIcon}
                        icon={"delete"} />
            }
        </View>
        {
            <View
                key={`${props.item._id}`}
                style={styles.textContainer}>
                <View style={styles.leftContainer}>
                    <View>
                        <Text style={{ textTransform: "capitalize" }}>
                            {props.item.finding.latinName}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ textTransform: "capitalize" }}>
                            {`(${props.item.finding.englishName})`}
                        </Text>
                    </View>
                </View>
            </View>
        }
    </TouchableOpacity >
}

export default HistoryItem;