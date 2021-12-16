import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    SafeAreaView
} from "react-native";

import { fontSizes } from "../../utils/sizes";
import { RoundedButton } from "../../components/RoundedButton";

export const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear([]);
    };

    return (
        <>
            <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
                <Text style={{ fontSize: fontSizes.lg, color: "white" }}>
                    Things we've focused on
                </Text>
                {!!focusHistory.length && (
                    <FlatList
                        style={{ width: "100%", height: "100%", paddingTop: 16 }}
                        contentContainerStyle={{ alignItems: "center" }}
                        data={focusHistory}
                        renderItem={({ item, index }) => (
                            item.status > 0 ? <Text style={styles.historyItem1}> {item.subject}</Text>
                                : <Text style={styles.historyItem2}> {item.subject}</Text>
                        )}
                    />
                )}
                {!focusHistory.length && (
                    <Text style={{ color: "white" }}>Nothing yet</Text>
                )}
            </SafeAreaView>
            <View style={styles.clearContainer}>
                <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    historyItem1: {
        color: "green",
        fontSize: fontSizes.md,
    },
    historyItem2: {
        color: "red",
        fontSize: fontSizes.md,
    },
    clearContainer: {
        alignItems: "center",
        // padding: paddingSizes.sm,
    },
});
