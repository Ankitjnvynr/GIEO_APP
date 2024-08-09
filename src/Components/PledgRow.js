import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../helper/colors'

const PledgRow = ({ count, title, containerStyle, leftshellStyle, rightShellStyle }) => {
    return (
        <View style={[styles.main, containerStyle]}>
            <View style={[styles.leftshellStyle, leftshellStyle]}>
                <Text style={[styles.titleStyle,]}>{title}</Text>
            </View>
            <View style={[styles.rightShellStyle, rightShellStyle]}>
                <Text style={styles.titleStyle}>
                    {count}
                </Text>
            </View>
        </View>
    )
}

export default PledgRow

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width - 80,
        borderColor: 'orange',
        borderWidth: 1,
    },
    leftshellStyle: {
        borderRightWidth: 1,
        borderColor: 'orange',
        flex: 1
    },
    rightShellStyle: {
        flex: 1
    },
    titleStyle: {
        color: colors.black,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 8
    }
})