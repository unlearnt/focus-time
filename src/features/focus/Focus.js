import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from "../../utils/colors";
import { RoundedButton } from "../../components/RoundedButton";

export const Focus = ({ addSubject }) => {

    const [subject, setSubject] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>What would you like to focus on? </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex:1, marginRight: spacing.md, backgroundColor: colors.white}}
                        onChangeText={text => {
                            console.log("event ", text)
                            setSubject(text);
                        }}
                    />
                    <RoundedButton
                    size={50}
                    title="+"
                    onPress={()=>{
                        console.log("add subject " + subject);
                        addSubject(subject);
                    }}
                />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5
    },
    innerContainer: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'center'
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fontSizes.lg
    },
    inputContainer: {
        paddingTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    }
})