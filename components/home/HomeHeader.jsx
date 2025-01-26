import { View, StyleSheet, Image, } from 'react-native'
import { COLOR } from '@/assets/colors/Colors'

const HomeHeader = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image currentColor style={styles.logo} source={require("@/assets/images/logo-long.png")}/>
      {/* <Pressable style={styles.button}>
        <Inbox fill={COLOR.primary_gold_100} width={28} height={26}/> //Inbox SVG icon deleted, use Lucide instead
      </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      backgroundColor: COLOR.primary_blue_100,
      height: 83,
      alignItems: "flex-end",
      justifyContent: "center",
    },

    logo: {
      height: 50,
      width: 128,
    },

    button: {
      position: "absolute",
      right: 20,
      top: 52 ,
    },
})

export default HomeHeader