import React, { useState } from 'react'
import PropTypes, { bool } from 'prop-types'
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

import { CREDENTIAL_TYPES } from '@/constants/auth';
import { router } from 'expo-router';

interface InvalidCredentialModalProps {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
    enteredCredential: string,
    credentialType: any // TODO: NEEDS TO BE A TYPE
}

export default function InvalidCredentialModal({ isVisible, setIsVisible, enteredCredential, credentialType }: InvalidCredentialModalProps) {

    function OnSignupPress() {
        router.push('/register');
        setIsVisible(!isVisible);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible(!isVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>We can't find {credentialType === CREDENTIAL_TYPES.EMAIL ? 'email' : 'phone number'}: {enteredCredential}</Text>
                    <View style={styles.modalPressablesContainer}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setIsVisible(!isVisible)}>
                            <Text style={styles.textStyle}>Try again</Text>
                        </Pressable>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={OnSignupPress}>
                            <Text style={styles.textStyle}>Sign up</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalPressablesContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        height: '27%',
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
        // alignItems: 'spac',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        // backgroundColor: 'transparent',
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
