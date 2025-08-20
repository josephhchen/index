import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'

export default function Note() {
    
    return(
        <ThemedView style = {styles.container}>
            
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})